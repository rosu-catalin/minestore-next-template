import { FC, useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { getEndpoints } from '@/api';
import { TSettings } from '@/types/settings';
import { sweetAlert } from '@helpers/sweet-alert';
import { useTranslations } from 'next-intl';

const { discordWidget, getServerOnline } = getEndpoints(axios);

type HeroSectionProps = {
    settings: TSettings;
};

export const HeroSection: FC<HeroSectionProps> = ({ settings }) => {
    const t = useTranslations('header');

    const [serverOnline, setServerOnline] = useState(0);
    const [discordOnline, setDiscordOnline] = useState(0);

    const fetchOnline = () => {
        discordWidget(settings.discord_id).then((response) => {
            setDiscordOnline(response.presence_count);
        });

        getServerOnline(settings.server.ip, settings.server.port).then((response) => {
            setServerOnline(response?.onlinePlayers || 0);
        });
    };

    useEffect(() => {
        fetchOnline();

        const timeout = setTimeout(() => {
            fetchOnline();
        }, 20_000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div className="w-full flex-row items-center justify-center">
            <div
                onClick={() => sweetAlert(`${settings.server.ip}:${settings.server.port}`)}
                className="-mt-20 hidden cursor-pointer items-center transition duration-300 hover:scale-110 lg:flex"
            >
                <ReactSVG className="h-12 w-12 text-[#e43c3c]" src="/icons/play.svg" />
                <div className="ml-0.5 flex-col">
                    <span className="glow-text text-lg font-bold">hypixel.net</span>
                    <span className="glow-text text-sm">
                        {serverOnline} {t('players-online')}
                    </span>
                </div>
            </div>

            <div className="ghost translate-y-12">
                <Link href="/">
                    <Image
                        className="levitate mx-4"
                        src="/logo.png"
                        width={381}
                        height={338}
                        alt=""
                    />
                </Link>
            </div>

            <Link
                href={settings.discord_url}
                className="-mt-20 hidden items-center transition duration-300 hover:scale-110 lg:flex"
            >
                <div className="ml-0.5 flex-col">
                    <span className="glow-text text-lg font-bold">Discord Server</span>
                    <span className="glow-text text-sm">
                        {discordOnline} {t('members-online')}
                    </span>
                </div>
                <ReactSVG className="h-12 w-12 text-[#e43c3c]" src="/icons/discord.svg" />
            </Link>
        </div>
    );
};
