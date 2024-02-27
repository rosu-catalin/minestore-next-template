import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { notify } from '@/core/notifications';
import { useCartStore } from '@/stores/cart';

const { getCart, setProductVariable } = getEndpoints(fetcher);

export type TSetProductVariable = {
    id: number;
    var_id: number;
    var_value: number | string;
};

export const useCartItemPreferences = () => {
    const { setCart } = useCartStore();

    const handleSetProductVariable = async ({ id, var_id, var_value }: TSetProductVariable) => {
        try {
            await setProductVariable({ id, var_id, var_value });
            const cart = await getCart();
            setCart(cart);

            notify('Product variable set!', 'green');
        } catch (error) {
            console.error('Error while setting product variable:', error);
            notify('Error while setting product variable!', 'red');
        }
    };

    return {
        handleSetProductVariable
    };
};
