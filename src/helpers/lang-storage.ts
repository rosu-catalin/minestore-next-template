import { destroyCookie, parseCookies, setCookie } from "nookies"

const key = "lang"

export const langStorage = ({
   get() {
      return parseCookies(undefined)[key]
   },
   save(value: string) {
      setCookie(null, key, value)
   },
   clear() {
      destroyCookie(null, key)
   }
})
