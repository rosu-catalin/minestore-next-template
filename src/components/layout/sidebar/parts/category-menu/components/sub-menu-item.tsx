import { FC } from "react"
import { joinClasses } from "@helpers/join-classes"
import Link from "next/link"
import { usePathname } from "next/navigation"

type SubMenuItemProps = {
   name: string
   url: string
}

export const SumMenuItem: FC<SubMenuItemProps> = ({ name, url }) => {

   const pathname = usePathname()
   const isActive = pathname === url

   return (
      <Link className="group flex-row h-12 items-center" href={url}>
         <div className={joinClasses("w-1 h-7 rounded-r-lg", isActive ? "bg-accent" : "group-hover:bg-accent bg-white")} />
         <span className={joinClasses("ml-8", isActive ? "text-accent" : "glow-text red-glow")}>{name}</span>
      </Link>
   )
}
