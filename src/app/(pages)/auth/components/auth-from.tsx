'use client';

import { useState } from 'react';
import { useAuth } from '@/core/auth/client/use-auth';
import { notify } from '@/core/notifications';
import { joinClasses } from '@helpers/join-classes';
import { useTranslations } from 'next-intl';

export const AuthForm = () => {
    const t = useTranslations('auth');

    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [error, setError] = useState('' as string | null);

    const { signIn } = useAuth();

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!username) {
            setError('Username is required');
            return;
        }

        try {
            setError(null);
            setLoading(true);

            await signIn(username);
        } catch (error) {
            console.error(error);
            notify('Something went wrong!', 'red');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleFormSubmit} className="flex flex-col">
            <div className="flex flex-col">
                <span className="mt-4 text-center text-[20px] font-bold text-[#b5bbc1]">
                    {t('enter-username')}
                </span>
                <div className="flex flex-col">
                    {error && <span className="text-center text-red-500">{error}</span>}
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        className="mx-auto mt-2 w-96 rounded bg-[#303437] p-1 outline-none"
                        disabled={loading}
                    />
                </div>
            </div>
            <button
                type="submit"
                className={joinClasses(
                    'mx-auto mt-4 h-[40px] w-96 rounded bg-[#bd1d1d] font-bold text-white',
                    { 'bg-red-800': loading }
                )}
                disabled={loading}
            >
                {loading ? (
                    <div className="mx-auto h-6 w-6 animate-spin rounded-full border-4 border-transparent border-t-white" />
                ) : (
                    <>{t('continue')}</>
                )}
            </button>
        </form>
    );
};
