import { AxiosInstance } from "axios"
import { TSettings } from "@/types/settings"

type ReturnType = TSettings

export const getSettings = (fetcher: AxiosInstance) =>
   async () => {
      const url = "/settings/get"
      return (await fetcher.post<ReturnType>(url)).data
   }
