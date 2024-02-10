'use client';

import { FC } from 'react';
import { useSettingsStore } from '@/stores/settings';
import Image from 'next/image';
import Link from 'next/link';
import { Tooltip as ReactTooltip } from 'react-tooltip';

export const RecentPurchases: FC = () => {
    const { settings } = useSettingsStore();

    return (
        <div className="min-w-[300px] flex-col">
            <div className="mt-5 grid grid-cols-4 gap-6">
                {settings?.lastPayments1.map((item, index) => (
                    <Link
                        data-tooltip-id="username-tooltip"
                        data-tooltip-content={item.username}
                        href={`/profile/${item.username}`}
                        key={index}
                    >
                        <Image
                            src={`https://mc-heads.net/avatar/${item.username}`}
                            alt={item.username}
                            width={50}
                            height={50}
                            className="aspect-square w-full"
                        />
                    </Link>
                ))}
            </div>
            <div className="mx-auto my-5 h-[1px] w-1/2 bg-white/20" />
            <div className="grid grid-cols-4 gap-6">
                {settings?.lastPayments2.map((item, index) => (
                    <Link
                        data-tooltip-id="username-tooltip"
                        data-tooltip-content={item.username}
                        href={`/profile/${item.username}`}
                        key={index}
                    >
                        <Image
                            src={`https://mc-heads.net/avatar/${item.username}`}
                            alt={item.username}
                            width={50}
                            height={50}
                            className="aspect-square w-full"
                        />
                    </Link>
                ))}
            </div>
            <ReactTooltip
                id="username-tooltip"
                place="top"
                className="bg-red-500"
                style={{ backgroundColor: 'red', borderRadius: 10, padding: 2, fontWeight: 'bold' }}
            />
        </div>
    );
};
