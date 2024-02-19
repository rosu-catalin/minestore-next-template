import { notify } from '@/core/notifications';
import { useCartStore } from '@/stores/cart';
import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { useUserStore } from '@/stores/user';

const { addToCart, getCart, removeItemFromCart, getItem } = getEndpoints(fetcher);

export const useCartActions = () => {
    const { user } = useUserStore();
    const { items, setCart } = useCartStore();

    const handleAddItem = async (id: number, calledFromCheckout: boolean) => {
        const cartContainsSubs = items.some((x) => x.is_subs);
        const cartContainsRegular = items.some((x) => !x.is_subs);

        const currentItem = await getItem(id);

        if (!currentItem) {
            notify('Item not found!', 'red');
            return;
        }

        if (
            (cartContainsSubs && !currentItem.is_subs) ||
            (cartContainsRegular && currentItem.is_subs)
        ) {
            notify('You cannot mix regular and subscription items!', 'red');
            return;
        }

        if (!user) {
            notify('Please authorize!', 'red');
            return;
        }

        try {
            await addToCart(
                id,
                currentItem.is_subs ? 'subscription' : 'regular',
                calledFromCheckout ? 1 : 0
            );

            const response = await getCart();

            setCart(response);

            const notificationMessage = 'Item added to cart!';
            const notificationColor = 'green';

            notify(notificationMessage, notificationColor);
        } catch (error) {
            console.error('Error while adding item:', error);
        }
    };

    const handleRemoveItem = async (id: number) => {
        try {
            await removeItemFromCart(id);

            const response = await getCart();

            setCart(response);

            const notificationMessage = 'Item was deleted from cart!';
            const notificationColor = 'red';

            notify(notificationMessage, notificationColor);
        } catch (error) {
            console.error('Error while removing item:', error);
        }
    };

    return {
        handleAddItem,
        handleRemoveItem
    };
};
