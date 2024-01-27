'use client';

import { FC } from 'react';
import { useCartStore } from '@/stores/cart';
import { SelectTypeVariable } from './components/select-type-variable';
import { InputTypeVariable } from './components/input-type-variable';

export const Vars: FC = () => {
    const { items } = useCartStore();

    return (
        <div className="flex-col">
            {items.map((item, index) => (
                <div key={index}>
                    {item.vars.map((variable, index) => (
                        <div key={index}>
                            {variable.type === 0 ? (
                                <SelectTypeVariable
                                    name={variable.use}
                                    description={variable.description}
                                    options={variable.lines}
                                    itemCId={item.cid}
                                    varId={variable.id}
                                />
                            ) : (
                                <InputTypeVariable
                                    description={variable.description}
                                    itemCId={item.cid}
                                    varId={variable.id}
                                />
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};
