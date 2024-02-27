'use client';

import { FC } from 'react';
import { Input } from '@/components/base/input/input';
import { useCheckoutStore } from '@/stores/checkout';
import { useTranslations } from 'next-intl';
import { useCartStore } from '@/stores/cart';

export const ReferralCode: FC = () => {
    const { items } = useCartStore();
    const t = useTranslations('checkout');

    const { setReferral } = useCheckoutStore();

    const handleReferral = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReferral(e.target.value);
    };

    if (items.length === 0) return null;

    return (
        <div className="mt-10 flex-col">
            <span className="text-[20px] font-bold text-accent-foreground">
                {t('referral-code')}
            </span>
            <div className="mt-2">
                <Input
                    className="h-10 w-[250px]"
                    placeholder="Enter referral code..."
                    onChange={handleReferral}
                />
            </div>
        </div>
    );
};
