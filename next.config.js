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
                hostname: '46.146.229.143'
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
