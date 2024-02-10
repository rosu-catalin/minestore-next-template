import { fetcher } from '@/api/server/fetcher';
import { getEndpoints } from '@/api';
import { joinClasses } from '@helpers/join-classes';
import { Card } from '@layout/card/card';
import { Alert } from '@layout/alert/alert';
import { TCategory } from '@/types/category-details';
import { Comparison } from '../comparison/comparasion';
import { TItem } from '@/types/item';

const { getCategoryDetails } = getEndpoints(fetcher);

export default async function Page({ params }: { params: { name: string } }) {
    const categoryPath = params.name;

    const response = await getCategoryDetails(categoryPath).catch((error) => {
        console.error('Error fetching category details:', error);
        return undefined;
    });

    if (!response) {
        return <></>;
    }

    const { category, items } = response;

    return (
        <div className="w-full flex-col rounded-[10px] bg-[#18181d]">
            <CategoryHeader category={category} />

            {category.is_comparison ? (
                <Comparison items={items} />
            ) : (
                <ProductListContainer items={items} category={category} />
            )}
        </div>
    );
}

function CategoryHeader({ category }: { category: TCategory }) {
    return (
        <div className="w-full flex-col p-4">
            <Alert />

            <h1 className="mt-4 text-center text-[34px] text-[#dd2828]">{category.name}</h1>
            <span
                className="text-center text-[#cfcfcf]"
                dangerouslySetInnerHTML={{ __html: category.description || '' }}
            />

            <hr className="mt-5 border-[3px] border-[#dd2828]" />
        </div>
    );
}

function ProductListContainer({ items, category }: { items: TItem[]; category: TCategory }) {
    const gridClasses = joinClasses('mt-8 grid gap-4 p-4', {
        'grid-cols-[repeat(auto-fill,minmax(min(16rem,100%),1fr))]': !category?.is_listing
    });

    return (
        <div className={gridClasses}>
            {items.map((item, index) => (
                <Card
                    key={index}
                    item={item}
                    isCumulative={!!category.is_cumulative}
                    direction={category.is_listing ? 'row' : 'col'}
                    className={joinClasses({ 'w-full': category.is_listing })}
                />
            ))}
        </div>
    );
}