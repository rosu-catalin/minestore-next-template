'use client';

import { FC } from 'react';
import { CartItem } from './cart-item';
import { Price } from '@/components/base/price/price';
import { useCartStore } from '@/stores/cart';
import { useTranslations } from 'next-intl';
import { Table, TableHeader, TableRow, TableHead, TableBody } from '@/components/base/table/table';
import { TCart } from '@/types/cart';

export const Cart: FC = () => {
    const t = useTranslations('checkout');
    const { cart, items } = useCartStore();

    console.log('cart items', items);

    return (
        <>
            <div className="flex-row rounded-[10px] bg-[url(/bg.png)] bg-cover p-9">
                <span className="text-[25px] font-bold text-accent-foreground">{t('title')}</span>
                <span className="ml-auto text-[25px] font-bold">
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

            <CartItems items={items} />
        </>
    );
};

function CartItems({ items }: { items: TCart['items'] }) {
    const t = useTranslations('checkout');

    if (items.length === 0) {
        return (
            <div className="mt-12 flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-primary">{t('empty-cart-title')}</h1>
                <p className="text-balance">{t('empty-cart-description')}</p>
            </div>
        );
    }

    return (
        <Table className="my-4 border-4 border-accent">
            <TableHeader className="[&_tr]:border-b-4">
                <TableRow className="border-accent">
                    <TableHead className="hidden md:table-cell md:w-[100px]">
                        <span className="sr-only">{t('image')}</span>
                    </TableHead>
                    <TableHead className="w-[300px] text-base font-bold text-primary md:text-lg">
                        {t('name')}
                    </TableHead>
                    <TableHead className="w-[200px] text-base font-bold text-primary md:text-lg">
                        {t('price')}
                    </TableHead>
                    <TableHead className="w-[130px] text-base font-bold text-primary md:text-lg">
                        {t('quantity')}
                    </TableHead>
                    <TableHead>
                        <span className="sr-only">{t('actions')}</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="[&_tr]:border-b-4">
                {items?.map((item) => <CartItem key={item.id} item={item} />)}
            </TableBody>
        </Table>
    );
}
