"use client"

import { getEndpoints } from "@/api"
import { fetcher } from "@/api/client/fetcher"
import { TAnnouncement } from "@/types/announcement"
import Link from "next/link"
import { FC, useEffect, useState } from "react"

const { getAnnouncement } = getEndpoints(fetcher)

export const Alert: FC = () => {

   const [details, setDetails] = useState<TAnnouncement>()

   useEffect(() => {
      getAnnouncement().then(setDetails)
   }, [])

   return (
      <div className="bg-[#202022] rounded-lg flex-row h-[100px] overflow-clip">
         <div className="bg-[#2f2f2f] text-[#ff5353] w-8 text-center text-4xl font-bold leading-[100px]">!</div>

         <div className="px-8 flex-row items-center">
            <span className="text-[#bd1d1d] font-bold text-[20px]">{details?.title}</span>

            <span className="font-bold ml-8 text-[#ff7979]" dangerouslySetInnerHTML={{ __html: details?.content || "" }} />

            <Link href={details?.button_url || ""} className="font-bold text-[18px] uppercase bg-[url(/btn.png)] rounded h-12 text-center leading-[48px] w-56">
               {details?.button_name}
            </Link>
         </div>
      </div>
   )
}
