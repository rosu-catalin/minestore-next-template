'use client';

import { FC } from 'react';
import { CartItem } from './cart-item';
import { Price } from '@/components/base/price/price';
import { useCartStore } from '@/stores/cart';
import { useTranslations } from 'next-intl';
import { Table, TableHeader, TableRow, TableHead, TableBody } from '@/components/base/table/table';

export const Cart: FC = () => {
    const t = useTranslations('checkout');
    const { cart, items } = useCartStore();

    console.log('cart', cart);
    console.log('items', items);

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

            {items.length > 0 && (
                <Table className="my-4 border-4 border-[#202022]">
                    <TableHeader className="[&_tr]:border-b-4">
                        <TableRow className="border-[#202022]">
                            <TableHead className="hidden w-[100px] md:block">
                                <span className="sr-only">Image</span>
                            </TableHead>
                            <TableHead className="w-[300px] text-base font-bold text-accent md:text-lg">
                                Name
                            </TableHead>
                            <TableHead className="text-base font-bold text-accent md:text-lg">
                                Price
                            </TableHead>
                            <TableHead className="w-[130px] text-base font-bold text-accent md:text-lg">
                                Quantity
                            </TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="[&_tr]:border-b-4">
                        {items?.map((item, index) => <CartItem key={index} item={item} />)}
                    </TableBody>
                </Table>
            )}
        </>
    );
};
