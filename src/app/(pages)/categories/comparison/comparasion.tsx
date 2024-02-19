import { TItem } from '@/types/item';
import { Card } from '@layout/card/card';
import { TCategory, TSubCategory } from '@/types/category-details';
import {
    Table,
    TableCaption,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell
} from '@/components/base/table/table';
import { extractCategoryComparisons, extractSubCategoryComparisons } from '../utils/utils';
import { CheckCircle2, XCircle } from 'lucide-react';

type ComparisonProps = {
    category: TCategory;
    subCategory?: TSubCategory;
    categoryItems: TItem[];
};

export const Comparison = ({ categoryItems, category, subCategory }: ComparisonProps) => {
    const selectedItems = subCategory?.items || categoryItems;

    const subCategoryComparisons = extractSubCategoryComparisons(subCategory) || [];
    const categoryComparisons = extractCategoryComparisons(category, categoryItems) || [];

    const comparisons = subCategory ? subCategoryComparisons : categoryComparisons;

    return (
        <Table className="w-full table-fixed snap-x">
            <TableCaption hidden>A list with all the comparisons</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px]">
                        <span className="sr-only">Features</span>
                    </TableHead>
                    {selectedItems.map((item) => (
                        <TableHead key={item.id} className="w-[300px] snap-center py-4">
                            <Card isCumulative={false} item={item} />
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {comparisons.map((comparison) => (
                    <TableRow key={comparison.id} className="even:bg-[#202022]">
                        <TableCell>{comparison.name}</TableCell>
                        {comparison.comparisons.map((item) => (
                            <TableCell
                                key={item.comparison_id}
                                className="border-l border-r border-[#202022] text-center last:border-r-0"
                            >
                                <ComparisonIcon value={item.value} />
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

function ComparisonIcon({ value }: { value: string }) {
    const isNumber = !isNaN(Number(value));

    if (isNumber) {
        const valueToNumber = Number(value);

        if (valueToNumber === 1) {
            return <CheckCircle2 className="mx-auto text-green-500" />;
        } else if (valueToNumber === 0) {
            return <XCircle className="mx-auto text-red-500" />;
        }
    }

    return value;
}
