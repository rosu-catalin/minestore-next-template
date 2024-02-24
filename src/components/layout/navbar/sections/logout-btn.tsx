'use client';

import { useTranslations } from 'next-intl';
import { useFormStatus } from 'react-dom';
import { ReactSVG } from 'react-svg';

export function LogoutButton() {
    const t = useTranslations('navbar');
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="glow-text red-glow flex-row disabled:pointer-events-none disabled:select-none"
        >
            <ReactSVG className="text-white" src="/icons/logout.svg" />
            <span className="ml-4 cursor-pointer font-bold uppercase">{t('logout')}</span>
        </button>
    );
}
