import { FC } from 'react';
import { useCurrencyStore } from '@/stores/currency';
import { useSettingsStore } from '@/stores/settings';
import { convertToLocalCurrency } from '@helpers/convert-to-local-currency';

type PriceProps = {
    value: number;
    isVirtual?: boolean;
    className?: string;
    discount?: number;
};

type PriceTagProps = {
    price: number;
    currency: string;
    isVirtual: boolean;
    discount?: number;
};

const PriceTag: FC<PriceTagProps> = ({ price, currency, isVirtual, discount }) => {
    const { settings } = useSettingsStore();

    const getDisplayPrice = () => {
        if (isVirtual) {
            return `${price} ${settings?.virtual_currency}`;
        }
        if (price > 0) {
            const displayOriginalPrice = discount
                ? (discount + price).toFixed(2)
                : price.toFixed(2);

            return `${displayOriginalPrice} ${currency}`;
        }
        return 'Free';
    };

    const displayPrice = getDisplayPrice();

    if (discount) {
        return (
            <p className="flex items-center gap-2">
                <span className="text-base text-red-400 line-through">{displayPrice}</span>
                <span className="text-green-400">
                    {price.toFixed(2)} {currency}
                </span>
            </p>
        );
    }

    return <span className="text-green-400">{displayPrice}</span>;
};

export const Price: FC<PriceProps> = ({ value, isVirtual = false, className, discount }) => {
    const { currency } = useCurrencyStore();
    const localCurrencyName = currency?.name || '';
    const localPrice = convertToLocalCurrency(value);

    return (
        <span className={className}>
            <PriceTag
                price={localPrice}
                currency={localCurrencyName}
                isVirtual={isVirtual}
                discount={discount}
            />
        </span>
    );
};
