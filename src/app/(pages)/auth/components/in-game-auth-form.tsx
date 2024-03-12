'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/use-user';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { notify } from '@/core/notifications';

const authFormSchema = z.object({
    username: z
        .string({
            invalid_type_error: 'Invalid Username'
        })
        .regex(/^([*_BP\.]{0,1}[a-zA-Z_]{1}[a-zA-Z0-9_]{3,15}(-[a-zA-Z0-9_]{1,15})?)$/, {
            message: 'Invalid Username'
        })
});

type AuthFormValues = z.infer<typeof authFormSchema>;

const defaultValues: Partial<AuthFormValues> = {
    username: ''
};

export function InGameAuthForm() {
    const [step, setStep] = useState(0);

    const { loginAttemptInGame, loginInGame, loading } = useUser();

    const form = useForm<AuthFormValues>({
        resolver: zodResolver(authFormSchema),
        defaultValues,
        mode: 'onSubmit'
    });

    async function onSubmit(data: AuthFormValues) {
        const { username } = data;
        try {
            const response = await loginAttemptInGame(username);

            if (response?.status) {
                setStep(1);
            }
        } catch (error) {
            console.error('Error while logging in game:', error);
        }
    }

    useEffect(() => {
        if (step === 1) {
            const timer = setInterval(async () => {
                const response = await loginInGame(form.getValues('username'));
                console.log('Status: ', response?.status);
                if (response?.status) {
                    clearInterval(timer);
                }
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [step, loginInGame, form]);

    if (step === 1) {
        return (
            <div>
                <h2 className="text-center text-2xl font-bold text-accent-foreground">
                    Waiting for verification 🚀
                </h2>
                <p className="mx-auto mt-4 max-w-[80ch] text-balance text-center">
                    <span className="font-bold">
                        Please, check a chat & verify yourself on the Minecraft Server!
                    </span>{' '}
                    You need to confirm that you are the owner of the account!
                </p>
                <div className="my-8 flex items-center justify-center space-x-2">
                    <span className="sr-only">Loading...</span>
                    <div className="h-8 w-8 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></div>
                    <div className="h-8 w-8 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></div>
                    <div className="h-8 w-8 animate-bounce rounded-full bg-primary"></div>
                </div>
                <Button
                    className="mx-auto flex"
                    onClick={() => {
                        loginAttemptInGame(form.getValues('username'));
                        notify('Verification resent', 'green');
                    }}
                >
                    Resend Verification
                </Button>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto">
                <div className="space-y-4">
                    <h2 className="text-center text-2xl font-bold text-accent-foreground">
                        Log In
                    </h2>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="w-[300px] md:w-[400px]">
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Minecraft Username" {...field} />
                                </FormControl>
                                <FormDescription>
                                    To start shopping, please enter your Minecraft Username
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    type="submit"
                    className="mt-8 w-[300px] p-6 md:w-[400px]"
                    disabled={!form.formState.isValid || form.formState.isSubmitting || loading}
                >
                    {loading && <Loader2Icon className="mr-2 animate-spin" />}
                    Continue
                </Button>
            </form>
        </Form>
    );
}
