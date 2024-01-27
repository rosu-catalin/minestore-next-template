'use client';

import { FC, useState } from 'react';
import { Button } from '@/components/base/button/button';
import { Input } from '@/components/base/input/input';
import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { notify } from '@/core/notifications';
import { useCartStore } from '@/stores/cart';
import { Price } from '@/components/base/price/price';
import { useTranslations } from 'next-intl';

const { acceptCoupon, getCart } = getEndpoints(fetcher);

export const RedeemCoupon: FC = () => {
    const t = useTranslations('checkout');

    const { cart, setCart } = useCartStore();

    const [coupon, setCoupon] = useState('');

    const accept = async () => {
        const response = await acceptCoupon(coupon);

        setCart(await getCart());

        if (response.success) {
            notify(response.message, 'green');
        } else {
            notify(response.message, 'red');
        }
    };

    return (
        <div className="mt-10 flex-col">
            <span className="text-[20px] font-bold">{t('redeem-coupons-or-gift-cards')}</span>
            {cart?.gift_id ? (
                <span>
                    {t('active-gift')}: {cart.gift_id} (<Price value={cart.gift_sum} />)
                </span>
            ) : (
                <div className="mt-5">
                    <Input
                        className="h-10 w-[150px]"
                        placeholder="0XXX-00XX-0XXX"
                        onChange={setCoupon}
                    />
                    <Button onClick={accept} className="ml-4">
                        {t('redeem')}
                    </Button>
                </div>
            )}
        </div>
    );
};
