'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function PaymentMethods() {
    const t = useTranslations('home');

    return (
        <div className="mt-10">
            <div className="flex-row py-4">
                <div className="w-32">
                    <Image src="/paypal.png" alt=" " width={110} height={29} />
                </div>
                <span className="ml-12">{t('paypal-balance-banks-all-credit-debit-cards')}</span>
            </div>

            <hr className="w-64" />

            <div className="flex-row py-4">
                <div className="w-32">
                    <Image src="/paymentwall.png" alt=" " width={108} height={26} />
                </div>
                <span className="ml-12">
                    {t('paysafecard-amazon-pay-mobile-payments-600-more')}
                </span>
            </div>

            <hr className="w-64" />

            <div className="flex-row py-4">
                <div className="w-32">
                    <Image src="/stripe.png" alt=" " width={66} height={27} />
                </div>
                <span className="ml-12">{t('all-credit-debit-cards')}</span>
            </div>
        </div>
    );
}
