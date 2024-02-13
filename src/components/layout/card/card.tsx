'use client';

import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { FC, useState } from 'react';
import { Button } from '@/components/base/button/button';
import { TItem } from '@/types/item';
import { joinClasses } from '@helpers/join-classes';
import Image from 'next/image';
import { ItemDetails } from '@layout/item-details/item-details';
import { Price } from '@/components/base/price/price';
import { useTranslations } from 'next-intl';
import { useUserStore } from '@/stores/user';
import { notify } from '@/core/notifications';
import { useCartStore } from '@/stores/cart';

const { addToCart, getCart, removeItemFromCart } = getEndpoints(fetcher);

type CardProps = {
    item: TItem;
    direction?: 'row' | 'col';
    className?: string;
    isCumulative: boolean;
    calledFromCheckout?: boolean;
};

export const Card: FC<CardProps> = ({
    item,
    direction = 'col',
    className,
    isCumulative,
    calledFromCheckout
}) => {
    const { items, setCart } = useCartStore();

    const { user } = useUserStore();

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const isRow = direction === 'row';

    const isItemFeatured = !!item.featured;

    const isPriceVirtual = item.is_virtual_currency_only === 1;
    const price = isPriceVirtual ? item.virtual_price || 0 : item.price;

    const isItemUnavailable = !isCumulative || !item.is_unavailable;

    const isItemInCart = items.some((x) => x.id === item.id);

    const t = useTranslations('card');

    const addItem = async () => {
        const cartContainsSubs = items.some((x) => x.is_subs);
        const cartContainsRegular = items.some((x) => !x.is_subs);

        if ((cartContainsSubs && !item.is_subs) || (cartContainsRegular && item.is_subs)) {
            notify('You cannot mix regular and subscription items!', 'red');
            return;
        }

        if (!isItemUnavailable) {
            return;
        }

        if (!user) {
            notify('Please authorize!', 'red');
            return;
        }

        try {
            setLoading(true);

            await addToCart(item.id, calledFromCheckout ? 1 : 0);

            const response = await getCart();

            setCart(response);

            const notificationMessage = 'Item added to cart!';
            const notificationColor = 'green';

            notify(notificationMessage, notificationColor);
        } catch (error) {
            console.error('Error while adding item:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async () => {
        try {
            setLoading(true);

            await removeItemFromCart(item.id);

            const response = await getCart();

            setCart(response);

            const notificationMessage = 'Item was deleted from cart!';
            const notificationColor = 'red';

            notify(notificationMessage, notificationColor);
        } catch (error) {
            console.error('Error while removing item:', error);
        } finally {
            setLoading(false);
        }
    };

    const productImage = (process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || '') + item.image;

    return (
        <div
            className={joinClasses(
                'relative w-full flex-shrink-0 flex-col items-center rounded-[10px] bg-[#202022] p-5',
                { 'flex-row': isRow },
                { 'bg-[url(/media/featured.png)]': isItemFeatured && !isRow },
                className
            )}
        >
            {isItemFeatured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-lg bg-accent px-4 py-1 font-bold">
                    Featured
                </div>
            )}

            {item.image && (
                <Image
                    src={productImage || '/media/placeholder.png'}
                    alt=""
                    width={140}
                    height={140}
                    className="h-[140px] w-[140px] object-contain"
                />
            )}

            <div className={joinClasses('my-2', { 'ml-8 w-[200px] flex-col': isRow })}>
                <span
                    className={joinClasses('text-center text-[20px] font-bold', {
                        'w-[200px] text-left': isRow
                    })}
                >
                    {item.name}
                </span>
                {isRow && <span>{item.description}</span>}
            </div>

            {isItemUnavailable ? (
                <div
                    className={joinClasses('mt-auto flex-col items-center', {
                        'my-auto ml-auto flex-row': isRow
                    })}
                >
                    <Price
                        originalPrice={item.original_price}
                        discount={item.discount}
                        value={price}
                        isVirtual={isPriceVirtual}
                        className="text-sm font-bold text-[#0d7516]"
                    />
                    <Button
                        disabled={loading}
                        className={joinClasses(
                            'mt-auto',
                            'disabled:cursor-not-allowed disabled:opacity-50',
                            { 'ml-2 mt-0': isRow },
                            { 'bg-accent': isItemFeatured }
                        )}
                        onClick={isItemInCart ? removeItem : addItem}
                    >
                        {isItemInCart ? t('remove') : t('buy')}
                    </Button>
                </div>
            ) : (
                <div
                    className={joinClasses('mt-auto flex-col items-center', {
                        'my-auto flex-row': isRow
                    })}
                >
                    {t('unavailable')}
                </div>
            )}

            <ItemDetails id={item.id} show={show} onHide={() => setShow(false)} />
        </div>
    );
};
