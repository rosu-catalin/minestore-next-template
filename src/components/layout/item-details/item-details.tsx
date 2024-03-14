import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { Modal } from '@/components/base/modal/modal';
import { Price } from '@/components/base/price/price';
import { useCartStore } from '@/stores/cart';
import { TItem } from '@/types/item';
import { CardActionButtons } from '@layout/card/card-actions';
import { FC, useEffect, useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';

const { getItem } = getEndpoints(fetcher);

type DetailsProps = {
    show: boolean;
    id: number;
    onHide(): void;
    available?: boolean;
    route?: 'checkout';
};

export const ItemDetails: FC<DetailsProps> = ({ show, onHide, id, route }) => {
    const { items } = useCartStore();

    const isItemInCart = items.some((x) => x.id === id);

    const [details, setDetails] = useState<TItem>();
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    useEffect(() => {
        getItem(id, route).then((data) => {
            setDetails(data);
        });
    }, [id, route]);

    return (
        <Modal
            show={show}
            onClickOutside={onHide}
            backgroundColor="rgb(0 0 0 / 0.25)"
            className="fixed left-1/2 top-1/2 z-40 m-auto w-[700px] -translate-x-1/2 -translate-y-1/2 rounded bg-card"
        >
            <div className="flex-row items-center rounded bg-accent px-5 py-4 font-bold">
                <p className="text-accent-foreground">{details?.name}</p>
                <button
                    aria-label="Close modal"
                    onClick={onHide}
                    className="ml-auto flex h-6 w-6 items-center justify-center rounded bg-accent-foreground/10 transition-colors duration-200 hover:bg-accent-foreground/20 focus:outline-none focus:ring-2 focus:ring-accent-foreground/50 focus:ring-offset-2 focus:ring-offset-accent-foreground/10"
                >
                    <RiCloseFill />
                </button>
            </div>

            <div
                className="prose max-h-[600px] w-full overflow-y-auto p-4 text-muted-foreground prose-headings:text-accent-foreground"
                dangerouslySetInnerHTML={{ __html: details?.description || '' }}
            />

            <div className="flex items-center justify-between border-t border-accent p-4">
                <Price
                    value={details?.price || 0}
                    isVirtual={details?.is_virtual_currency_only}
                    className="font-bold"
                />

                <div className="flex gap-2">
                    <CardActionButtons
                        isItemInCart={isItemInCart}
                        item={details as TItem}
                        displayFull={false}
                        setAddToCartPressed={setIsAddingToCart}
                        addToCartPressed={isAddingToCart}
                    />
                </div>
            </div>
        </Modal>
    );
};
