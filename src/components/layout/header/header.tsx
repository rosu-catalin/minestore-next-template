'use client';

import { FC } from 'react';
import { Navbar } from '@layout/navbar/navbar';
import Image from 'next/image';
import { TSettings } from '@/types/settings';
import { HeroSection } from './sections/hero-section';
import { Container } from '@/components/base/container/container';
import { convertToLocalCurrency } from '@helpers/convert-to-local-currency';
import { useCurrencyStore } from '@/stores/currency';
import { useUserStore } from '@/stores/user';
import Link from 'next/link';

import './Header.css';
import { Progress } from '@/components/ui/progress';

type HeaderProps = {
    settings: TSettings;
};

export const Header: FC<HeaderProps> = ({ settings }) => {
    const { user } = useUserStore();

    return (
        <header>
            <div className="absolute inset-0 -z-20 h-[525px] w-full">
                <div className="hero-image before:bg-primary/20 dark:before:bg-transparent">
                    <Image
                        src="/background.jpg"
                        className="absolute -z-10 h-full w-full object-cover opacity-60"
                        width={1590}
                        height={352}
                        alt=""
                    />
                    <svg
                        className="absolute inset-0 top-[280px] z-[-1] h-full w-full"
                        viewBox="0 0 1440 224"
                        fill="none"
                        preserveAspectRatio="xMidYMid slice"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M720 90.7C960 85 1200 43 1320 21.3L1440 0V224H1320C1200 224 960 224 720 224V90.7Z"
                            fill="hsl(var(--background))"
                            fillOpacity="1"
                        />
                        <path
                            d="M720 90.7C480 85 240 43 120 21.3L0 0V224H120C240 224 480 224 720 224V90.7Z"
                            fill="hsl(var(--background))"
                            fillOpacity="1"
                        />
                    </svg>
                </div>
            </div>

            <div className="relative">
                <Navbar settings={settings} />

                <HeroSection settings={settings} />
            </div>

            <Container>
                <div className="relative flex h-[110px] items-center bg-primary/20 px-5">
                    <div className="absolute inset-0 -z-10 size-full rounded-md bg-primary"></div>
                    <div className="absolute inset-0 -z-10 size-full rounded-md bg-[url(/bg.jpg)] bg-cover opacity-20"></div>

                    <DonationGoal goal={settings.goals} />

                    {user && (
                        <>
                            <div className="relative ml-auto mr-8 flex-col">
                                <span className="text-[25px] font-bold text-white dark:text-accent-foreground">
                                    {user.username}
                                </span>
                                <span className="ml-4 text-accent-foreground/80">
                                    {user.virtual_currency} {settings.virtual_currency}
                                </span>
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

function DonationGoal({ goal }: { goal: TSettings['goals'] }) {
    const { currency } = useCurrencyStore();

    if (!goal.length) return null;

    const { current_amount, goal_amount, name } = goal[0];

    const filled = convertToLocalCurrency(current_amount).toFixed(2);
    const goalValue = convertToLocalCurrency(goal_amount).toFixed(2);

    const percent = (current_amount / goal_amount) * 100;

    return (
        <div className="relative flex-col gap-2">
            <div className="flex items-center gap-6">
                <div>
                    <p className="text-xl font-bold text-white dark:text-accent-foreground">
                        <span className="sr-only">Donation Goal</span>
                        {name}
                    </p>
                    <p className="text-accent-foreground/80">
                        <span className="sr-only">
                            The goal is {name} and the current amount is {filled} out of {goalValue}{' '}
                            {currency?.name || 'USD'}
                        </span>
                        {filled} / {goalValue} {currency?.name || ''}
                    </p>
                </div>
                <p className="font-bold text-white dark:text-accent-foreground">
                    <span className="sr-only">Progress</span>
                    {percent.toFixed(2)}%
                </p>
            </div>

            <Progress value={percent} className="h-2" />
        </div>
    );
}
