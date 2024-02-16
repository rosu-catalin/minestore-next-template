import { Button } from '@/components/base/button/button';
import { joinClasses } from '@helpers/join-classes';
import { InfoIcon, Trash2, ShoppingCart } from 'lucide-react';

type CardActionsProps = {
    direction?: 'row' | 'col';
    isItemInCart: boolean;
    loading: boolean;
    addItem: () => void;
    removeItem: () => void;
    setShowModal: (value: boolean) => void;
    available?: boolean;
};

export function CardActions({
    direction = 'col',
    isItemInCart,
    loading,
    addItem,
    removeItem,
    setShowModal,
    available
}: CardActionsProps) {
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
                onClick={isItemInCart && available ? removeItem : addItem}
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

function ButtonIcon({ isItemInCart }: { isItemInCart: boolean }) {
    if (isItemInCart) {
        return <Trash2 aria-hidden={true} />;
    }

    return <ShoppingCart aria-hidden={true} />;
}
