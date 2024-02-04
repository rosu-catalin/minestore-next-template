import { AxiosInstance } from 'axios';

type ReturnType = void;

export const addToCart =
    (fetcher: AxiosInstance) => async (id: number, promoted?: number | boolean) => {
        const url = `/cart/add/${id}`;
        return (
            await fetcher.post<ReturnType>(url, {
                promoted: promoted ? 1 : 0
            })
        ).data;
    };
