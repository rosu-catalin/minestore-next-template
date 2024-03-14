import { Cart } from './components/cart';
import { FeaturedDeal } from './components/featured-deal';
import { Details } from './components/details';
import { RedeemCoupon } from './components/redeem-coupon';
import { getEndpoints } from '@/api';
import { fetcher } from '@/api/server/fetcher';
import { ReferralCode } from './components/referral-code';

const { getUser } = getEndpoints(fetcher);

export default async function Checkout() {
    const user = await getUser();
    const { id } = user;

    return (
        <div className="w-full flex-col gap-8 rounded-[10px] bg-card p-4">
            <Cart />
            <FeaturedDeal />
            <div className="flex flex-wrap gap-4">
                <RedeemCoupon userId={id} />
                <ReferralCode />
            </div>
            <Details />
        </div>
    );
}
