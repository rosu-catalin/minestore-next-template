export type TSubCategories = Array<{
   id: number
   top_category_id: number
   name: string
   img: string | null
   url: string | null
   description: string | null
   sorting: number
   gui_item_id: string
   is_cumulative: number
   is_listing: number
   is_comparison: number
   comparison: string | null
   created_at: string
   updated_at: string
}>

export type TCategories = Array<{
   idx: number
   name: string
   url: string | null
   description: string | null
   urls: string[]
   categories: TSubCategories
   img: string | null
}>
