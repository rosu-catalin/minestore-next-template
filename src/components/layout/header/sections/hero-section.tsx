import { FC, useEffect, useState } from "react"
import { ReactSVG } from "react-svg"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { getEndpoints } from "@/api"
import { TSettings } from "@/types/settings"
import { sweetAlert } from "@helpers/sweet-alert"
import { useTranslations } from "next-intl"

const { discordWidget, getServerOnline } = getEndpoints(axios)

type HeroSectionProps = {
   settings: TSettings
}

export const HeroSection: FC<HeroSectionProps> = ({ settings }) => {

   const t = useTranslations("header")

   const [serverOnline, setServerOnline] = useState(0)
   const [discordOnline, setDiscordOnline] = useState(0)

   const fetchOnline = () => {
      discordWidget(settings.discord_id).then(response => {
         setDiscordOnline(response.presence_count)
      })

      getServerOnline(settings.server.ip, settings.server.port).then(response => {
         setServerOnline(response.players?.online || 0)
      })
   }

   useEffect(() => {
      fetchOnline()

      const timeout = setTimeout(() => {
         fetchOnline()
      }, 20_000)

      return () => {
         clearTimeout(timeout)
      }
   }, [])

   return (
      <div className="w-full flex-row justify-center items-center">

         <div onClick={() => sweetAlert(`${settings.server.ip}:${settings.server.port}`)} className="hidden lg:flex cursor-pointer items-center hover:scale-110 -mt-20 transition duration-300">
            <ReactSVG className="text-[#e43c3c] w-12 h-12" src="/icons/play.svg" />
            <div className="flex-col ml-0.5">
               <span className="text-lg glow-text font-bold">hypixel.net</span>
               <span className="text-sm glow-text">{serverOnline} {t("players-online")}</span>
            </div>
         </div>

         <div className="ghost translate-y-12">
            <Link href="/">
               <Image className="levitate mx-4" src="/logo.png" width={381} height={338} alt="" />
            </Link>
         </div>

         <Link href={settings.discord_url} className="hidden lg:flex items-center hover:scale-110 -mt-20 transition duration-300">
            <div className="flex-col ml-0.5">
               <span className="text-lg glow-text font-bold">Discord Server</span>
               <span className="text-sm glow-text">{discordOnline} {t("members-online")}</span>
            </div>
            <ReactSVG className="text-[#e43c3c] w-12 h-12" src="/icons/discord.svg" />
         </Link>

      </div>
   )
}
