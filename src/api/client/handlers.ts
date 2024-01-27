import { AxiosError } from 'axios';

export const handleUnauthorized = (error: any) => {
    if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
            history.replaceState({}, '', '/auth');
        } else {
            throw error;
        }
    }
    throw error;
};
