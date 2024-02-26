'use client';

import { FC, useEffect, useState } from 'react';
import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { handleUnauthorized } from '@/api/client/handlers';
import { useCheckoutStore } from '@/stores/checkout';
import { TPayments } from '@/types/payments';
import { joinClasses } from '@helpers/join-classes';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useCartStore } from '@/stores/cart';

const { getPaymentMethods } = getEndpoints(fetcher);

export const Payments: FC = () => {
    const t = useTranslations('checkout');

    const { acceptPrivacy, setAcceptPrivacy } = useCheckoutStore();

    const [paymentMethods, setPaymentMethods] = useState<TPayments>([]);

    const { paymentMethod, setPaymentMethod } = useCheckoutStore();

    const { items } = useCartStore();

    useEffect(() => {
        const hasSubsItems = items.some((x) => !!x.is_subs);

        getPaymentMethods(hasSubsItems ? 1 : 0)
            .then((response) => {
                setPaymentMethods(response);
            })
            .catch(handleUnauthorized);
    }, [items]);

    if (items.length === 0) return null;

    return (
        <div className="mt-10 rounded-md bg-accent p-4">
            <h3 className="text-[20px] font-bold text-accent-foreground">{t('payment-method')}</h3>

            <div className="mt-5 grid grid-cols-3 gap-8">
                {paymentMethods.map((method, index) => (
                    <div
                        onClick={() => setPaymentMethod(method.name)}
                        key={index}
                        className={joinClasses(
                            'flex-col items-center rounded bg-accent-foreground/5 py-8 hover:bg-accent-foreground/10',
                            { 'ring-2 ring-primary': method.name === paymentMethod }
                        )}
                    >
                        <Image
                            className="h-16 w-24 rounded object-cover"
                            src={`/media/payments/${method.name.toLowerCase()}.png`}
                            alt=""
                            width={80}
                            height={80}
                        />
                        <span className="mt-2">{method.name}</span>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <label className="flex-row items-center">
                    <input
                        type="checkbox"
                        onChange={(e) => setAcceptPrivacy(e.target.checked)}
                        checked={acceptPrivacy}
                    />
                    <span className="ml-4 text-accent-foreground">{t('privacy-statement')}</span>
                </label>
                <p className="mt-2 text-muted-foreground">{t('privacy-statement-description')}</p>
            </div>
        </div>
    );
};
