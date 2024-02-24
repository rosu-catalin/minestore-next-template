'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const schema = z.object({
    username: z
        .string({
            invalid_type_error: 'Invalid Username'
        })
        .regex(/^([*_BP\.]{0,1}[a-zA-Z_]{1}[a-zA-Z0-9_]{3,15}(-[a-zA-Z0-9_]{1,15})?)$/, {
            message: 'Invalid Username'
        })
});

async function createToken(formData: FormData) {
    const username = formData.get('username') as string;

    const validatedFields = schema.safeParse({
        username
    });

    if (!validatedFields.success) {
        console.log('Errors:', validatedFields.error.flatten().fieldErrors);
        return {
            errors: validatedFields.error.flatten().fieldErrors
        };
    }

    const URL = 'http://experimental.minestorecms.com/api/auth/username';

    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });

        const token = await response.text();
        const cookieStore = cookies();

        cookieStore.set('token', token);
    } catch (error) {
        console.error(error);
    }

    revalidateTag('token');
    redirect('/');
}

async function removeToken() {
    try {
        const cookieStore = cookies();
        cookieStore.delete('token');
    } catch (error) {
        console.error(error);
    }
}

export { createToken, removeToken };
