import * as React from 'react';

import { joinClasses } from '@helpers/join-classes';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={joinClasses(
                    'rounded-[10px] bg-accent px-2 py-1.5 font-bold shadow-md shadow-black/10',
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);

Input.displayName = 'Input';

export { Input };
