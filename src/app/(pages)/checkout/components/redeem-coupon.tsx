'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { notify } from '@/core/notifications';
import { useCartStore } from '@/stores/cart';
import { Price } from '@/components/base/price/price';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

const { acceptCoupon, getCart, removeCoupon } = getEndpoints(fetcher);

type RedeemCouponProps = {
    userId: number;
};

export const RedeemCoupon = ({ userId }: RedeemCouponProps) => {
    const { items } = useCartStore();

    const t = useTranslations('checkout');

    const [loading, setLoading] = useState(false);

    const { cart, setCart } = useCartStore();

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
        <div className="flex-col">
            <span className="text-[20px] font-bold text-accent-foreground">
                {t('redeem-coupons-or-gift-cards')}
            </span>
            {cart?.gift_id || cart?.coupon_id ? (
                <div className="flex gap-4">
                    <span>
                        {t('active-gift')}: {cart.gift_id} (<Price value={cart.gift_sum} />)
                    </span>
                    <Button disabled={loading} onClick={remove}>
                        {t('remove-gift')}
                    </Button>
                </div>
            ) : (
                <div className="mt-2 flex gap-2">
                    <Input
                        className="h-10 w-[250px]"
                        placeholder="Enter the coupon code..."
                        onChange={handleCoupon}
                    />
                    <Button onClick={accept} disabled={loading || !coupon.length}>
                        {t('redeem')}
                    </Button>
                </div>
            )}
        </div>
    );
};
