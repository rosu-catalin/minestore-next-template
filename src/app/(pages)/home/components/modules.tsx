'use client';
import { GiftCard } from '@layout/gift-card/giftcard';
import { RecentPurchases } from '@layout/recent-purchases/recent-purchases';

export function Modules() {
    return (
        <div className="mt-4 border-t border-t-[#2f2f2f] px-4 py-6 @container">
            <div className="grid gap-6 @4xl:grid-cols-2">
                <GiftCard />
                <div className="flex-col gap-4">
                    <h3 className="text-xl font-bold">
                        Recent Payments
                        <hr className="mt-2 h-1 w-12 rounded border-0 bg-[#2f2f2f]" />
                    </h3>
                    <RecentPurchases limit={7} />
                </div>
            </div>
        </div>
    );
}
