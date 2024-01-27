"use client"

import { useCurrencyStore } from "@/stores/currency"
import { convertToLocalCurrency } from "@helpers/convert-to-local-currency"
import { FC } from "react"

type PriceProps = {
   value: number
   isVirtual?: boolean
   className?: string
}

export const Price: FC<PriceProps> = ({ value, isVirtual = false, className }) => {

   const { currency } = useCurrencyStore()

   return (
      <span className={className}>
         {isVirtual ? (
            <>{value} QQ</>
         ) : (
            <>{convertToLocalCurrency(value).toFixed(2)} {currency?.name || "###"}</>
         )}
      </span>
   )
}
