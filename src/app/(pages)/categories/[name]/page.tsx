import { fetcher } from '@/api/server/fetcher';
import { getEndpoints } from '@/api';
import { joinClasses } from '@helpers/join-classes';
import { Comparison } from '../comparison/comparasion';
import { Card } from '@layout/card/card';
import { Alert } from '@layout/alert/alert';

const { getCategoryDetails } = getEndpoints(fetcher);

export default async function Page({ params }: any) {
    const categoryPath = params.name;

    const response = await getCategoryDetails(categoryPath).catch(() => undefined);

    if (!response) {
        return <></>;
    }

    const { category, items } = response;

    return (
        <div className="w-full flex-col rounded-[10px] bg-[#18181d]">
            <div className="w-full flex-col p-4">
                <Alert />

                <h1 className="mt-4 text-center text-[34px] text-[#dd2828]">{category.name}</h1>
                <span
                    className="text-center text-[#cfcfcf]"
                    dangerouslySetInnerHTML={{ __html: category.description || '' }}
                ></span>

                <hr className="mt-5 border-[3px] border-[#dd2828]" />
            </div>

            {category.is_comparison ? (
                <Comparison items={items} />
            ) : (
                <div
                    className={joinClasses('mt-8 grid gap-4 p-4', {
                        'grid-cols-[repeat(auto-fill,minmax(min(16rem,100%),1fr))]':
                            !category?.is_listing
                    })}
                >
                    {items.map((item, index) => (
                        <Card
                            isCumulative={!!category.is_cumulative}
                            className={joinClasses({ 'w-full': category.is_listing })}
                            direction={category.is_listing ? 'row' : 'col'}
                            key={index}
                            item={item}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
