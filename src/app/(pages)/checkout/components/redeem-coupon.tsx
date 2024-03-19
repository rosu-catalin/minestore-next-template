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
import { Tags, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const { acceptCoupon, getCart, removeCoupon, removeGiftCard } = getEndpoints(fetcher);

type RedeemCouponProps = {
    userId: number;
};

export const RedeemCoupon = ({ userId }: RedeemCouponProps) => {
    const { cart, setCart, items } = useCartStore();

    const t = useTranslations('checkout');

    const [loading, setLoading] = useState(false);

    console.log({
        cart,
        items
    });

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

    const handleRemoveCoupon = async () => {
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

    const handleRemoveGiftCard = async () => {
        try {
            setLoading(true);
            const response = await removeGiftCard(userId);

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
        <div className="flex-col gap-4">
            <div>
                <p className="text-[20px] font-bold text-accent-foreground">
                    {t('redeem-coupons-or-gift-cards')}
                </p>

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
            </div>

            <RedeemedCouponList
                removeCoupon={handleRemoveCoupon}
                removeGiftCard={handleRemoveGiftCard}
            />
        </div>
    );
};

type RedeemedCouponListProps = {
    removeCoupon: () => void;
    removeGiftCard: () => void;
};

function RedeemedCouponList({ removeCoupon, removeGiftCard }: RedeemedCouponListProps) {
    const { cart } = useCartStore();

    const isCouponApplied = cart?.coupon_value || cart?.gift_code;

    if (!isCouponApplied) return null;

    return (
        <div className="flex-col">
            <p className="font-bold text-accent-foreground">Redeemed Coupons</p>
            <div className="mt-2 flex gap-2">
                {cart?.coupon_value && (
                    <RedeemedCoupon
                        code={cart.coupon_code}
                        removeCode={removeCoupon}
                        amount={cart.coupon_value}
                        coupon_type={cart.coupon_type}
                    />
                )}
                {cart?.gift_code && (
                    <RedeemedCoupon
                        code={cart.gift_code}
                        removeCode={removeGiftCard}
                        amount={cart.gift_sum}
                        coupon_type={1}
                    />
                )}
            </div>
        </div>
    );
}

type RedeemedCouponProps = {
    code: string;
    removeCode: () => void;
    amount: number;
    coupon_type?: 1 | 0;
};

function RedeemedCoupon({ code, removeCode, amount, coupon_type }: RedeemedCouponProps) {
    return (
        <Badge
            variant="secondary"
            className="flex w-max items-center justify-between gap-4 rounded-md p-2"
        >
            <div className="flex items-center gap-2">
                <Tags size={30} className="scale-x-[-1] text-foreground/80" />
                <div>
                    <p className="text-base font-bold text-foreground">{code}</p>
                    {coupon_type === 1 ? (
                        <Price value={amount} className="text-foreground/80" />
                    ) : (
                        <p className="text-foreground/80">{amount}% savings</p>
                    )}
                </div>
            </div>
            <Button
                variant="link"
                aria-label="Remove coupon"
                size="icon"
                onClick={removeCode}
                className="size-max"
            >
                <X size={24} />
            </Button>
        </Badge>
    );
}
