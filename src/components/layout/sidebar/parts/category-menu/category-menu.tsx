'use client';

import { FC } from 'react';
import { MenuItem } from './components/menu-item';
import { TCategories } from '@/types/categories';
import { useTranslations } from 'next-intl';
import { imagePath } from '@helpers/image-path';

type CategoryMenuProps = {
    categories: TCategories;
};

export const CategoryMenu: FC<CategoryMenuProps> = ({ categories }) => {
    const t = useTranslations('sidebar');

    return (
        <aside className="bg-card h-fit rounded-[10px] p-6">
            <ul className="space-y-8">
                <MenuItem name={t('home')} image="/icons/home.svg" url="/" />

                {categories.map((category) => (
                    <MenuItem
                        key={category.idx}
                        name={category.name}
                        image={imagePath(category.img)}
                        url={`/categories/${category.url}`}
                        subItems={category.subcategories}
                    />
                ))}
            </ul>
        </aside>
    );
};
