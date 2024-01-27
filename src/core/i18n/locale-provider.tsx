"use client"

import { FC, useEffect, useLayoutEffect, useState } from "react"
import { NextIntlClientProvider } from "next-intl"
import { useLangStore } from "@/stores/lang"
import { getDictionary } from "."

interface LocaleProviderProps {
   children: React.ReactNode
   initialMessages: any
}

export const LocaleProvider: FC<LocaleProviderProps> = ({ children, initialMessages }) => {

   const { lang } = useLangStore()

   const [messages, setMessages] = useState<any>(initialMessages)

   const [isMounted, setIsMounted] = useState(false)

   const load = async () => {
      try {
         const messages = await getDictionary(lang as any)
         setMessages(messages)
      } catch {
         const messages = await getDictionary("en")
         setMessages(messages)
      }
   }

   useLayoutEffect(() => {
      load()
   }, [lang])

   useEffect(() => {
      setIsMounted(true)
   }, [])

   if (!isMounted) return null

   return (
      <NextIntlClientProvider locale={lang} messages={messages}>
         {children}
      </NextIntlClientProvider>
   )
}
