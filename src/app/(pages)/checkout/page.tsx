import { Payments } from './components/payments';
import { Cart } from './components/cart';
import { FeaturedDeal } from './components/featured-deal';
import { Details } from './components/details';
import { RedeemCoupon } from './components/redeem-coupon';
import { Purchase } from './components/purchase';
import { getEndpoints } from '@/api';
import { fetcher } from '@/api/server/fetcher';
import { ReferralCode } from './components/referral-code';

const { getUser } = getEndpoints(fetcher);

export default async function Checkout() {
    const user = await getUser();
    const { id } = user;

    return (
        <div className="bg-card w-full flex-col rounded-[10px] p-4">
            <Cart />
            <FeaturedDeal />
            <Details />
            <RedeemCoupon userId={id} />
            <ReferralCode />
            <Payments />
            <Purchase />
        </div>
    );
}
