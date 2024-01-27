export type TItem = {
   id: number
   name: string
   image?: string
   discount?: number
   featured?: number
   comparison?: string | null
   success?: boolean
   description?: string
   price: number
   virtual_price: number | null
   is_virtual_currency_only: number
   in_cart?: boolean
   is_unavailable?: boolean
}
