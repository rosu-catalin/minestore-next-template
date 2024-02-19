import { Alert } from '@layout/alert/alert';
import { Payments } from './components/payments';
import { Cart } from './components/cart';
import { FeaturedDeal } from './components/featured-deal';
import { Details } from './components/details';
import { RedeemCoupon } from './components/redeem-coupon';
import { Purchase } from './components/purchase';
import { getEndpoints } from '@/api';
import { fetcher } from '@/api/server/fetcher';
import { handleUnauthorized } from '@/api/server/handlers';
import { ReferralCode } from './components/referral-code';
import { Vars } from './components/variables/vars';

const { getUser } = getEndpoints(fetcher);

export default async function Checkout() {
    const user = await getUser().catch(handleUnauthorized);
    const { id } = user;

    return (
        <div className="w-full flex-col rounded-[10px] bg-[#18181d] p-4">
            <Alert />
            <Cart />
            <Vars />
            <FeaturedDeal />
            <Details />
            <RedeemCoupon userId={id} />
            <ReferralCode />
            <Payments />
            <Purchase />
        </div>
    );
}
