import { joinClasses } from '@helpers/join-classes';
import { FC, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<{
    onClick?(): void;
    className?: string;
}> &
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ onClick, children, className, ...props }) => {
    return (
        <button
            onClick={onClick}
            {...props}
            className={joinClasses('h-[40px] w-[100px] rounded bg-[#bd1d1d] font-bold', className)}
        >
            {children}
        </button>
    );
};
