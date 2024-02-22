import { notify } from '@/core/notifications';
import { useCartStore } from '@/stores/cart';
import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { useUserStore } from '@/stores/user';
import { TItem } from '@/types/item';

const { addToCart, getCart, removeItemFromCart, getItem } = getEndpoints(fetcher);

type THandleAddItem = {
    id: number;
    calledFromCheckout: boolean;
    payment_type: 'regular' | 'subscription';
    itemType: 'regular' | 'subscription';
};

export const useCartActions = () => {
    const { user } = useUserStore();
    const { items, setCart } = useCartStore();

    const handleAddItem = async ({
        id,
        calledFromCheckout,
        payment_type,
        itemType
    }: THandleAddItem) => {
        const currentItem = await getItem(id);

        if (!user) {
            notify('Please authorize!', 'red');
            return;
        }

        if (!isCartCompatibleForItem(currentItem, itemType)) {
            return;
        }

        try {
            await addToCart({
                id,
                payment_type,
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

    function isCartCompatibleForItem(currentItem: TItem, itemType: 'regular' | 'subscription') {
        const cartContainsSubs = items.some((x) => x.payment_type === 1);
        const cartContainsRegular = items.some((x) => x.payment_type === 0);

        const showError = (message: string) => {
            notify(message, 'red');
            return false;
        };

        if (!currentItem) {
            return showError('Item not found!');
        }

        const { quantityGlobalCurrentLimit, quantityGlobalLimit, quantityUserLimit } = currentItem;

        const isSubscription = itemType === 'subscription';

        const isQuantityGlobalLimitReached =
            quantityGlobalLimit !== null && quantityGlobalCurrentLimit === quantityGlobalLimit;

        const isQuantityUserLimitReached = quantityUserLimit !== null && quantityUserLimit === 0;

        if (isSubscription && cartContainsRegular) {
            return showError("Can't add a subscription to cart with a regular item!");
        }

        if (!isSubscription && cartContainsSubs) {
            return showError("Can't add a regular item to cart with a subscription!");
        }

        if (isSubscription && cartContainsSubs) {
            return showError("Can't add a subscription to cart with another subscription!");
        }

        if (isQuantityGlobalLimitReached) {
            return showError('Item is out of stock!');
        }

        if (isQuantityUserLimitReached) {
            return showError('You have reached the limit for this item!');
        }

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
