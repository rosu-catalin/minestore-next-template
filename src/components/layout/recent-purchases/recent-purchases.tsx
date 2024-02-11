'use client';

import { useSettingsStore } from '@/stores/settings';
import { joinClasses } from '@helpers/join-classes';
import Image from 'next/image';
import Link from 'next/link';
import { Tooltip as ReactTooltip } from 'react-tooltip';

export const RecentPurchases = () => {
    const { settings } = useSettingsStore();

    const recentDonators = settings?.recentDonators.slice(0, 10) || [];
    const remainingDonators = 10 - recentDonators.length;

    return (
        <div>
            <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(52px,100%),1fr))] gap-2">
                {recentDonators?.length ? (
                    <>
                        {recentDonators.map((item, index) => (
                            <Donor key={index} username={item.username} />
                        ))}
                        {remainingDonators > 0 &&
                            Array.from({ length: remainingDonators }).map((_, index) => (
                                <SkeletonDonor key={index} />
                            ))}
                    </>
                ) : (
                    Array.from({ length: 10 }).map((_, index) => (
                        <SkeletonDonor key={index} className="h-[60px] w-[60px]" />
                    ))
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

function Donor({ username }: { username: string }) {
    return (
        <Link
            href={`/profile/${username}`}
            data-tooltip-id="username-tooltip"
            data-tooltip-content={username}
        >
            <Image
                src={`https://mc-heads.net/avatar/${username}`}
                alt={username}
                width={52}
                height={52}
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
            className={joinClasses('h-full w-full rounded-md bg-[#2c2c31]', className)}
            {...props}
        />
    );
}
