import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    plugins: [require('@tailwindcss/container-queries'), require('@tailwindcss/typography')],
    theme: {
        extend: {
            colors: {
                accent: '#dd2828'
            }
        }
    }
};

export default config;
