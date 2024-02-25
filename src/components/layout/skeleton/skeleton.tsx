import { joinClasses } from '@helpers/join-classes';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={joinClasses('animate-pulse rounded-md bg-[#202022]', className)}
            {...props}
        />
    );
}

export { Skeleton };
