'use client';

import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { Button } from '@/components/ui/button';
import { notify } from '@/core/notifications';
import { useCartStore } from '@/stores/cart';
import { useCheckoutStore } from '@/stores/checkout';
import { useCurrencyStore } from '@/stores/currency';
import { useSettingsStore } from '@/stores/settings';
import { useTranslations } from 'next-intl';
import { FC, useState } from 'react';

const { checkout } = getEndpoints(fetcher);

export const Purchase: FC = () => {
    const settings = useSettingsStore();
    const t = useTranslations();

    const [acceptTerms, setAcceptTerms] = useState(false);

    const { details, paymentMethod, acceptPrivacy, referral } = useCheckoutStore();

    const { items } = useCartStore();

    const { currency } = useCurrencyStore();

    const validateCheckoutState = () => {
        const fields = [
            'fullname',
            'email',
            'address1',
            'city',
            'country',
            'region',
            'zipcode'
        ] as const;

        if (settings?.settings?.details) {
            for (const field of fields) {
                if (!details[field]) {
                    return t('notifications.not-all-detail-fields-are-filled-in');
                }
            }
        }

        if (!acceptPrivacy) {
            return t('accept-privacy-statement');
        }
        if (!acceptTerms) {
            return t('accept-terms');
        }

        if (items.some((x) => !!x.is_subs) && items.length > 1) {
            return t('subscription-item-should-be-alone-in-the-cart');
        }
    };

    const proceedCheckout = async () => {
        const message = validateCheckoutState();

        if (message) {
            notify(message, 'red');
            return;
        }

        if (paymentMethod == 'Stripe') {
            await loadScript('https://js.stripe.com/v3/');
        }
        if (paymentMethod == 'RazorPay') {
            await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        }

        const response = await checkout({
            currency: currency?.name || 'USD',
            details,
            paymentMethod,
            ref: referral,
            vars: []
        });

        if (response.data.type === 'url') {
            window.location.href = response.data.url;
        }
        if (response.data.type === 'html') {
            const script = document.createRange().createContextualFragment(response.data.html);
            document.body.append(script);
        }
    };

    if (items.length === 0) return null;

    return (
        <div className="mt-8 flex-row items-center pb-4">
            <label className="flex-row items-center">
                <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                />
                <span className="ml-2">{t('checkout.agree')}</span>
            </label>
            <Button className="ml-auto w-[140px] uppercase" onClick={proceedCheckout}>
                {t('checkout.purchase')}
            </Button>
        </div>
    );
};

const loadScript = (src: string) =>
    new Promise((resolve) => {
        const script = document.createElement('script');

        script.onload = function () {
            resolve(null);
        };

        script.src = src;

        document.head.appendChild(script);
    });
