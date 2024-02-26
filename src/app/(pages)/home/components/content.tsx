'use client';

import { useSettingsStore } from '@/stores/settings';
import { useTranslations } from 'next-intl';
import { PaymentMethods } from './payment-methods';
import Image from 'next/image';

export function Content() {
    const { settings } = useSettingsStore();
    const t = useTranslations('home');
    return (
        <div className="">
            <div className="mt-12 flex-col items-center space-x-5 md:flex-row">
                <div className="flex-col rounded-md bg-primary/20 p-2.5 text-center md:max-w-[300px]">
                    <span className="text-[40px] font-bold text-foreground">{t('welcome')}</span>

                    <span className="mt-5 text-[20px] text-foreground/80">
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
    );
}
