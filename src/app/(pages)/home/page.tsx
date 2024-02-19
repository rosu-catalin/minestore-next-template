import { getEndpoints } from '@/api';
import { fetcher } from '@/api/server/fetcher';
import { Alert } from '@layout/alert/alert';
import { FeaturedDeals } from './components/featured-deals';
import { Modules } from './components/Modules';
import { Content } from './components/content';

const { getFeaturedDeals } = getEndpoints(fetcher);

export default async function Home() {
    const featuredDeals = await getFeaturedDeals();

    return (
        <>
            <FeaturedDeals featuredDeals={featuredDeals} />

            <div className="flex-col rounded-[10px] bg-[#18181d]">
                <div className="p-4">
                    <Alert />

                    <Content />
                </div>

                <Modules />
            </div>
        </>
    );
}
