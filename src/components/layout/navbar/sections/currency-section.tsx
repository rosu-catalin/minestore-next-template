import { FC, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { TSettings } from '@/types/settings';
import { useCurrencyStore } from '@/stores/currency';
import { useTranslations } from 'next-intl';
import { Modal } from '@/components/base/modal/modal';

type CurrencySectionProps = {
    settings: TSettings;
};

export const CurrencySection: FC<CurrencySectionProps> = ({ settings }) => {
    const { currencies } = settings;

    const [displayCurrency, setDisplayCurrency] = useState(false);
    const { currency, setCurrency } = useCurrencyStore();

    const t = useTranslations('navbar');

    return (
        <>
            <span className="uppercase text-muted-foreground">{t('currency')}</span>

            <div className="relative ml-4">
                <div
                    onClick={() => setDisplayCurrency((value) => !value)}
                    className="cursor-pointer flex-row text-white dark:text-accent-foreground"
                >
                    <span className="cursor-pointer font-bold uppercase">{currency?.name}</span>
                    <ReactSVG src="/icons/expand-more.svg" />
                </div>
                <Modal
                    show={displayCurrency}
                    onClickOutside={() => setDisplayCurrency(false)}
                    className="absolute -ml-4 mt-[19px] w-max flex-col bg-muted px-4"
                >
                    {currencies.map((currency, index) => (
                        <span
                            onClick={() => {
                                setCurrency(currency);
                                setDisplayCurrency(false);
                            }}
                            className="h-10 cursor-pointer font-bold leading-10 text-accent-foreground"
                            key={index}
                        >
                            {currency.name}
                        </span>
                    ))}
                </Modal>
            </div>
        </>
    );
};
