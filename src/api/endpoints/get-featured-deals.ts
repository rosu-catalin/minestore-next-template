import { AxiosInstance } from 'axios';

export type TFeaturedDeal = Array<{
    id: number;
    name: string;
    active: number;
    is_subs: number;
    price: number;
    discount: number;
    image: string | null;
    virtual_price: number;
    is_virtual_currency_only: number;
    description: string;
    is_unavailable: boolean;
}>;

export const getFeaturedDeals = (fetcher: AxiosInstance) => async () => {
    const url = '/items/getFeaturedDeals';
    return (await fetcher.get<TFeaturedDeal>(url)).data;
};
