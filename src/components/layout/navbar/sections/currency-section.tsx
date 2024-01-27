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
            <span className="uppercase text-[#cfcfcf]">{t('currency')}</span>

            <div className="relative ml-4">
                <div
                    onClick={() => setDisplayCurrency((value) => !value)}
                    className="glow-text red-glow cursor-pointer flex-row"
                >
                    <span className="cursor-pointer font-bold uppercase">{currency?.name}</span>
                    <ReactSVG src="/icons/expand-more.svg" />
                </div>
                <Modal
                    show={displayCurrency}
                    onClickOutside={() => setDisplayCurrency(false)}
                    className="absolute -ml-4 mt-[19px] w-max flex-col bg-[#202022] px-4"
                >
                    {currencies.map((currency, index) => (
                        <span
                            onClick={() => setCurrency(currency)}
                            className="glow-text red-glow h-10 cursor-pointer font-bold leading-10"
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
