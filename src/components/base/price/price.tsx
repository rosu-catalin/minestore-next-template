import { FC } from 'react';
import { useCurrencyStore } from '@/stores/currency';
import { useSettingsStore } from '@/stores/settings';
import { convertToLocalCurrency } from '@helpers/convert-to-local-currency';

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
};

const PriceTag: FC<PriceTagProps> = ({ price, currency, isVirtual, discount, originalPrice }) => {
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
                <p className="flex items-center gap-2">
                    <span className="text-base text-red-400 line-through">{discountedPrice}</span>
                    <span className="text-green-400">{displayPrice}</span>
                </p>
            ) : (
                <span className="text-green-400">{displayPrice}</span>
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
        <span className={className}>
            <PriceTag
                originalPrice={originalPrice}
                price={localPrice}
                currency={localCurrencyName}
                isVirtual={isVirtual}
                discount={discount}
            />
        </span>
    );
};
