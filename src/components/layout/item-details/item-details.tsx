import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { useCartActions } from '@/app/(pages)/categories/utils/use-cart-actions';
import { Button } from '@/components/base/button/button';
import { Modal } from '@/components/base/modal/modal';
import { Price } from '@/components/base/price/price';
import { useCartStore } from '@/stores/cart';
import { TItem } from '@/types/item';
import { joinClasses } from '@helpers/join-classes';
import { ButtonIcon } from '@layout/card/card-actions';
import { FC, useEffect, useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';

const { getItem } = getEndpoints(fetcher);

type DetailsProps = {
    show: boolean;
    id: number;
    onHide(): void;
    available?: boolean;
};

export const ItemDetails: FC<DetailsProps> = ({ show, onHide, id, available }) => {
    const { items } = useCartStore();
    const { handleAddItem, handleRemoveItem } = useCartActions();

    const isItemInCart = items.some((x) => x.id === id);

    const [details, setDetails] = useState<TItem>();

    const [loading, setLoading] = useState(false);

    const actionText = isItemInCart ? 'Remove' : 'Add to cart';

    useEffect(() => {
        getItem(id).then((data) => {
            console.log('ItemDetails:', data);
            setDetails(data);
        });
    }, [id]);

    const handleCartItem = async () => {
        setLoading(true);
        try {
            if (isItemInCart) {
                await handleRemoveItem(id);
            } else {
                await handleAddItem(id, false);
            }
        } catch (error) {
            console.error('Error while adding/removing item:', error);
        } finally {
            onHide();
            setLoading(false);
        }
    };

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

            <div className="flex items-center justify-between border-t border-[#303030] p-4">
                <Price
                    value={details?.price || 0}
                    isVirtual={details?.is_virtual_currency_only}
                    className="font-bold text-[#02a603]"
                />
                <Button
                    loading={loading}
                    onClick={handleCartItem}
                    className={joinClasses(
                        'flex h-[50px] min-w-[150px] items-center justify-center gap-2',
                        !available && 'pointer-events-none cursor-not-allowed opacity-50'
                    )}
                >
                    <ButtonIcon isItemInCart={isItemInCart} />
                    {available ? actionText : 'Unavailable'}
                </Button>
            </div>
        </Modal>
    );
};
