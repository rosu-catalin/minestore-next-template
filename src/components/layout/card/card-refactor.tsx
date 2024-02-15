'use client';

import { Button } from '@/components/base/button/button';
import { Price } from '@/components/base/price/price';
import Image from 'next/image';

export default function CardRefactored() {
    return (
        <div className="flex flex-col gap-4 rounded-md border border-[#2d2d30] bg-[#202022] p-4">
            <div className="grid gap-4">
                <div>
                    <Image
                        src="http://experimental.minestorecms.com/img/items/16.png"
                        width={190}
                        height={165}
                        alt="Silver VIP"
                        className="mx-auto h-[165px] w-[190px] object-contain"
                    />
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-bold text-white">Silver VIP</h3>
                    <Price value={100} />
                </div>
            </div>
            <div className="flex items-center justify-center gap-2">
                <Button
                    aria-label="Info"
                    className="flex h-[50px] min-w-[50px] items-center justify-center bg-[#38383b]"
                ></Button>
                <Button className="h-[50px] w-full">Add to Cart</Button>
            </div>
        </div>
    );
}
