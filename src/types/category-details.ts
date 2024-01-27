import { TItem } from "./item"

export type TCategoryDetails = {
   category: {
      id: number
      name: string
      url: string
      img: string
      description: string
      sorting: number
      gui_item_id: string | null
      is_cumulative: number
      is_listing: number
      is_comparison: number
      comparison: string
      created_at: string
      updated_at: string
   }
   items: Array<TItem>
   itemsFeatured: []
}
