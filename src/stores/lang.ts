import { langStorage } from "@helpers/lang-storage"
import { create } from "zustand"

type LangStore = {
   lang: string
   setLang(lang: string): void
}

export const useLangStore = create<LangStore>((set) => ({
   lang: langStorage.get() || "en",
   setLang: (lang) => {
      langStorage.save(lang)
      set({ lang })
   }
}))
