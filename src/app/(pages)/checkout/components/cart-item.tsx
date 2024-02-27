import Image from 'next/image';
import { FC, useDeferredValue, useEffect, useState } from 'react';
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
import { InfoIcon, Trash2 } from 'lucide-react';
import {
    TSetProductVariable,
    useCartItemPreferences
} from '../../categories/utils/use-cart-item-preferences';
import { Input } from '@/components/base/input/input';
import { Label } from '@layout/label/label';

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
                        <div className="h-20 w-20 rounded-md bg-card-foreground/5"></div>
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
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-accent text-center text-sm font-bold text-accent-foreground md:h-8 md:w-8 md:text-lg">
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
                            aria-label="Show item details"
                            onClick={() => setShow(true)}
                            className="flex h-6 w-6 items-center justify-center rounded bg-card-foreground/10 text-base font-bold text-card-foreground md:h-8 md:w-8 md:text-lg"
                        >
                            <InfoIcon aria-hidden={true} size={20} />
                        </button>
                        <button
                            onClick={() => handleRemoveItemFromCart(item.id)}
                            aria-label="Remove item from cart"
                            className="flex h-6 w-6 items-center justify-center rounded bg-red-500 text-base font-bold text-red-900 transition disabled:cursor-not-allowed disabled:opacity-50 md:h-8 md:w-8 md:text-lg"
                            disabled={loading}
                        >
                            <Trash2 aria-hidden={true} size={20} />
                        </button>
                    </div>
                </TableCell>
            </TableRow>

            <ItemPreferences item={item} />

            <ItemDetails show={show} onHide={() => setShow(false)} id={item.id} route="checkout" />
        </>
    );
};

function ItemPreferences({ item }: { item: TCart['items'][number] }) {
    if (item.vars.length === 0) return null;

    return (
        <TableRow>
            <TableCell colSpan={6}>
                <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                    <SelectItemVariable item={item} />
                    <InputItemVariable item={item} />
                </div>
            </TableCell>
        </TableRow>
    );
}

function InputItemVariable({ item }: { item: TCart['items'][number] }) {
    const { vars } = item;
    const { handleSetProductVariable } = useCartItemPreferences();

    const inputVariables = vars.filter((v) => v.type === 1 || v.type === 2);

    if (inputVariables.length === 0) return null;

    return (
        <>
            {inputVariables.map((variable) => (
                <div key={variable.id} className="space-y-2">
                    <Label htmlFor={variable.identifier}>{variable.name}</Label>
                    <Input type="text" id={variable.identifier} placeholder={variable.name} />
                </div>
            ))}
        </>
    );
}

function SelectItemVariable({ item }: { item: TCart['items'][number] }) {
    const { vars } = item;
    const { handleSetProductVariable } = useCartItemPreferences();

    const dropdownVariables = vars.filter((v) => v.type === 0);
    if (dropdownVariables.length === 0) return null;

    return (
        <>
            {dropdownVariables.map((variable) => (
                <div key={variable.id} className="space-y-2">
                    <Label htmlFor={variable.identifier}>{variable.name}</Label>
                    <Select
                        onValueChange={(value) =>
                            handleSetProductVariable({
                                id: item.id,
                                var_id: variable.id,
                                var_value: value
                            })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={variable.name} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>{variable.name}</SelectLabel>
                                {variable.variables.map((v) => (
                                    <SelectItem key={v.value} value={v.value}>
                                        {v.name}{' '}
                                        <span className="text-muted-foreground">
                                            ({v.price} USD)
                                        </span>
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            ))}
        </>
    );
}
