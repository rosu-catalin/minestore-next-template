'use client';

import { FC } from 'react';
import { Input } from '@/components/base/input/input';
import { useCheckoutStore } from '@/stores/checkout';
import { useTranslations } from 'next-intl';

export const ReferralCode: FC = () => {
    const t = useTranslations('checkout');

    const { setReferral } = useCheckoutStore();

    const handleReferral = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReferral(e.target.value);
    };

    return (
        <div className="mt-10 flex-col">
            <span className="text-[20px] font-bold">{t('referral-code')}</span>
            <div className="mt-5">
                <Input
                    className="h-10 w-[150px]"
                    placeholder="--- --- ---"
                    onChange={handleReferral}
                />
            </div>
        </div>
    );
};
