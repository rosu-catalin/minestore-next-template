'use client';

import { FC } from 'react';
import { MenuItem } from './components/menu-item';
import { TCategories } from '@/types/categories';
import { useTranslations } from 'next-intl';
import { imagePath } from '@helpers/image-path';
import { useSettingsStore } from '@/stores/settings';

type CategoryMenuProps = {
    categories: TCategories;
};

export const CategoryMenu: FC<CategoryMenuProps> = ({ categories }) => {
    const { settings } = useSettingsStore();

    const t = useTranslations('sidebar');

    return (
        <aside className="h-fit rounded-[10px] bg-card p-6">
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
