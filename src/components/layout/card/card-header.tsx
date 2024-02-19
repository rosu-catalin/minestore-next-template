import { Price } from '@/components/base/price/price';
import { TItem } from '@/types/item';
import { imagePath } from '@helpers/image-path';
import { joinClasses } from '@helpers/join-classes';
import Image from 'next/image';

type CardHeaderProps = {
    item: TItem;
    direction?: 'row' | 'col';
};

export function CardHeader({ item, direction }: CardHeaderProps) {
    const price = item.is_virtual_currency_only ? item.virtual_price || 0 : item.price;
    const isPriceVirtual = item.is_virtual_currency_only;

    const cardHeaderClasses = joinClasses(
        'gap-4',
        direction === 'col' && 'grid',
        direction === 'col' && !item.image && 'mt-auto',
        direction === 'row' && 'flex-row items-center'
    );

    return (
        <div className={cardHeaderClasses}>
            <CardHeaderImage item={item} direction={direction} />
            <div className={direction === 'col' ? 'text-center' : ''}>
                <h3 className="text-xl font-bold text-white">{item.name}</h3>
                <Price
                    originalPrice={item.original_price}
                    discount={item.discount}
                    value={price}
                    isVirtual={isPriceVirtual}
                    className="flex items-center justify-center gap-2 text-base font-bold"
                />
            </div>
        </div>
    );
}

function CardHeaderImage({ item, direction }: { item: TItem; direction?: 'row' | 'col' }) {
    const image = imagePath(item.image);
    if (!image) return null;

    const imageSize = direction === 'row' ? 64 : 140;

    return (
        <div>
            <Image
                src={image}
                alt={item.name}
                width={imageSize}
                height={imageSize}
                className={`mx-auto object-contain w-[${imageSize}px] h-[${imageSize}px]`}
            />
        </div>
    );
}
