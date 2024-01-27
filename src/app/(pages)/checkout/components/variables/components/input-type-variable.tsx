import { FC } from 'react';
import { Input } from '@/components/base/input/input';
import { useCheckoutStore } from '@/stores/checkout';

type InputTypeVariableProps = {
    varId: number;
    itemCId: number;
    description: string;
};

export const InputTypeVariable: FC<InputTypeVariableProps> = ({ itemCId, varId, description }) => {
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
            <span className="text-[20px] font-bold">Option for Variable test Input</span>
            <span className="mt-1">{description}</span>
            <Input className="mt-2 w-full" placeholder="Enter text..." onChange={update} />
        </div>
    );
};
