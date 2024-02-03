'use client';

import { FC, useEffect } from 'react';
import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { CartItem } from './cart-item';
import { Price } from '@/components/base/price/price';
import { useCartStore } from '@/stores/cart';
import { handleUnauthorized } from '@/api/client/handlers';
import { useTranslations } from 'next-intl';

const { getCart } = getEndpoints(fetcher);

export const Cart: FC = () => {
    const t = useTranslations('checkout');

    const { cart, items, setCart } = useCartStore();

    console.log(items);

    const loadCartDetails = () => {
        getCart().then(setCart).catch(handleUnauthorized);
    };

    useEffect(loadCartDetails, [setCart]);

    return (
        <>
            <div className="mt-12 flex-row rounded-[10px] bg-[url(/bg.png)] bg-cover p-9">
                <span className="glow-text text-[25px] font-bold">{t('title')}</span>
                <span className="glow-text ml-auto text-[25px] font-bold">
                    <Price value={cart?.price || 0} />
                    {cart?.virtual_price ? ` / ${cart.virtual_price} QQ` : ''}
                    {cart?.tax ? (
                        <span>
                            {' '}
                            + <Price value={cart.tax} /> (tax)
                        </span>
                    ) : (
                        ''
                    )}
                </span>
            </div>

            <div className="mt-6 rounded-[10px] border-4 border-[#202022]">
                <div className="flex-row items-center border-b-4 border-[#202022] py-4">
                    <div className="w-28"></div>
                    <div className="w-[160px] text-[20px] font-bold text-accent">{t('name')}</div>
                    <div className="w-[120px] text-[20px] font-bold text-accent">{t('price')}</div>
                    <div className="ml-auto mr-[115px] w-[120px] text-[20px] font-bold text-accent">
                        {t('quantity')}
                    </div>
                </div>
                {items?.map((item, index) => (
                    <CartItem onChangeQuantity={loadCartDetails} key={index} item={item} />
                ))}
            </div>
        </>
    );
};
