import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { joinClasses } from '@helpers/join-classes';

const badgeVariants = cva(
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                secondary:
                    'border-transparent bg-green-400/20 text-green-400 hover:bg-green-400/30',
                destructive: 'border-transparent bg-red-400/20 text-red-400 hover:bg-red-400/30'
            }
        },
        defaultVariants: {
            variant: 'secondary'
        }
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
    return <div className={joinClasses(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
