'use client';

import { useUserStore } from '@/stores/user';
import { TUser } from '@/types/user';
import { usePathname, useRouter } from 'next/navigation';
import { FC, PropsWithChildren, useEffect, useLayoutEffect } from 'react';

type AuthProviderProps = PropsWithChildren<{
    initialUser?: TUser;
}>;

export const AuthProvider: FC<AuthProviderProps> = ({ children, initialUser }) => {
    const pathname = usePathname();
    const router = useRouter();

    const { user, setUser } = useUserStore();

    const isAuthorized = !!(initialUser || user);

    useLayoutEffect(() => {
        setUser(initialUser);
    }, [initialUser, setUser]);

    useEffect(() => {
        if (isAuthorized && pathname === '/auth') {
            router.push('/');
        }

        if (!isAuthorized && pathname !== '/auth' && pathname.startsWith('/categories/')) {
            router.push('/auth');
        }

        console.log('RERENDERING');
    }, [isAuthorized, pathname, router]);

    if (isAuthorized && pathname === '/auth') {
        return (
            <div className="center">
                <div className="loader"></div>
            </div>
        );
    }

    return children;
};
