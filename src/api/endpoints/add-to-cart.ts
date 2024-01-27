import { AxiosInstance } from "axios"

type ReturnType = void

export const addToCart = (fetcher: AxiosInstance) =>
   async (id: number) => {
      const url = `/cart/add/${id}`
      return (await fetcher.post<ReturnType>(url)).data
   }
