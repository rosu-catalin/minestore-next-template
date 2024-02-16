'use client';

import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { useState } from 'react';
import { TItem } from '@/types/item';
import { useUserStore } from '@/stores/user';
import { notify } from '@/core/notifications';
import { useCartStore } from '@/stores/cart';
import { ItemDetails } from '@layout/item-details/item-details';
import { CardLayout } from './card-layout';
import { CardHeader } from './card-header';
import { CardActions } from './card-actions';

const { addToCart, getCart, removeItemFromCart } = getEndpoints(fetcher);

type CardProps = {
    item: TItem;
    direction?: 'row' | 'col';
    isCumulative: boolean;
    calledFromCheckout?: boolean;
    className?: string;
};

export function Card({ item, direction = 'col', calledFromCheckout, isCumulative }: CardProps) {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const { items, setCart } = useCartStore();

    const { user } = useUserStore();

    const isItemInCart = items.some((x) => x.id === item.id);
    const isItemUnavailable = !isCumulative || !item.is_unavailable;

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

    return (
        <div>
            <CardLayout direction={direction}>
                <CardHeader item={item} direction={direction} />
                <CardActions
                    direction={direction}
                    isItemInCart={isItemInCart}
                    loading={loading}
                    addItem={addItem}
                    removeItem={removeItem}
                    setShowModal={setShowModal}
                    available={isItemUnavailable}
                />
            </CardLayout>
            <ItemDetails id={item.id} show={showModal} onHide={() => setShowModal(false)} />
        </div>
    );
}
