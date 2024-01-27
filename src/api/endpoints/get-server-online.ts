import { AxiosInstance } from "axios"

type ReturnType = {
   players?: {
      online: number
   }
}

export const getServerOnline = (fetcher: AxiosInstance) =>
   async (ip: string, port: string) => {
      const url = `https://api.minetools.eu/ping/${ip}/${port}`
      return (await fetcher.get<ReturnType>(url)).data
   }
