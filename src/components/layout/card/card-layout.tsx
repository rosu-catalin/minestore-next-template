import { joinClasses } from '@helpers/join-classes';

type CardLayoutProps = {
    children: React.ReactNode;
    direction?: 'row' | 'col';
    className?: string;
};

export function CardLayout({ children, direction, className }: CardLayoutProps) {
    const classes = joinClasses(
        'rounded-md border border-[#2d2d30] bg-[#202022] p-4',
        direction === 'col' && 'flex flex-col gap-4 min-h-[200px] h-full',
        direction === 'row' && 'flex-row gap-4 justify-between',
        className
    );

    return <div className={classes}>{children}</div>;
}
