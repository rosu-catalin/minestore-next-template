import { FC } from 'react';
import { ReactSVG } from 'react-svg';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/core/auth/client/use-auth';
import { useTranslations } from 'next-intl';

export const UserSection: FC = () => {
    const { user, signOut } = useAuth();

    const t = useTranslations('navbar');

    if (user) {
        return (
            <div className="glow-text red-glow flex-row" onClick={signOut}>
                <ReactSVG className="text-white" src="/icons/logout.svg" />
                <span className="ml-4 cursor-pointer font-bold uppercase">{t('logout')}</span>
            </div>
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
