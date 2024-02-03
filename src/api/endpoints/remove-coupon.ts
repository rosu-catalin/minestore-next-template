import { AxiosInstance } from 'axios';

type ReturnType = {
    success?: boolean;
    status?: boolean;
    message: string;
    sum?: number;
    type?: string;
};

export const removeCoupon = (fetcher: AxiosInstance) => async (userId: string | number) => {
    const url = '/cart/removeCoupon';
    const body = { userId };
    return (await fetcher.post<ReturnType>(url, body)).data;
};
