import { joinClasses } from '@helpers/join-classes';
import { FC, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<{
    onClick?(): void;
    className?: string;
}>;

export const Button: FC<ButtonProps> = ({ onClick, children, className }) => {
    return (
        <button
            onClick={onClick}
            className={joinClasses('h-[40px] w-[100px] rounded bg-[#bd1d1d] font-bold', className)}
        >
            {children}
        </button>
    );
};
