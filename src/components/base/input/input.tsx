"use client"

import { joinClasses } from "@helpers/join-classes";
import { FC } from "react"

type InputProps = {
   className?: string
   placeholder?: string
   onChange?(value: string): void
}

export const Input: FC<InputProps> = ({ className, placeholder, onChange = () => { } }) => {
   return (
      <input
         type="text"
         placeholder={placeholder}
         className={joinClasses("bg-[#303437] rounded-[10px] shadow-black/25 shadow-md px-2 py-1.5 font-bold", className)}
         onChange={e => onChange(e.target.value)}
      />
   );
};
