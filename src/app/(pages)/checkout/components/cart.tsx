'use client';

import { FC } from 'react';
import { CartItem } from './cart-item';
import { Price } from '@/components/base/price/price';
import { useCartStore } from '@/stores/cart';
import { useTranslations } from 'next-intl';

export const Cart: FC = () => {
    const t = useTranslations('checkout');
    const { cart, items } = useCartStore();

    console.log(cart, items);

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

            {items?.length > 0 && (
                <div className="mt-6 rounded-[10px] border-4 border-[#202022]">
                    <div className="flex-row items-center border-b-4 border-[#202022] py-4">
                        <div className="w-28"></div>
                        <div className="w-[160px] text-[20px] font-bold text-accent">
                            {t('name')}
                        </div>
                        <div className="w-[120px] text-[20px] font-bold text-accent">
                            {t('price')}
                        </div>
                        <div className="ml-auto mr-[115px] w-[120px] text-[20px] font-bold text-accent">
                            {t('quantity')}
                        </div>
                    </div>
                    {items?.map((item, index) => <CartItem key={index} item={item} />)}
                </div>
            )}
        </>
    );
};
