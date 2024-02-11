import { getEndpoints } from '@/api';
import { fetcher } from '@/api/server/fetcher';
import { ProfileView } from '../profile-view';
import { handleUnauthorized } from '@/api/server/handlers';

const { getProfile, getUser } = getEndpoints(fetcher);

export default async function Page({ params }: { params: { name?: string } }) {
    const { name } = params;

    const profile = await (name
        ? getProfile(name).catch(handleUnauthorized)
        : getUser()
              .then((user) => getProfile(user.username))
              .catch(handleUnauthorized));

    if (!profile) {
        return <div>Error fetching profile</div>;
    }

    return <ProfileView profile={profile} />;
}
