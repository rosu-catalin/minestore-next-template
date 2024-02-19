'use client';

import { useState } from 'react';
import { TItem } from '@/types/item';
import { useCartStore } from '@/stores/cart';
import { ItemDetails } from '@layout/item-details/item-details';
import { CardLayout } from './card-layout';
import { CardHeader } from './card-header';
import { CardActions } from './card-actions';

type CardProps = {
    item: TItem;
    direction?: 'row' | 'col';
    isCumulative: boolean;
    calledFromCheckout?: boolean;
    className?: string;
};

export function Card({ item, direction = 'col', isCumulative }: CardProps) {
    const [showModal, setShowModal] = useState(false);

    const { items } = useCartStore();

    const isItemInCart = items.some((x) => x.id === item.id);
    const isItemUnavailable = !isCumulative || !item.is_unavailable;

    return (
        <div>
            <CardLayout direction={direction}>
                <CardHeader item={item} direction={direction} />
                <CardActions
                    item={item}
                    direction={direction}
                    isItemInCart={isItemInCart}
                    setShowModal={setShowModal}
                    available={isItemUnavailable}
                />
            </CardLayout>
            <ItemDetails
                show={showModal}
                onHide={() => setShowModal(false)}
                id={item.id}
                available={isItemUnavailable}
            />
        </div>
    );
}
