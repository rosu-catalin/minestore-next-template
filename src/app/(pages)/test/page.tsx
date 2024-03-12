'use client';

import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/use-user';

export default function Success() {
    const { login } = useUser();

    return (
        <div className="flex-col rounded-[10px] bg-card p-6">
            <Button
                onClick={() => {
                    login('testare');
                }}
            >
                Set Cookie
            </Button>
        </div>
    );
}
