import { getEndpoints } from '@/api';
import { ProfileView } from './profile-view';
import { fetcher } from '@/api/server/fetcher';
import { handleUnauthorized } from '@/api/server/handlers';

const { getUser, getProfile } = getEndpoints(fetcher);

export default async function Profile() {
    const user = await getUser().catch(handleUnauthorized);
    const profile = await getProfile(user.username);

    return <ProfileView profile={profile} />;
}
