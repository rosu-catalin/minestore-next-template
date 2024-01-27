import { getEndpoints } from '@/api';
import { fetcher } from '@/api/server/fetcher';
import { ProfileView } from '../profile-view';
import { handleUnauthorized } from '@/api/server/handlers';

const { getProfile } = getEndpoints(fetcher);

export default async function Page({ params }: { params: { name: string } }) {
    const profile = await getProfile(params.name).catch(handleUnauthorized);

    return <ProfileView profile={profile} />;
}
