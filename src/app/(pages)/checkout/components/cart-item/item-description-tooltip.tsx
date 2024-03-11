import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function DescriptionTooltip({ description }: { description: string }) {
    if (!description) return null;

    return (
        <TooltipProvider delayDuration={200}>
            <Tooltip>
                <TooltipTrigger>
                    <HelpCircle size={18} aria-hidden={true} />
                </TooltipTrigger>
                <TooltipContent className="max-w-[200px] border-foreground/20 md:max-w-[300px] ">
                    <p
                        dangerouslySetInnerHTML={{ __html: description }}
                        className="prose prose-sm text-pretty"
                    ></p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
