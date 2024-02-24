'use client';

import { createToken } from '@/api/server/create-test';
import { SubmitButton } from './submit-button';

export const AuthForm = () => {
    return (
        <form className="flex flex-col" action={createToken}>
            <div className="flex flex-col">
                <h1 className="mb-4 text-center text-2xl font-bold text-white">Login</h1>

                <div className="flex flex-col">
                    <input
                        name="username"
                        type="text"
                        placeholder="Username..."
                        className="mx-auto mt-2 w-96 rounded bg-[#303437] p-1 outline-none"
                    />
                </div>
            </div>
            <SubmitButton />
        </form>
    );
};
