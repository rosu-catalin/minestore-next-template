/** @type {import("next").NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            hostname: "mc-heads.net",
         },
         {
            hostname: "minotar.net",
         }
      ],
   },
   rewrites: async () => {
      return [
         {
            source: "/",
            destination: "/home",
         }
      ]
   }
}


module.exports = nextConfig
