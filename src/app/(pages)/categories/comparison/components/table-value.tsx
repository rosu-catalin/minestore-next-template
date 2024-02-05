'use client';

import { TItem } from '@/types/item';
import { FC } from 'react';

type Props = {
    item: TItem;
    index: number;
};

export const TableValue: FC<Props> = ({ item }) => {
    if (!item.comparison) {
        return <></>;
    }

    return (
        <div className="flex w-[180px] flex-shrink-0 items-center justify-center text-center">
            {/* {calcComparisonValue(value)} */}
        </div>
    );
};
