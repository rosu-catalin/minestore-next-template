import { FC } from 'react';
import { TItem } from '@/types/item';
import { TableValue } from './components/table-value';
import { Card } from '@layout/card/card';

type ComparisonProps = {
    items: TItem[];
    comparasion?: {
        id: number;
        name: string;
        type: 1 | 2;
        sorting: number;
    };
};

export const Comparison: FC<ComparisonProps> = ({ items }) => {
    return (
        <div className="relative mt-8 h-[1000px] w-full overflow-x-scroll">
            <div className="absolute w-full">
                <div className="grid grid-cols-[80px,repeat(100,minmax(180px,180px))] gap-10 p-4">
                    <div className="w-20 flex-shrink-0" />
                    {items.map((item, i) => (
                        <Card isCumulative={false} key={i} item={item} />
                    ))}
                </div>
                <div className="mt-8 flex-col">
                    {[
                        'Chat Name Color',
                        'Support the Server',
                        '/fw Command',
                        'Game Replays (/games) Command',
                        'Private Server'
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="w-fit min-w-[100%] flex-row space-x-10 p-4 even:bg-[#373737]"
                        >
                            <div className="w-20 flex-shrink-0">{item}</div>
                            {items.map((item, j) => (
                                <TableValue item={item} index={i} key={j} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
