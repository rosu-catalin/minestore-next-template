import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { TCart } from '@/types/cart';
import { Price } from '@/components/base/price/price';
import { ItemDetails } from '@layout/item-details/item-details';
import { useCartStore } from '@/stores/cart';
import { TableRow, TableCell } from '@/components/base/table/table';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@layout/select/select';

const { updateItemCount, removeItemFromCart, getCart } = getEndpoints(fetcher);

type CartItemProps = {
    item: TCart['items'][number];
};

export const CartItem: FC<CartItemProps> = ({ item }) => {
    const { setCart } = useCartStore();
    const [quantity, setQuantity] = useState(item.count);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        updateItemCount(item.id, quantity);
    }, [quantity, item.id]);

    const [show, setShow] = useState(false);

    const isPriceVirtual = item.is_virtual_currency_only === 1;
    const price = isPriceVirtual ? item.virtual_price : item.price;

    const handleRemoveItemFromCart = async (id: number) => {
        try {
            setLoading(true);
            await removeItemFromCart(id);
            const cart = await getCart();
            setCart(cart);
        } catch (e) {
            console.error('Error removing item from cart', e);
        } finally {
            setLoading(false);
        }
    };

    const handleQuantity = async (id: number, quantity: number) => {
        try {
            setLoading(true);
            await updateItemCount(id, quantity);
            setQuantity(quantity);

            const cart = await getCart();
            setCart(cart);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <TableRow>
                <TableCell className="hidden md:block">
                    {item.image ? (
                        <Image
                            src={`http://experimental.minestorecms.com${item.image}`}
                            alt=""
                            width={80}
                            height={80}
                            className="h-20 w-20 object-contain"
                        />
                    ) : (
                        <div className="h-20 w-20"></div>
                    )}
                </TableCell>
                <TableCell className="text-balance text-sm font-bold text-card-foreground md:text-lg">
                    {item.name}
                </TableCell>
                <TableCell>
                    <Price
                        value={price}
                        isVirtual={isPriceVirtual}
                        className="text-sm md:text-lg md:font-bold"
                    />
                </TableCell>
                <TableCell className="text-right">
                    <div className="flex items-center justify-center gap-2">
                        <div>
                            <button
                                aria-label="Decrease quantity"
                                hidden={!!item.is_subs}
                                className="h-6 w-6 rounded text-xl font-bold leading-6 text-primary transition disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={quantity === 1 || loading}
                                onClick={() => {
                                    if (quantity === 1) return;
                                    handleQuantity(item.id, quantity - 1);
                                }}
                            >
                                -
                            </button>
                        </div>
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-accent text-center text-sm font-bold md:h-8 md:w-8 md:text-lg">
                            {quantity}
                        </div>
                        <div>
                            <button
                                aria-label="Increase quantity"
                                hidden={!!item.is_subs}
                                className="h-4 w-4 rounded text-xl font-bold leading-6 text-primary transition disabled:cursor-not-allowed disabled:opacity-50 md:h-8 md:w-8"
                                disabled={loading}
                                onClick={() => handleQuantity(item.id, quantity + 1)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </TableCell>
                <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setShow(true)}
                            className="h-6 w-6 rounded bg-accent text-base font-bold md:h-8 md:w-8 md:text-lg"
                        >
                            i
                        </button>
                        <button
                            onClick={() => handleRemoveItemFromCart(item.id)}
                            className="h-6 w-6 rounded bg-accent text-base font-bold transition disabled:cursor-not-allowed disabled:opacity-50 md:h-8 md:w-8 md:text-lg"
                            disabled={loading}
                        >
                            x
                        </button>
                    </div>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={2}>
                    <SelectItemVariable item={item} />
                </TableCell>
            </TableRow>

            <ItemDetails show={show} onHide={() => setShow(false)} id={item.id} route="checkout" />
        </>
    );
};

function SelectItemVariable({ item }: { item: TCart['items'][number] }) {
    const { vars } = item;

    const dropdownVariables = vars.filter((v) => v.type === 0);
    if (dropdownVariables.length === 0) return null;

    return (
        <div className="flex items-center gap-2">
            {dropdownVariables.map((variable) => (
                <Select key={variable.id}>
                    <SelectTrigger>
                        <SelectValue placeholder={variable.name} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>{variable.name}</SelectLabel>
                            {variable.variables.map((v) => (
                                <SelectItem key={v.value} value={v.value}>
                                    {v.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            ))}
        </div>
    );
}
