import type { Config } from "tailwindcss"

const config: Config = {
   content: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   plugins: [],
   theme: {
      extend: {
         colors: {
            accent: "#dd2828"
         }
      }
   }
}

export default config
