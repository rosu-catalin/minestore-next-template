'use client';

import { FC } from 'react';
import { TSettings } from '@/types/settings';
import Image from 'next/image';
import Link from 'next/link';
import { IoLogoDiscord } from 'react-icons/io5';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { Container } from '@/components/base/container/container';
import { useTranslations } from 'next-intl';
import { ModeToggle } from '@layout/theme-selector/theme-selector';

export type FooterProps = {
    settings: TSettings;
};

export const Footer: FC<FooterProps> = ({ settings }) => {
    const t = useTranslations('footer');

    return (
        <div className="bg-card/60">
            <Container className="-mt-4 flex flex-col items-center pt-20">
                <ModeToggle />
                <div className="grid w-full grid-cols-12 items-center gap-10">
                    <div className="col-span-12 text-center md:col-span-3 md:max-w-[300px]">
                        <h2 className="text-3xl font-bold text-card-foreground">
                            {t('useful-links')}
                        </h2>
                        <div className="mx-auto mt-2 h-[5px] w-[40px] bg-primary" />
                        <Link href={settings.footer?.[0]?.url || ''} target="_blank">
                            <p className="py-3 !text-base font-bold">YouTube</p>
                        </Link>
                        <Link href={settings.footer?.[1]?.url || ''} target="_blank">
                            <p className="py-3 !text-base font-bold">Staff</p>
                        </Link>
                    </div>

                    <div className="col-span-12 flex w-full max-w-[750px] flex-col items-center justify-center px-[100px] text-center md:col-span-6">
                        <Image src="/logo.png" width={165} height={145} alt="logo" />
                        <p className="mt-1 text-xs font-bold text-white">2023 ©</p>
                        <h2 className="mt-1 text-3xl font-bold text-card-foreground">
                            {settings.website_name}
                        </h2>
                        <p className="mt-5 !text-lg font-bold">All Rights Reserved.</p>
                        <p className="">
                            {t('info')}{' '}
                            <span className="text-primary">{settings.website_name}</span>
                        </p>
                        <div className="flex w-full items-center justify-between py-8">
                            <Link href={settings.socials?.facebook || ''} target="_blank">
                                <FaFacebook className="h-[30px] w-[30px]" />
                            </Link>
                            <Link href={settings.socials?.instagram || ''} target="_blank" replace>
                                <FaInstagram className="h-[30px] w-[30px]" />
                            </Link>
                            <Link href={settings.socials?.discord || ''} target="_blank">
                                <IoLogoDiscord className="h-[30px] w-[30px]" />
                            </Link>
                            <Link href={settings.socials?.twitter || ''} target="_blank">
                                <FaTwitter className="h-[30px] w-[30px]" />
                            </Link>
                        </div>
                    </div>

                    <div className="col-span-12 max-w-[300px] text-center md:col-span-3">
                        <h2 className="text-3xl font-bold text-card-foreground">{t('about-us')}</h2>
                        <div className="mx-auto mt-2 h-[5px] w-[40px] bg-primary" />
                        <p className="mt-2">
                            {settings.website_name} {t('description')}
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    );
};
