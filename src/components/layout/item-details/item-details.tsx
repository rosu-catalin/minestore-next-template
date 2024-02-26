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

    useEffect(() => {
        getItem(id, route).then((data) => {
            console.log('data', data);
            setDetails(data);
        });
    }, [id, route]);

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
                className="prose max-h-[600px] w-full overflow-y-auto p-4"
                dangerouslySetInnerHTML={{ __html: details?.description || '' }}
            />

            <div className="flex items-center justify-between border-t border-[#303030] p-4">
                <Price
                    value={details?.price || 0}
                    isVirtual={details?.is_virtual_currency_only}
                    className="font-bold text-[#02a603]"
                />

                <div className="flex gap-2">
                    <CardActionButtons
                        isItemInCart={isItemInCart}
                        item={details as TItem}
                        displayFull={false}
                    />
                </div>
            </div>
        </Modal>
    );
};
