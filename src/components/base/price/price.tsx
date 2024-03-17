import { FC } from 'react';
import { useCurrencyStore } from '@/stores/currency';
import { useSettingsStore } from '@/stores/settings';
import { convertToLocalCurrency } from '@helpers/convert-to-local-currency';
import { cn } from '@/lib/utils';

type PriceProps = {
    value: number;
    isVirtual?: boolean;
    className?: string;
    discount?: number;
    originalPrice?: number;
};

type PriceTagProps = {
    price: number;
    currency: string;
    isVirtual: boolean;
    discount?: number;
    originalPrice?: number;
    className?: string;
};

const PriceTag: FC<PriceTagProps> = ({
    price,
    currency,
    isVirtual,
    discount,
    originalPrice,
    className
}) => {
    const { settings } = useSettingsStore();

    let displayPrice = 'Free';
    let discountedPrice: string | null = null;

    const hasDiscountOrOriginalPrice = discount || originalPrice;
    const effectivePrice = originalPrice || price + (discount || 0);

    if (isVirtual) {
        displayPrice = `${price} ${settings?.virtual_currency}`;
    } else if (price > 0) {
        displayPrice = `${price.toFixed(2)} ${currency}`;
        discountedPrice = hasDiscountOrOriginalPrice
            ? `${effectivePrice.toFixed(2)} ${currency}`
            : null;
    }

    return (
        <>
            {discountedPrice ? (
                <p className={className}>
                    <s className="text-red-400 line-through">{discountedPrice}</s>
                    <span className="text-green-400">{displayPrice}</span>
                </p>
            ) : (
                <p>
                    <span className={cn('text-green-400', className)}>{displayPrice}</span>
                </p>
            )}
        </>
    );
};

export const Price: FC<PriceProps> = ({
    value,
    isVirtual = false,
    className,
    discount,
    originalPrice
}) => {
    const { currency } = useCurrencyStore();
    const localCurrencyName = currency?.name || '';
    const localPrice = convertToLocalCurrency(value);

    return (
        <PriceTag
            originalPrice={originalPrice}
            price={localPrice}
            currency={localCurrencyName}
            isVirtual={isVirtual}
            discount={discount}
            className={className}
        />
    );
};
