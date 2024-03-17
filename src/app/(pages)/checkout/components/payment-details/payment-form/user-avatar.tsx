import { useUserStore } from '@/stores/user';
import Image from 'next/image';

export function UserAvatar() {
    const { user } = useUserStore();

    if (!user) return null;

    return (
        <>
            <span className="font-medium">You are buying as</span>
            <Image
                src={user.avatar}
                className="mt-4 h-auto w-auto flex-1"
                width={128}
                height={308}
                alt=""
            />
            <p className="mt-8 text-[20px] font-bold text-accent-foreground">{user.username}</p>
        </>
    );
}
