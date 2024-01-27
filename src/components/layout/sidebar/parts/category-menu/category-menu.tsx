'use client';

import { FC } from 'react';
import { MenuItem } from './components/menu-item';
import { TCategories } from '@/types/categories';
import { useTranslations } from 'next-intl';

type CategoryMenuProps = {
    categories: TCategories;
};

export const CategoryMenu: FC<CategoryMenuProps> = ({ categories }) => {
    const t = useTranslations('sidebar');

    return (
        <aside className="h-fit rounded-[10px] bg-[#18181d] p-6">
            <ul className="space-y-8">
                <MenuItem name={t('home')} image="/icons/home.svg" url="/" />

                {categories.map((category, index) => (
                    <MenuItem
                        key={index}
                        name={category.name}
                        image={category.img ? `/media/categories/${category.img}` : ''}
                        url={`/categories/${category.url}`}
                        subItems={category.categories}
                    />
                ))}
            </ul>
        </aside>
    );
};
