'use client';
import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { FC, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { useCartStore } from '@/stores/cart';
import { Button } from '@/components/ui/button';
import { notify } from '@/core/notifications';
import { Badge } from '@/components/ui/badge';
import { Tags, X } from 'lucide-react';

const { acceptReferral, getCart } = getEndpoints(fetcher);

export const ReferralCode: FC = () => {
    const [referral, setReferral] = useState('');
    const [loading, setLoading] = useState(false);

    const { items } = useCartStore();
    const t = useTranslations('checkout');

    const { cart, setCart } = useCartStore();

    const handleInputReferral = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReferral(e.target.value);
    };

    const accept = async () => {
        if (!referral) return;

        try {
            setLoading(true);
            const response = await acceptReferral(referral);
            setCart(await getCart());

            if (response.success) {
                notify('Referral accepted', 'green');
                setReferral('');
                return;
            }
        } catch (error) {
            console.error('Error accepting referral', error);
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) return null;

    return (
        <div className="flex-col">
            <span className="text-[20px] font-bold text-accent-foreground">
                {t('referral-code')}
            </span>
            <div className="mt-2 flex gap-2">
                <Input
                    className="h-10 w-[250px]"
                    placeholder="Enter the coupon code..."
                    onChange={handleInputReferral}
                />
                <Button onClick={accept} disabled={loading || !referral.length}>
                    {t('redeem')}
                </Button>
            </div>
            <RedeemedReferral
                code={cart?.referral_code || ''}
                removeCode={() => {
                    console.log('remove referral');
                }}
            />
        </div>
    );
};

type RedeemedReferralnProps = {
    code: string;
    removeCode: () => void;
};

function RedeemedReferral({ code, removeCode }: RedeemedReferralnProps) {
    if (!code) return null;

    return (
        <Badge
            variant="secondary"
            className="flex w-max items-center justify-between gap-4 rounded-md p-2"
        >
            <div className="flex items-center gap-2">
                <Tags size={30} className="scale-x-[-1] text-foreground/80" />
                <span className="text-accent-foreground">{code}</span>
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
