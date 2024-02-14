'use client';

import { FC, useEffect, useState } from 'react';
import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { Card } from '@layout/card/card';
import { TItem } from '@/types/item';
import { useTranslations } from 'next-intl';

const { getRecommends } = getEndpoints(fetcher);

export const FeaturedDeal: FC = () => {
    const t = useTranslations('checkout');

    const [recommends, setRecommends] = useState<Array<TItem>>([]);

    useEffect(() => {
        getRecommends().then((data) => {
            setRecommends(data);
        });
    }, []);

    if (recommends.length === 0) return null;

    return (
        <>
            <span className="mt-8 text-center text-[30px] uppercase text-[#dd2828]">
                {t('featured-deal')}
            </span>

            <hr className="border-2 border-[#dd2828]" />

            <div className="mt-6 grid gap-4">
                {recommends.map((item, index) => (
                    <Card
                        calledFromCheckout={true}
                        isCumulative={false}
                        key={index}
                        direction="row"
                        item={{
                            ...item,
                            description: t('this-item-is-popular-among-us-customers')
                        }}
                    />
                ))}
            </div>

            <hr className="my-8 border-2 border-[#dd2828]" />
        </>
    );
};
