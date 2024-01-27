import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { Button } from '@/components/base/button/button';
import { Modal } from '@/components/base/modal/modal';
import { Price } from '@/components/base/price/price';
import { notify } from '@/core/notifications';
import { useCartStore } from '@/stores/cart';
import { TItem } from '@/types/item';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';

const { getItem, addToCart, getCart, removeItemFromCart } = getEndpoints(fetcher);

type DetailsProps = {
    id: number;
    show: boolean;
    onHide(): void;
};

export const ItemDetails: FC<DetailsProps> = ({ id, show, onHide }) => {
    const { items, setCart } = useCartStore();

    const isItemInCart = items.some((x) => x.id === id);

    const [details, setDetails] = useState<TItem>();

    useEffect(() => {
        getItem(id).then(setDetails);
    }, [id]);

    const handleCartItem = async () => {
        try {
            if (isItemInCart) {
                await removeItemFromCart(id);
            } else {
                await addToCart(id);
            }

            const response = await getCart();
            setCart(response);

            onHide();

            const notificationMessage = isItemInCart
                ? 'Item was deleted from cart!'
                : 'Item added to cart!';
            const notificationColor = isItemInCart ? 'red' : 'green';

            notify(notificationMessage, notificationColor);
        } catch (error) {
            console.error('Error while adding/removing item:', error);
        }
    };

    const t = useTranslations('item-details');

    return (
        <Modal
            show={show}
            onClickOutside={onHide}
            backgroundColor="rgb(0 0 0 / 0.25)"
            className="fixed left-1/2 top-1/2 z-40 m-auto w-[700px] -translate-x-1/2 -translate-y-1/2 rounded bg-[#222222]"
        >
            <div className="flex-row items-center rounded bg-[#181818] px-5 py-4 font-bold">
                {details?.name}
                <div
                    onClick={onHide}
                    className="ml-auto flex h-6 w-6 items-center justify-center rounded bg-[#303437] hover:bg-[#202022]"
                >
                    <RiCloseFill />
                </div>
            </div>

            <div
                className="w-full p-4"
                dangerouslySetInnerHTML={{ __html: details?.description || '' }}
            />

            <div className="flex-col items-end border-t border-[#303030] p-4">
                <Price
                    value={details?.price || 0}
                    isVirtual={details?.is_virtual_currency_only === 1}
                    className="font-bold text-[#02a603]"
                />
                <Button onClick={handleCartItem} className="mt-2 w-[140px] px-4 py-1">
                    {isItemInCart ? t('remove') : t('add')}
                </Button>
            </div>
        </Modal>
    );
};
