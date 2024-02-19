import { useCartActions } from '@/app/(pages)/categories/utils/use-cart-actions';
import { Button } from '@/components/base/button/button';
import { TItem } from '@/types/item';
import { joinClasses } from '@helpers/join-classes';
import { InfoIcon, Trash2, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

type CardActionsProps = {
    direction?: 'row' | 'col';
    isItemInCart: boolean;
    setShowModal: (value: boolean) => void;
    available?: boolean;
    item: TItem;
};

export function CardActions({
    direction = 'col',
    isItemInCart,
    setShowModal,
    available,
    item
}: CardActionsProps) {
    const [loading, setLoading] = useState(false);
    const { handleAddItem, handleRemoveItem } = useCartActions();

    const handleItem = async () => {
        try {
            setLoading(true);
            if (isItemInCart && available) {
                await handleRemoveItem(item.id);
            } else {
                await handleAddItem(item.id, false);
            }
        } catch (error) {
            console.error('Error while adding/removing item:', error);
        } finally {
            setLoading(false);
        }
    };

    const actionText = isItemInCart ? 'Remove' : 'Add to cart';

    return (
        <div
            className={joinClasses(
                'flex items-center justify-center gap-2',
                direction === 'col' && 'mt-auto'
            )}
        >
            <Button
                aria-label="Info"
                onClick={() => setShowModal(true)}
                className="flex h-[50px] min-w-[50px] items-center justify-center bg-[#38383b]"
            >
                <InfoIcon />
            </Button>
            <Button
                loading={loading}
                onClick={handleItem}
                className={joinClasses(
                    'flex h-[50px] w-full items-center justify-center gap-2',
                    !available && 'pointer-events-none cursor-not-allowed opacity-50',
                    direction === 'row' && 'min-w-[200px]'
                )}
            >
                <ButtonIcon isItemInCart={isItemInCart} />
                {available ? actionText : 'Unavailable'}
            </Button>
        </div>
    );
}

export function ButtonIcon({ isItemInCart }: { isItemInCart: boolean }) {
    if (isItemInCart) {
        return <Trash2 aria-hidden={true} />;
    }

    return <ShoppingCart aria-hidden={true} />;
}
