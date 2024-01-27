import { AxiosInstance } from "axios"
import { TItem } from "@/types/item"

type ReturnType = TItem

export const getItem = (fetcher: AxiosInstance) =>
   async (id: number) => {
      const url = `/items/get/${id}`
      return (await fetcher.post<ReturnType>(url)).data
   }
