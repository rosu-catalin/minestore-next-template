'use client';

import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { Button } from '@/components/base/button/button';
import { Input } from '@/components/base/input/input';
import { notify } from '@/core/notifications';
import { AxiosError } from 'axios';
import { FC, useState } from 'react';

const { getGift } = getEndpoints(fetcher);

export const GiftCard: FC = () => {
    const [giftCode, setGiftCode] = useState('');

    const check = async () => {
        const response = await getGift(giftCode).catch((error: AxiosError) => {
            if (error.response?.status === 401) {
                notify('You have to authorize before check card balance!', 'red');
            } else {
                notify('Something went wrong!', 'red');
            }
            return undefined;
        });

        if (!response) {
            return;
        }

        if (response.status) {
            notify(`Current balance: ${response.end_balance}`, 'green');
        } else {
            notify('Gift not found!', 'red');
        }
    };

    return (
        <div className="flex-col">
            <span className="mt-20 text-[20px] font-bold">Gift Card</span>
            <Input placeholder="Card Code" className="mt-6" onChange={setGiftCode} />
            <Button onClick={check} className="mx-auto mt-4">
                Check
            </Button>
        </div>
    );
};
