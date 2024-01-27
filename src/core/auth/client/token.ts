import { destroyCookie, parseCookies, setCookie } from "nookies"

const key = "token"

export const tokenHelper = ({
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
