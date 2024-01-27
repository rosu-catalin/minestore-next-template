import { FC } from 'react';
import { useCurrencyStore } from '@/stores/currency';
import { useSettingsStore } from '@/stores/settings';
import { convertToLocalCurrency } from '@helpers/convert-to-local-currency';

type PriceProps = {
    value: number;
    isVirtual?: boolean;
    className?: string;
};

type PriceTagProps = {
    price: number;
    currency: string;
    isVirtual: boolean;
};

const PriceTag: FC<PriceTagProps> = ({ price, currency, isVirtual }) => {
    const { settings } = useSettingsStore();

    const getDisplayPrice = () => {
        if (isVirtual) {
            return `${price} ${settings?.virtual_currency}`;
        }
        if (price > 0) {
            return `${price.toFixed(2)} ${currency}`;
        }
        return 'Free';
    };

    const displayPrice = getDisplayPrice();

    return <span className="text-green-400">{displayPrice}</span>;
};

export const Price: FC<PriceProps> = ({ value, isVirtual = false, className }) => {
    const { currency } = useCurrencyStore();
    const localCurrencyName = currency?.name || '';
    const localPrice = convertToLocalCurrency(value);

    return (
        <span className={className}>
            <PriceTag price={localPrice} currency={localCurrencyName} isVirtual={isVirtual} />
        </span>
    );
};
