'use client';
import { TFeaturedDeal } from '@/api/endpoints/get-featured-deals';
import { FeaturedDeal } from '@layout/feratured-deal/featured-deal';
import { useTranslations } from 'next-intl';

export function FeaturedDeals({ featuredDeals }: { featuredDeals: TFeaturedDeal }) {
    const t = useTranslations('home');

    if (!featuredDeals) return null;

    if (featuredDeals.length === 0) return null;

    console.log('featuredDeals', featuredDeals);

    return (
        <div className="mb-4 flex-col rounded-[10px] bg-card p-6">
            <span className="text-center text-[28px] uppercase text-primary">
                {t('featured-packages')}
            </span>

            <hr className="mt-2 border-[2.5px] border-primary" />

            <div className="mt-6 grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                {featuredDeals.map((item) => (
                    <FeaturedDeal key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}
