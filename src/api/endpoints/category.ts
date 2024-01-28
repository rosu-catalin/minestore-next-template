import { AxiosInstance } from 'axios';
import { TCategoryDetails } from '@/types/category-details';

type ReturnType = TCategoryDetails;

export const getCategoryDetails = (fetcher: AxiosInstance) => async (name: string) => {
    const url = `/categories/get/${name}`;
    console.log(`${url} - getCategoryDetails`);
    return (await fetcher.post<ReturnType>(url)).data;
};
