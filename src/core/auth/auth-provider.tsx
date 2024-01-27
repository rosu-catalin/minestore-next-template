"use client"

import { useUserStore } from "@/stores/user";
import { TUser } from "@/types/user";
import { usePathname, useRouter } from "next/navigation";
import { FC, PropsWithChildren, useEffect, useLayoutEffect, useState } from "react"

type AuthProviderProps = PropsWithChildren<{
   initialUser?: TUser
}>

export const AuthProvider: FC<AuthProviderProps> = ({ children, initialUser }) => {

   const [renderCount, setRenderCount] = useState(0)

   const pathname = usePathname()
   const router = useRouter()

   const { user, setUser } = useUserStore()

   const isAuthorized = !!(initialUser || user)

   useLayoutEffect(() => {
      setUser(initialUser)
   }, [initialUser, setUser])

   useEffect(() => {
      if (isAuthorized && pathname === "/auth") {
         router.push("/")
      }
   }, [])

   useEffect(() => {
      setRenderCount(count => count + 1)

      if (renderCount === 0) {
         return
      }

      if (isAuthorized && pathname === "/auth") {
         router.back()
         router.refresh()
      }

      if (!isAuthorized && pathname.startsWith("/categories/")) {
         router.push("/auth")
      }

   }, [isAuthorized, pathname])

   if (isAuthorized && pathname === "/auth") {
      return <div className="center"><div className="loader"></div></div>
   }

   return children
};
