import { joinClasses } from '@helpers/join-classes';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={joinClasses('bg-muted animate-pulse rounded-md', className)} {...props} />
    );
}

export { Skeleton };
