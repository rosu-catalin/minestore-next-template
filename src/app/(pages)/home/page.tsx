'use client';

import { useSettingsStore } from '@/stores/settings';
import { Alert } from '@layout/alert/alert';
import { FeaturedDeal } from '@layout/feratured-deal/featured-deal';
import { GiftCard } from '@layout/gift-card/giftcard';
import { RecentPurchases } from '@layout/recent-purchases/recent-purchases';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Home() {
    const { settings } = useSettingsStore();
    const t = useTranslations('home');

    return (
        <>
            <FeaturedDeals />

            <div className="flex-col rounded-[10px] bg-[#18181d]">
                <div className="p-4">
                    <Alert />

                    <div className="">
                        <div className="mt-12 flex-col items-center space-x-5 md:flex-row">
                            <div className="flex-col rounded-lg bg-[#631c2d] p-2.5 text-center md:max-w-[300px]">
                                <span className="glow-text text-[40px] font-bold">
                                    {t('welcome')}
                                </span>

                                <span className="mt-5 text-[20px]">
                                    {t('to-the-official-server-store')}
                                </span>

                                <span
                                    className="mt-5 text-[14px]"
                                    dangerouslySetInnerHTML={{ __html: settings?.block_1 || '' }}
                                ></span>
                            </div>

                            <div className="mt-8 w-full md:mt-0">
                                {settings?.block_3 && (
                                    <Image
                                        src={settings?.block_3}
                                        alt=""
                                        width={500}
                                        height={500}
                                        className="object-contain"
                                    />
                                )}
                            </div>
                        </div>

                        <div className="flex-row items-center justify-between space-x-5">
                            <div>
                                <div
                                    className="mt-12"
                                    dangerouslySetInnerHTML={{ __html: settings?.block_2 || '' }}
                                ></div>
                            </div>
                        </div>

                        <PaymentMethods />
                    </div>
                </div>

                <Modules />
            </div>
        </>
    );
}

function FeaturedDeals() {
    const { settings } = useSettingsStore();
    const t = useTranslations('home');

    if (!settings?.is_FeaturedDeal) {
    }
    if (settings?.featuredDeal_items.length === 0) return null;

    return (
        <div className="mb-4 flex-col rounded-[10px] bg-[#18181d] p-6">
            <span className="text-center text-[28px] uppercase text-[#dd2828]">
                {t('featured-packages')}
            </span>

            <hr className="mt-2 border-[2.5px] border-[#dd2828]" />

            <div className="mt-6 flex-row space-x-4">
                {settings?.featuredDeal_items?.map((item, index) => (
                    <FeaturedDeal key={index} item={item} />
                ))}
            </div>
        </div>
    );
}

function PaymentMethods() {
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

function Modules() {
    return (
        <div className="@container mt-4 border-t border-t-[#2f2f2f] px-4 py-6">
            <div className="@4xl:grid-cols-2 grid gap-6">
                <GiftCard />
                <div className="flex-col gap-4">
                    <h3 className="text-xl font-bold">
                        Recent Payments
                        <hr className="mt-2 h-1 w-12 rounded border-0 bg-[#2f2f2f]" />
                    </h3>
                    <RecentPurchases limit={7} />
                </div>
            </div>
        </div>
    );
}
