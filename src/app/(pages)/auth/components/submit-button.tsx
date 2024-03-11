'use client';

import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';

export function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending}
            className="mx-auto mt-4 flex w-96 items-center justify-center"
        >
            Continue
        </Button>
    );
}
