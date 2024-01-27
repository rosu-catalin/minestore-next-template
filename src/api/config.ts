import { CreateAxiosDefaults } from "axios"

export const config: CreateAxiosDefaults = {
   baseURL: process.env.NEXT_PUBLIC_API_URL,
   headers: {
      "Cache-Control": "no-cache",
      "Pragma": "no-cache",
      "Expires": "0",
   },
}
