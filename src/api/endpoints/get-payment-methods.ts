import { AxiosInstance } from "axios"
import { TPayments } from "@/types/payments"

type ReturnType = TPayments

export const getPaymentMethods = (fetcher: AxiosInstance) =>
   async (subs: number) => {
      const url = `/payments/get?subs=${subs}`
      return (await fetcher.post<ReturnType>(url)).data
   }
