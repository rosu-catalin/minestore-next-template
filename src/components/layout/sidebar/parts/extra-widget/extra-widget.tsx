'use client';

import { FC } from 'react';
import { RecentPurchases } from '@layout/recent-purchases/recent-purchases';
import { useTranslations } from 'next-intl';
import { FaGhost, FaHatWizard } from 'react-icons/fa';
import Image from 'next/image';
import { TSettings } from '@/types/settings';

type ExtraWidgetProps = {
    settings: TSettings;
};

export const ExtraWidget: FC<ExtraWidgetProps> = ({ settings }) => {
    const t = useTranslations();
    const { username, avatar } = settings?.top;

    return (
        <div className="mt-4 hidden w-full rounded-[10px] bg-[#18181d] p-8 lg:block">
            <div className="flex items-center justify-center gap-2 rounded-[10px] bg-[#202022] py-4 font-bold">
                <FaGhost className="fill-white" />
                <h3 className="text-white">{t('sidebar.top-donator')}</h3>
            </div>
            <div className="my-4 flex items-start justify-center">
                <Image
                    src={avatar || 'https://mc-heads.net/body/MHF_Question'}
                    alt="Avatar"
                    width={120}
                    height={120}
                    className="h-[120px] w-[120px] object-contain"
                />
                <div className="mt-4">
                    <h3 className="text-xl font-bold text-accent">
                        {username || t('sidebar.no-top-donor')}
                    </h3>
                    <p className="text-sm">
                        {username
                            ? t('sidebar.top-donator-hint')
                            : t('sidebar.no-top-donor-description')}
                    </p>
                </div>
            </div>
            <div className="mb-4 flex items-center justify-center gap-2 rounded-[10px] bg-[#202022] py-4 font-bold">
                <h3 className="text-white">{t('recent-purchases')}</h3>
                <FaHatWizard className="fill-white" />
            </div>
            <RecentPurchases limit={10} />
        </div>
    );
};
