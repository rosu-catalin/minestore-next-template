import { notify } from '@/core/notifications';
import { useCartStore } from '@/stores/cart';
import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { useUserStore } from '@/stores/user';
import { TItem } from '@/types/item';

const { addToCart, getCart, removeItemFromCart, getItem } = getEndpoints(fetcher);

export const useCartActions = () => {
    const { user } = useUserStore();
    const { items, setCart } = useCartStore();

    const handleAddItem = async (id: number, calledFromCheckout: boolean) => {
        const currentItem = await getItem(id);

        if (!user) {
            notify('Please authorize!', 'red');
            return;
        }

        if (!isCartCompatibleForItem(currentItem)) {
            return;
        }

        try {
            await addToCart({
                id,
                payment_type: calledFromCheckout ? 'subscription' : 'regular',
                promoted: calledFromCheckout
            });

            const response = await getCart();

            setCart(response);

            const notificationMessage = 'Item added to cart!';
            const notificationColor = 'green';

            notify(notificationMessage, notificationColor);
        } catch (error) {
            console.error('Error while adding item:', error);
        }
    };

    function isCartCompatibleForItem(currentItem: TItem) {
        const cartContainsSubs = items.some((x) => x.is_subs);
        const cartContainsRegular = items.some((x) => !x.is_subs);

        const showError = (message: string) => {
            notify(message, 'red');
            return false;
        };

        if (!currentItem) {
            return showError('Item not found!');
        }

        if (currentItem.is_subs && cartContainsRegular) {
            return showError("Can't add a subscription to cart with a regular item!");
        }

        if (!currentItem.is_subs && cartContainsSubs) {
            return showError("Can't add a regular item to cart with a subscription!");
        }

        if (currentItem.is_subs && cartContainsSubs) {
            return showError("Can't add a subscription to cart with another subscription!");
        }

        // if (currentItem.quantityGlobalCurrentLimit === currentItem.quantityGlobalLimit) {
        //     return showError('Item is out of stock!');
        // }

        // if (currentItem.quantityUserLimit === 0) {
        //     return showError('You have reached the limit for this item!');
        // }

        return true;
    }

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
