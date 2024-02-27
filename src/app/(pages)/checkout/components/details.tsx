'use client';

import { Input } from '@/components/base/input/input';
import { countries } from '@/constants/countries';
import { useCartStore } from '@/stores/cart';
import { useCheckoutStore } from '@/stores/checkout';
import { useSettingsStore } from '@/stores/settings';
import { useUserStore } from '@/stores/user';
import { TCheckoutRequest } from '@/types/requests/checkout';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@layout/select/select';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';

export const Details: FC = () => {
    const { items } = useCartStore();

    const settings = useSettingsStore();
    const t = useTranslations('checkout.details');

    const { user } = useUserStore();
    const { details, setDetails } = useCheckoutStore();

    const set = (values: Partial<TCheckoutRequest['details']>) => {
        setDetails({ ...details, ...values });
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        set({ [e.target.name]: e.target.value });
    };

    if (!settings?.settings?.details) return null;
    if (items.length === 0) return null;

    return (
        <div className="grid md:grid-cols-2">
            <div className="flex-col items-center">
                <span className="font-medium">{t('you-are-buying-as')}</span>

                {user?.avatar && (
                    <Image
                        src={user.avatar}
                        className="mt-4 h-auto w-auto flex-1"
                        width={128}
                        height={308}
                        alt=""
                    />
                )}

                <span className="mt-8 text-[20px] font-bold text-accent-foreground">
                    {user?.username}
                </span>
            </div>

            <div className="">
                <span className="text-[20px] font-bold text-accent-foreground">
                    {t('your-details')}
                </span>
                <div className="mt-4 grid grid-cols-2 gap-x-10 gap-y-4">
                    <label className="flex-col">
                        <span>{t('first-name')} *</span>
                        <Input className="mt-2 w-full" onChange={handleInput} name="fullname" />
                    </label>
                    <label className="flex-col">
                        <span>{t('email')} *</span>
                        <Input className="mt-2 w-full" onChange={handleInput} name="email" />
                    </label>
                    <label className="flex-col">
                        <span>{t('address-line-1')} *</span>
                        <Input className="mt-2 w-full" onChange={handleInput} name="address1" />
                    </label>
                    <label className="flex-col">
                        <span>{t('address-line-2')}</span>
                        <Input className="mt-2 w-full" onChange={handleInput} name="address2" />
                    </label>
                    <label className="col-span-2 flex-col">
                        <span>{t('city')} *</span>
                        <Input className="mt-2 w-full" onChange={handleInput} name="city" />
                    </label>
                    <label className="flex-col">
                        <span>{t('zip-code')} *</span>
                        <Input className="mt-2 w-full" onChange={handleInput} name="zipcode" />
                    </label>
                    <label className="flex-col">
                        <span>{t('state-region')} *</span>
                        <Input className="mt-2 w-full" onChange={handleInput} name="region" />
                    </label>
                    <label className="flex-col">
                        <span>{t('country')} *</span>
                        <Select onValueChange={(value) => set({ country: value })}>
                            <SelectTrigger className="mt-2 w-[180px]">
                                <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                                {countries.map((country, index) => (
                                    <SelectItem key={index} value={country}>
                                        {country}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </label>
                </div>
            </div>
        </div>
    );
};
