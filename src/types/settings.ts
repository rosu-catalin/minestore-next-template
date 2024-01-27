import { TCurrency } from "./currency"

export type TSettings = {
   auth: string
   header: unknown[]
   footer: Array<{
      id?: number
      name: string
      url: string
      type?: string
      created_at?: string
      updated_at?: string
   }>
   website_name: string
   server: {
      ip: string
      port: string
   }
   deal: Array<{
      name: string
      price: number
      discount: number
      image: string
      id: number
   }>
   details: number
   content: string
   goal: string
   goal_sum: string
   top: {
      avatar: string
      username: string
   }
   lastPayments1: Array<{
      avatar: string
      username: string
   }>
   lastPayments2: Array<{
      avatar: string
      username: string
   }>
   discord_url: string
   discord_id: string
   is_ref: number
   block_1: string
   block_2: string
   block_3: string
   socials: {
      facebook: string
      instagram: string
      discord: string
      twitter: string
   }
   is_virtual_currency: number
   virtual_currency: string
   system_currency: TCurrency
   currencies: Array<TCurrency>
   languages: Array<{
      code: string
      name: string
   }>
   system_language: {
      code: string
      name: string
   }
}
