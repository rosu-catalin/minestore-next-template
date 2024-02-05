import { fetcher } from '@/api/server/fetcher';
import { getEndpoints } from '@/api';
import { joinClasses } from '@helpers/join-classes';
import { Comparison } from '../comparison/comparasion';
import { Card } from '@layout/card/card';
import { Alert } from '@layout/alert/alert';

const { getCategoryDetails } = getEndpoints(fetcher);

type Params = {
    name: string[];
};

export default async function Page({ params }: { params: Params }) {
    const categoryPath = params.name[0];
    const path = params.name.join('/');

    const response = await getCategoryDetails(categoryPath)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.error(err);
            return undefined;
        });

    if (!response) {
        return <></>;
    }

    const { subcategories } = response;
    const subCategory = subcategories?.find((x) => x.category.url === path);

    const categoryComparasions = subCategory?.category.comparison || [];

    return (
        <div className="w-full flex-col rounded-[10px] bg-[#18181d]">
            <div className="w-full flex-col p-4">
                <Alert />

                <h1 className="mt-4 text-center text-[34px] text-[#dd2828]">
                    {subCategory?.category.name}
                </h1>
                <span
                    className="text-center text-[#cfcfcf]"
                    dangerouslySetInnerHTML={{ __html: subCategory?.category.description || '' }}
                ></span>

                <hr className="mt-5 border-[3px] border-[#dd2828]" />
            </div>

            {subCategory?.category.is_comparison ? (
                <Comparison items={subCategory?.items || []} comparasion={categoryComparasions} />
            ) : (
                <div
                    className={joinClasses('mt-8 grid gap-4 p-4', {
                        'grid-cols-[repeat(auto-fill,minmax(min(16rem,100%),1fr))]':
                            !subCategory?.category.is_listing
                    })}
                >
                    {subCategory?.items.map((item, index) => (
                        <Card
                            isCumulative={!!subCategory.category.is_cumulative}
                            className={joinClasses({
                                'w-full': subCategory.category.is_listing
                            })}
                            direction={subCategory.category.is_listing ? 'row' : 'col'}
                            key={index}
                            item={item}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
