'use client';

import { useCurrencyStore } from '@/stores/currency';
import { useSettingsStore } from '@/stores/settings';
import { TSettings } from '@/types/settings';
import { FC, useEffect } from 'react';
import { useCartStore } from '@/stores/cart';
import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';

const { getCart } = getEndpoints(fetcher);

export const Init: FC<{ settings: TSettings }> = ({ settings }) => {
    const { setCurrency } = useCurrencyStore();
    const { setSettings } = useSettingsStore();
    const { setCart } = useCartStore();

    useEffect(() => {
        setSettings(settings);
    }, [settings, setSettings]);

    useEffect(() => {
        if (localStorage.currency) {
            setCurrency(settings.currencies.find((x) => x.name === localStorage.currency)!);
        } else {
            localStorage.currency = settings.system_currency.name;
            setCurrency(settings.system_currency);
        }

        getCart().then(setCart);
    }, []);

    return <></>;
};
