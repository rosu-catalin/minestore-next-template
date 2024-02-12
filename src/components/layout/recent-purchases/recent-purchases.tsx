'use client';

import { useSettingsStore } from '@/stores/settings';
import { joinClasses } from '@helpers/join-classes';
import Image from 'next/image';
import Link from 'next/link';
import { Tooltip as ReactTooltip } from 'react-tooltip';

export const RecentPurchases = ({ limit = 10 }: { limit: number }) => {
    const { settings } = useSettingsStore();

    const recentDonators = settings?.recentDonators.slice(0, limit) || [];
    const remainingDonators = limit - recentDonators.length;

    return (
        <div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(57px,100%),1fr))] gap-2">
                {recentDonators?.length ? (
                    <>
                        {recentDonators.map((item, index) => (
                            <Donor key={index} username={item.username} avatar={item.avatar} />
                        ))}
                        {remainingDonators > 0 &&
                            Array.from({ length: remainingDonators }).map((_, index) => (
                                <SkeletonDonor key={index} />
                            ))}
                    </>
                ) : (
                    Array.from({ length: limit }).map((_, index) => <SkeletonDonor key={index} />)
                )}
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

function Donor({ username, avatar }: { username: string; avatar: string }) {
    return (
        <Link
            href={`/profile/${username}`}
            data-tooltip-id="username-tooltip"
            data-tooltip-content={username}
            className="h-[60px] w-[60px] overflow-hidden rounded-md"
        >
            <Image
                src={avatar}
                alt={username}
                width={60}
                height={60}
                className="h-full w-full rounded-md object-cover"
            />
        </Link>
    );
}

type SkeletonDonorProps = {
    className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

function SkeletonDonor({ className, ...props }: SkeletonDonorProps) {
    return (
        <div
            className={joinClasses('h-[60px] w-[60px] rounded-md bg-[#2c2c31]', className)}
            {...props}
        />
    );
}
