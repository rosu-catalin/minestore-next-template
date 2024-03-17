import { AxiosInstance } from 'axios';

type ReturnType = {
    success?: boolean;
    status?: boolean;
    message: string;
    sum?: number;
    type?: string;
};

export const removeGiftcard = (fetcher: AxiosInstance) => async (userId: string | number) => {
    const url = '/cart/removeGiftcard';
    const body = { userId };
    return (await fetcher.post<ReturnType>(url, body)).data;
};
