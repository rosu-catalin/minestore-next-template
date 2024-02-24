'use client';

import { FC, useState } from 'react';
import { Price } from '@/components/base/price/price';
import { TSettings } from '@/types/settings';
import { ItemDetails } from '@layout/item-details/item-details';
import Image from 'next/image';
import { useUserStore } from '@/stores/user';
import { notify } from '@/core/notifications';
import { imagePath } from '@helpers/image-path';

type FeaturedDealProps = {
    item: TSettings['featuredDeal_items'][number];
};

export const FeaturedDeal: FC<FeaturedDealProps> = ({ item }) => {
    const [show, setShow] = useState(false);

    const { user } = useUserStore();

    const handleClick = () => {
        if (user) {
            setShow(true);
        } else {
            notify('Please authorize!', 'red');
        }
    };

    return (
        <>
            <div
                onClick={handleClick}
                className="w-full flex-1 cursor-pointer flex-col items-center rounded border-2 border-[#d7042c] bg-[#e924495c] p-3 md:flex-row md:p-6"
            >
                <FeaturedImage item={item} />

                <div className="mt-4 h-full flex-col text-center md:ml-10 md:mt-0 md:text-left">
                    <span className="font-bold text-[#ffa5a5]">{item.name}</span>
                    <Price className="mt-auto" value={item.price} />
                </div>
            </div>

            {user && <ItemDetails show={show} onHide={() => setShow(false)} id={item.id} />}
        </>
    );
};

function FeaturedImage({ item }: FeaturedDealProps) {
    if (!item.image) return null;

    const imageSRC = imagePath(item.image) as string;

    return <Image src={imageSRC} width={64} height={64} alt="" />;
}
