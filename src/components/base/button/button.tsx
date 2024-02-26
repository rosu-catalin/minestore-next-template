import { joinClasses } from '@helpers/join-classes';
import { Loader2 } from 'lucide-react';
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
            disabled={loading || props.disabled}
            className={joinClasses(
                'h-[40px] min-w-[100px] rounded-md bg-primary px-2 font-bold text-primary-foreground transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50',
                className,
                loading && 'pointer-events-none cursor-not-allowed opacity-50'
            )}
        >
            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : children}
        </button>
    );
};
