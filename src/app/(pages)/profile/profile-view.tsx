'use client';

import { FC } from 'react';
import { Price } from '@/components/base/price/price';
import { TProfile } from '@/types/profile';
import { Card } from '@layout/card/card';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type ProfileViewProps = {
    profile: TProfile;
};

export const ProfileView: FC<ProfileViewProps> = ({ profile }) => {
    const t = useTranslations('profile');

    return (
        <div className="flex-col rounded-[10px] bg-card p-6">
            <div className="flex-row rounded-[10px] bg-[url(/bg.png)] bg-cover p-9">
                <h2 className="text-[25px] font-bold text-accent-foreground">{t('title')}</h2>
            </div>

            <div className="mt-8 flex-row items-start">
                <div className="w-1/2 flex-col items-center">
                    <Image
                        src={`https://mc-heads.net/body/${profile.username}`}
                        height={475}
                        width={198}
                        alt={profile.displayname}
                    />
                    <div className="mt-4 rounded bg-accent px-4 text-xl font-bold leading-10 text-accent-foreground">
                        {profile.displayname}
                    </div>
                </div>
                <div className="w-1/2 flex-col rounded-lg border-4 border-accent p-6">
                    <div className="text-xl font-bold text-primary">{t('information')}</div>
                    <div className="mt-8">
                        <div className="flex-row items-center">
                            <span className="font-bold text-accent-foreground">
                                {t('registration-date')}
                            </span>
                            <span className="ml-auto">{profile.created}</span>
                        </div>
                        <div className="mt-4 flex-row items-center">
                            <span className="font-bold text-accent-foreground">
                                {t('money-spent')}
                            </span>
                            <Price value={profile.money_spent} className="ml-auto" />
                        </div>
                    </div>
                </div>
            </div>

            <h1 className="mt-8 text-center text-[34px] text-primary">{t('recent-purchases')}</h1>
            <hr className="mt-5 border-[3px] border-primary" />

            <div className="mt-8 grid grid-cols-3 gap-8">
                {profile?.items?.map((item, index) => <Card key={index} item={item} />)}
            </div>
        </div>
    );
};
