import { TCart } from '@/types/cart';
import { Input } from '@/components/base/input/input';
import { Label } from '@layout/label/label';
import { useCartItemPreferences } from '@/app/(pages)/categories/utils/use-cart-item-preferences';
import { DescriptionTooltip } from './item-description-tooltip';

export function InputItemCustomPrice({ item }: { item: TCart['items'][number] }) {
    const { handleSetCustomPrice } = useCartItemPreferences();

    if (!item.is_any_price) return null;

    return (
        <div className="grid gap-2">
            <div className="flex items-center justify-between">
                <Label htmlFor="custom-price">Custom Price</Label>
                <DescriptionTooltip
                    description={
                        'Set a custom price for the item. The price must be higher than the minimum price.'
                    }
                />
            </div>
            <Input
                type="number"
                id="custom-price"
                placeholder={item.price.toString()}
                min={item.min_price}
                onChange={(e) =>
                    handleSetCustomPrice({
                        id: item.id,
                        price: Number(e.target.value)
                    })
                }
            />
        </div>
    );
}
