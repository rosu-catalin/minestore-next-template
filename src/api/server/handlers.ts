import { AxiosError } from "axios"
import { redirect } from "next/navigation"

export const handleUnauthorized = (error: any) => {
   if (error instanceof AxiosError) {
      if (error.response?.status === 401) {
         redirect("/auth")
      } else {
         throw error
      }
   }
   throw error
}
