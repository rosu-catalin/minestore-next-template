'use client';

import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { Button } from '@/components/base/button/button';
import { Input } from '@/components/base/input/input';
import { notify } from '@/core/notifications';
import { Loader2 } from 'lucide-react';
import { FC, useState } from 'react';

const { getGift } = getEndpoints(fetcher);

export const GiftCard: FC = () => {
    const [giftCode, setGiftCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGiftCode(event.target.value);
    };

    const handleCheckClick = async () => {
        try {
            setLoading(true);

            if (!giftCode) {
                throw new Error('Please enter a gift code');
            }

            const response = await getGift(giftCode);

            if (response.status) {
                notify(`Gift found with balance: ${response.end_balance}`, 'green');
            } else {
                notify('Gift not found!', 'red');
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unexpected error occurred';
            notify(message, 'red');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-col gap-4">
            <h3 className="text-xl font-bold text-accent-foreground">
                Gift Card
                <hr className="mt-2 h-1 w-12 rounded border-0 bg-accent" />
            </h3>
            <div className="flex h-full gap-2">
                <Input
                    placeholder="Card Code"
                    className="h-full w-full"
                    value={giftCode}
                    onChange={handleInputChange}
                />
                <Button
                    onClick={handleCheckClick}
                    disabled={loading || !giftCode}
                    className="h-full min-w-[120px] gap-2"
                >
                    {loading && <Loader2 size={24} className="animate-spin" />}
                    Check
                </Button>
            </div>
        </div>
    );
};
