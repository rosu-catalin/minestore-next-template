/** @type {import("next").NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'mc-heads.net'
            },
            {
                hostname: 'minotar.net'
            },
            {
                hostname: 'experimental.minestorecms.com'
            },
            {
                hostname: 'i.imgur.com'
            }
        ]
    },
    rewrites: async () => {
        return [
            {
                source: '/',
                destination: '/home'
            }
        ];
    }
};

module.exports = nextConfig;
