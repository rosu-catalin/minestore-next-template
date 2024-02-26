import { getEndpoints } from '@/api';
import { fetcher } from '@/api/server/fetcher';
import { Alert } from '@layout/alert/alert';
import { FeaturedDeals } from './components/featured-deals';
import { Content } from './components/content';
import { Modules } from './components/modules';

const { getFeaturedDeals } = getEndpoints(fetcher);

export default async function Home() {
    const featuredDeals = await getFeaturedDeals();

    return (
        <>
            <FeaturedDeals featuredDeals={featuredDeals} />

            <div className="bg-card flex-col rounded-[10px]">
                <div className="p-4">
                    <Alert />

                    <Content />
                </div>

                <Modules />
            </div>
        </>
    );
}
