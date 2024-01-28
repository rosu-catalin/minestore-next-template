'use client';

import { FC } from 'react';
import { Navbar } from '@layout/navbar/navbar';
import Image from 'next/image';
import { TSettings } from '@/types/settings';
import { ReactSVG } from 'react-svg';
import { HeroSection } from './sections/hero-section';
import { Container } from '@/components/base/container/container';
import { convertToLocalCurrency } from '@helpers/convert-to-local-currency';
import { useCurrencyStore } from '@/stores/currency';
import { useUserStore } from '@/stores/user';
import Link from 'next/link';

import './Header.css';
import { useTranslations } from 'next-intl';

type HeaderProps = {
    settings: TSettings;
};

export const Header: FC<HeaderProps> = ({ settings }) => {
    const { currency } = useCurrencyStore();

    const t = useTranslations('header');

    const goal = {
        total: convertToLocalCurrency(parseFloat(settings.goal)),
        filled: convertToLocalCurrency(parseFloat(settings.goal_sum))
    };

    console.log(settings);

    const percent = (goal.filled / goal.total) * 100;

    const { user } = useUserStore();

    return (
        <header>
            <div className="relative">
                <Image
                    src="/background.png"
                    className="absolute -z-10 h-full w-full object-cover"
                    width={1590}
                    height={352}
                    alt=""
                />

                <Navbar settings={settings} />

                <HeroSection settings={settings} />
            </div>

            <Container>
                <div className="flex h-[110px] items-center rounded-[10px] bg-[url(/bg.png)] px-5">
                    <div className="flex-col">
                        <div className="flex-row items-center">
                            <span className="text-xl font-bold">{t('donation-goal')}</span>
                            <ReactSVG className="ml-5" src="/icons/donation.svg" />
                        </div>
                        <div className="flex-row items-center">
                            <span>
                                {goal.filled.toFixed(2)}/{goal.total.toFixed(2)} {currency?.name}
                            </span>
                            <span className="ml-auto mr-6 hidden md:inline">
                                {percent.toFixed(0)}%
                            </span>
                        </div>
                        <div className="mt-4 hidden h-2 w-[300px] overflow-hidden rounded-full bg-[#363636] p-[1px] md:block">
                            <div
                                className="h-1.5 rounded-full bg-white shadow shadow-white"
                                style={{ width: `${percent}%` }}
                            />
                        </div>
                    </div>

                    {user && (
                        <>
                            <div className="ml-auto mr-8 flex-col">
                                <span className="glow-text text-[25px] font-bold">
                                    {user.username}
                                </span>
                                <span className="ml-4">{user.virtual_currency} QQ</span>
                            </div>

                            <div className="relative top-[-45px] hidden h-[200px] overflow-hidden md:block">
                                <Link href="/profile">
                                    <Image
                                        src={user.avatar || ''}
                                        alt="Avatar"
                                        className="h-[270px] w-[111px] -scale-x-100"
                                        width={111}
                                        height={270}
                                    />
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </Container>
        </header>
    );
};
