import { TSubCategories } from '@/types/categories';
import { joinClasses } from '@helpers/join-classes';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FC, useState, useRef, useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import { SumMenuItem } from './sub-menu-item';

type MenuItemProps = {
    name: string;
    image: string | null;
    url: string;
    subItems?: TSubCategories;
};

export const MenuItem: FC<MenuItemProps> = ({ name, image, url, subItems = [] }) => {
    const pathname = usePathname();
    const isActive = pathname === url;
    const [expand, setExpand] = useState(false);
    const isSubMenu = subItems.length > 0;
    const router = useRouter();

    const menuRef = useRef<HTMLLIElement>(null);

    const handleClick = () => {
        if (isSubMenu === false) {
            router.push(url);
        }

        setExpand((prevExpand) => !prevExpand);
    };

    // Handle clicks outside the menu to close it
    const handleOutsideClick = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setExpand(false);
        }
    };

    useEffect(() => {
        if (expand) {
            document.addEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [expand]);

    return (
        <li className="cursor-pointer overflow-hidden rounded-[10px] bg-accent/90" ref={menuRef}>
            <div
                onClick={handleClick}
                className={joinClasses(
                    "before:content-[' '] h-20 flex-row items-center bg-accent before:absolute before:-m-6 before:h-10 before:w-1.5 before:rounded-r-lg before:bg-accent before:transition-all hover:text-accent-foreground hover:before:bg-accent-foreground",
                    { 'before:bg-primary': isActive }
                )}
            >
                {image && (
                    <div
                        className={joinClasses('flex size-20 border-r border-transparent', {
                            'border-accent-foreground/10': image
                        })}
                    >
                        <Image
                            src={image}
                            className="m-auto h-[64px] w-[64px] object-contain"
                            width={64}
                            height={64}
                            alt=""
                        />
                    </div>
                )}
                <span className={joinClasses('ml-6 font-bold', isActive && 'text-primary')}>
                    {name}
                </span>
                {isSubMenu && (
                    <ReactSVG
                        src="/icons/expand-more.svg"
                        color="white"
                        className={joinClasses(
                            'ml-auto mr-4 h-6 w-6 transition-transform',
                            expand && 'rotate-180 transform'
                        )}
                    />
                )}
            </div>

            {isSubMenu && expand && (
                <div onClick={handleClick}>
                    {subItems.map((category, index) => (
                        <SumMenuItem
                            key={index}
                            name={category.name}
                            url={`/categories/${category.url}`}
                        />
                    ))}
                </div>
            )}
        </li>
    );
};
