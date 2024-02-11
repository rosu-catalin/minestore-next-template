import { getEndpoints } from '@/api';
import { tokenHelper } from './token';
import { useUserStore } from '@/stores/user';
import { fetcher } from '@/api/client/fetcher';
import { redirect } from 'next/navigation';

export const useAuth = () => {
    const { auth, getUser } = getEndpoints(fetcher);
    const { user, setUser, loading } = useUserStore();

    const signIn = async (username: string) => {
        const token = await auth(username);
        tokenHelper.save(token);
        const user = await getUser();
        setUser(user);
    };

    const signOut = () => {
        tokenHelper.clear();
        setUser(undefined);
        redirect('/');
    };

    return { user, loading, signIn, signOut };
};
