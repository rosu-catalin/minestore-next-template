import { useCheckoutStore } from '@/stores/checkout';
import { FC } from 'react';

type SelectTypeVariableProps = {
    options: Array<{
        name: string;
        value: string;
        price: number;
    }>;
    varId: number;
    itemCId: number;
    description: string;
    name: string;
};

export const SelectTypeVariable: FC<SelectTypeVariableProps> = ({
    options,
    varId,
    itemCId,
    description,
    name
}) => {
    const { vars, setVars } = useCheckoutStore();

    const update = (value: string) => {
        const currentIndex = vars.findIndex((x) => x.itemCId === itemCId && x.varId === varId);

        if (currentIndex === -1) {
            setVars([...vars, { itemCId, varId, value }]);
        } else {
            setVars([
                ...vars.slice(0, currentIndex),
                { itemCId, varId, value },
                ...vars.slice(currentIndex + 1)
            ]);
        }
    };

    return (
        <div className="flex-col py-5">
            <span className="text-[20px] font-bold">Option for Variable {name} Dropdown</span>
            <span className="mt-1">{description}</span>
            <select
                className="w-full rounded bg-[#303437] px-4 py-2 font-bold"
                onChange={(e) => update(e.target.value)}
            >
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
