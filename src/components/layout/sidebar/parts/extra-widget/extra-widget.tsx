'use client';

import { FC } from 'react';
import { RecentPurchases } from '@layout/recent-purchases/recent-purchases';
import { useTranslations } from 'next-intl';
import { FaCrown, FaGhost, FaHatWizard } from 'react-icons/fa';
import Image from 'next/image';
import { TSettings } from '@/types/settings';

type ExtraWidgetProps = {
    settings: TSettings;
};

export const ExtraWidget: FC<ExtraWidgetProps> = ({ settings }) => {
    const t = useTranslations();

    return (
        <div className="mt-4 hidden w-full rounded-[10px] bg-[#18181d] p-8 lg:block">
            <div className="w-full flex-row items-center justify-center rounded-[10px] bg-[#202022] py-4 font-bold">
                <FaGhost className="hidden fill-white xl:block" />
                <span className="ml-8">{t('sidebar.top-donator')}</span>
            </div>
            <div className="flex-row items-center">
                <div className="-mt-20 h-[180px] overflow-hidden">
                    <Image
                        src={settings.top.avatar}
                        alt="Avatar"
                        width={87}
                        height={207}
                        className="w-[87px] xl:h-[207px]"
                    />
                </div>
                <div className="mx-auto flex-1 flex-col items-center">
                    <div className="flex-row items-center">
                        <FaCrown className="h-[21px] w-[25px] fill-[#ffb829]" />
                        <span className="ml-2 text-[20px] font-bold text-accent">
                            {settings.top.username}
                        </span>
                    </div>
                    <span className="mt-2 px-4 text-center text-xs">
                        {t('sidebar.top-donator-hint')}
                    </span>
                </div>
            </div>
            <div className="w-full flex-row items-center justify-center rounded-[10px] bg-[#202022] py-4 font-bold">
                <span className="mr-4">{t('recent-purchases')}</span>
                <FaHatWizard className="fill-white" />
            </div>
            <RecentPurchases />
        </div>
    );
};
