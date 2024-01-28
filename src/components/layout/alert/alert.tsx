'use client';

import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { TAnnouncement } from '@/types/announcement';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

const { getAnnouncement } = getEndpoints(fetcher);

export const Alert: FC = () => {
    const [details, setDetails] = useState<TAnnouncement>();

    useEffect(() => {
        getAnnouncement().then(setDetails);
    }, []);

    if (!details?.is_index) return null;

    return (
        <div className="h-[100px] flex-row overflow-clip rounded-lg bg-[#202022]">
            <div className="w-8 bg-[#2f2f2f] text-center text-4xl font-bold leading-[100px] text-[#ff5353]">
                !
            </div>

            <div className="flex-row items-center px-8">
                <span className="text-[20px] font-bold text-[#bd1d1d]">{details?.title}</span>

                <span
                    className="ml-8 font-bold text-[#ff7979]"
                    dangerouslySetInnerHTML={{ __html: details?.content || '' }}
                />

                <Link
                    href={details?.button_url || ''}
                    className="h-12 w-56 rounded bg-[url(/btn.png)] text-center text-[18px] font-bold uppercase leading-[48px]"
                >
                    {details?.button_name}
                </Link>
            </div>
        </div>
    );
};
