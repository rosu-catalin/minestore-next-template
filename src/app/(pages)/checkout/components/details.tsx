'use client';

import { Input } from '@/components/base/input/input';
import { countries } from '@/constants/countries';
import { useAuth } from '@/core/auth/client/use-auth';
import { useCheckoutStore } from '@/stores/checkout';
import { useUserStore } from '@/stores/user';
import { TCheckoutRequest } from '@/types/requests/checkout';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FC } from 'react';

export const Details: FC = () => {
    const t = useTranslations('checkout.details');

    const { user } = useUserStore();
    const { details, setDetails } = useCheckoutStore();
    const { signOut } = useAuth();

    const set = (values: Partial<TCheckoutRequest['details']>) => {
        setDetails({ ...details, ...values });
    };

    return (
        <div className="flex-row">
            <div className="w-1/2 flex-col items-center">
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

                <span className="mt-8 text-[20px] font-bold">{user?.username}</span>
                <span
                    onClick={signOut}
                    className="cursor-pointer text-[#656565] hover:text-[#838383]"
                >
                    {t('not-correct')}
                </span>
            </div>

            <div className="w-1/2">
                <span className="text-[20px] font-bold">{t('your-details')}</span>
                <div className="mt-4 grid grid-cols-2 gap-x-10 gap-y-4">
                    <label className="flex-col">
                        <span>{t('first-name')} *</span>
                        <Input className="mt-2 w-full" onChange={(fullname) => set({ fullname })} />
                    </label>
                    <label className="flex-col">
                        <span>{t('email')} *</span>
                        <Input className="mt-2 w-full" onChange={(email) => set({ email })} />
                    </label>
                    <label className="flex-col">
                        <span>{t('address-line-1')} *</span>
                        <Input className="mt-2 w-full" onChange={(address1) => set({ address1 })} />
                    </label>
                    <label className="flex-col">
                        <span>{t('address-line-2')}</span>
                        <Input className="mt-2 w-full" onChange={(address2) => set({ address2 })} />
                    </label>
                    <label className="col-span-2 flex-col">
                        <span>{t('city')} *</span>
                        <Input className="mt-2 w-full" onChange={(city) => set({ city })} />
                    </label>
                    <label className="flex-col">
                        <span>{t('zip-code')} *</span>
                        <Input className="mt-2 w-full" onChange={(zipcode) => set({ zipcode })} />
                    </label>
                    <label className="flex-col">
                        <span>{t('state-region')} *</span>
                        <Input className="mt-2 w-full" onChange={(region) => set({ region })} />
                    </label>
                    <label className="flex-col">
                        <span>{t('country')} *</span>
                        <select
                            defaultValue={countries[countries.length - 1]}
                            onChange={(e) => set({ country: e.target.value })}
                            className="mt-2 w-full rounded-[10px] bg-[#303437] p-1 shadow-md shadow-black/25 outline-none"
                        >
                            {countries.map((country, index) => (
                                <option key={index} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>
        </div>
    );
};
