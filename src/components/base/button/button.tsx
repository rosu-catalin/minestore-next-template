import { joinClasses } from '@helpers/join-classes';
import { FC, PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren<{
    onClick?(): void;
    className?: string;
    loading?: boolean;
}> &
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({ onClick, children, className, loading, ...props }) => {
    return (
        <button
            onClick={onClick}
            {...props}
            className={joinClasses(
                'h-[40px] min-w-[100px] rounded bg-[#bd1d1d] px-2 font-bold',
                className,
                loading && 'pointer-events-none cursor-not-allowed opacity-50'
            )}
        >
            {children}
        </button>
    );
};
