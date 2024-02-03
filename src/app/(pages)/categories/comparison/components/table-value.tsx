'use client';

import { TItem } from '@/types/item';
import { FC } from 'react';
import { ReactSVG } from 'react-svg';

type Props = {
    item: TItem;
    index: number;
};

export const TableValue: FC<Props> = ({ item, index }) => {
    if (!item.comparison) {
        return <></>;
    }

    const comparison = item.comparison;
    console.log(comparison);

    return (
        <div className="flex w-[180px] flex-shrink-0 items-center justify-center text-center">
            {/* {calcComparisonValue(value)} */}
        </div>
    );
};

const calcComparisonValue = (value: any) => {
    if (value === '1') {
        return <ReactSVG src="/icons/done.svg" className="text-[#008000]" />;
    }
    if (value === '0') {
        return <ReactSVG src="/icons/close.svg" className="text-[#ff0000]" />;
    }

    return value;
};
