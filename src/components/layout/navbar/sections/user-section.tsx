import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/core/auth/client/use-auth';
import { removeToken } from '@/api/server/create-test';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/user';
import { LogoutButton } from './logout-btn';

export const UserSection: FC = () => {
    const { user } = useAuth();

    const { setUser } = useUserStore();
    const router = useRouter();

    if (user) {
        return (
            <form
                action={async () => {
                    await removeToken();
                    setUser(undefined);
                    router.push('/');
                }}
            >
                <LogoutButton />
            </form>
        );
    }

    return (
        <Link href="/auth" className="flex-row items-center">
            <Image src="https://minotar.net/helm/steve/30.png" alt="" width={32} height={32} />
            <span className="glow-text red-glow ml-4 cursor-pointer font-bold uppercase">
                guest
            </span>
        </Link>
    );
};
