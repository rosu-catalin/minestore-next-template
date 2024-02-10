'use client';

import { useState } from 'react';
import { Button } from '@/components/base/button/button';
import { Input } from '@/components/base/input/input';
import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { notify } from '@/core/notifications';
import { useCartStore } from '@/stores/cart';
import { Price } from '@/components/base/price/price';
import { useTranslations } from 'next-intl';

const { acceptCoupon, getCart, removeCoupon } = getEndpoints(fetcher);

type RedeemCouponProps = {
    userId: number;
};

export const RedeemCoupon = ({ userId }: RedeemCouponProps) => {
    const { items } = useCartStore();

    const t = useTranslations('checkout');

    const [loading, setLoading] = useState(false);

    const { cart, setCart } = useCartStore();

    console.log('cart', cart);

    const [coupon, setCoupon] = useState('');

    const handleCoupon = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCoupon(e.target.value);
    };

    const accept = async () => {
        if (!coupon) return notify('Please enter a coupon', 'red');

        try {
            setLoading(true);
            const response = await acceptCoupon(coupon);

            setCart(await getCart());

            if (response.success) {
                notify(response.message, 'green');
            } else {
                notify(response.message, 'red');
            }
        } catch (error) {
            notify('Something wrong happened', 'red');
            console.error('Error accepting coupon', error);
        } finally {
            setLoading(false);
        }
    };

    const remove = async () => {
        try {
            setLoading(true);
            const response = await removeCoupon(userId);

            setCart(await getCart());

            if (response.success) {
                notify(response.message, 'green');
            } else {
                notify(response.message, 'red');
            }
        } catch (error) {
            notify('Something wrong happened', 'red');
            console.error('Error removing coupon', error);
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) return null;

    return (
        <div className="mt-10 flex-col">
            <span className="text-[20px] font-bold">{t('redeem-coupons-or-gift-cards')}</span>
            {cart?.gift_id || cart?.coupon_id ? (
                <div className="flex gap-4">
                    <span>
                        {t('active-gift')}: {cart.gift_id} (<Price value={cart.gift_sum} />)
                    </span>
                    <Button loading={loading} onClick={remove}>
                        {t('remove-gift')}
                    </Button>
                </div>
            ) : (
                <div className="mt-5">
                    <Input
                        className="h-10 w-[150px]"
                        placeholder="0XXX-00XX-0XXX"
                        onChange={handleCoupon}
                    />
                    <Button onClick={accept} loading={loading} className="ml-4">
                        {t('redeem')}
                    </Button>
                </div>
            )}
        </div>
    );
};
