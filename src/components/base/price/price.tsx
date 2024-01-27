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

    const displayPrice = isVirtual
        ? `${price} ${settings?.virtual_currency}`
        : price > 0
          ? `${price.toFixed(2)} ${currency}`
          : 'Free';

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
