import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { TCart } from '@/types/cart';
import { useThrottle } from '@uidotdev/usehooks';
import { Price } from '@/components/base/price/price';
import { ItemDetails } from '@layout/item-details/item-details';
import { useCartStore } from '@/stores/cart';

const { updateItemCount, removeItemFromCart, getCart } = getEndpoints(fetcher);

type CartItemProps = {
    item: TCart['items'][number];
    onChangeQuantity(quantity: number): void;
};

export const CartItem: FC<CartItemProps> = ({ item, onChangeQuantity }) => {
    const [quantity, setQuantity] = useState(item.count);
    const [loading, setLoading] = useState(false);
    const { setCart } = useCartStore();
    const throttleQuantity = useThrottle(quantity, 600);

    useEffect(() => {
        updateItemCount(item.id, throttleQuantity).then(() => {
            onChangeQuantity(throttleQuantity);
        });
    }, [throttleQuantity]);

    const [show, setShow] = useState(false);

    const isPriceVirtual = item.is_virtual_currency_only === 1;
    const price = isPriceVirtual ? item.virtual_price : item.price;

    const handleRemoveItemFromCart = async (id: number) => {
        await removeItemFromCart(id);
        const cart = await getCart();
        setCart(cart);
    };

    const handleQuantity = async (id: number, quantity: number) => {
        try {
            setLoading(true);
            await updateItemCount(id, quantity);
            setQuantity(quantity);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex-row items-center px-4 py-4">
                <div>
                    <Image
                        src={`/media/items/${item.id}.png`}
                        alt=""
                        width={80}
                        height={80}
                        className="h-20 w-20 object-contain"
                    />
                </div>
                <div className="ml-4 w-[160px] text-[20px] font-bold">{item.name}</div>

                <Price
                    value={price}
                    className="w-[120px] text-[20px] font-bold"
                    isVirtual={isPriceVirtual}
                />

                <div className="ml-auto flex-row space-x-2">
                    <div className="mr-10 flex-row items-center space-x-2">
                        <button
                            aria-label="Decrease quantity"
                            hidden={!!item.is_subs}
                            className="h-6 w-6 rounded text-xl font-bold leading-6 text-accent transition disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={quantity === 1 || loading}
                            onClick={() => {
                                if (quantity === 1) {
                                    return;
                                }

                                handleQuantity(item.id, quantity - 1);
                            }}
                        >
                            -
                        </button>
                        <div className="w-10 rounded bg-[#303437] text-center text-lg font-bold">
                            {quantity}
                        </div>
                        <button
                            aria-label="Increase quantity"
                            hidden={!!item.is_subs}
                            className="h-6 w-6 rounded text-xl font-bold leading-6 text-accent transition disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={loading}
                            onClick={() => handleQuantity(item.id, quantity + 1)}
                        >
                            +
                        </button>
                    </div>
                    <button
                        onClick={() => setShow(true)}
                        className="h-8 w-8 rounded bg-gray-400 text-lg font-bold"
                    >
                        i
                    </button>
                    <button
                        onClick={() => handleRemoveItemFromCart(item.id)}
                        className="h-8 w-8 rounded bg-accent text-lg font-bold transition disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={loading}
                    >
                        x
                    </button>
                </div>
            </div>

            <ItemDetails show={show} onHide={() => setShow(false)} id={item.id} />
        </>
    );
};
