/** @type {import('tailwindcss').Config} */

import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
    darkMode: ['class'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            typography: (theme: any) => ({
                DEFAULT: {
                    css: {
                        color: theme('colors.foreground'),
                        a: {
                            color: theme('colors.primary.DEFAULT'),
                            textDecoration: 'none',
                            '&:hover': {
                                color: theme('colors.primary.foreground')
                            }
                        },
                        'h1, h2, h3, h4': {
                            color: theme('colors.foreground')
                        },
                        'ul > li::before': {
                            backgroundColor: theme('colors.primary.DEFAULT')
                        },
                        'ol > li::before': {
                            color: theme('colors.primary.DEFAULT')
                        },
                        'a code': {
                            color: theme('colors.primary.DEFAULT')
                        },
                        code: {
                            color: theme('colors.primary.DEFAULT')
                        },
                        'pre code': {
                            color: theme('colors.primary.DEFAULT')
                        },
                        'blockquote p:first-of-type::before': {
                            content: 'none'
                        },
                        'blockquote p:last-of-type::after': {
                            content: 'none'
                        },
                        img: {
                            borderRadius: theme('borderRadius.lg')
                        },
                        'figure figcaption': {
                            color: theme('colors.foreground')
                        },
                        'figure figcaption a': {
                            color: theme('colors.primary.DEFAULT')
                        },
                        'figure figcaption a:hover': {
                            color: theme('colors.primary.foreground')
                        },
                        table: {
                            color: theme('colors.foreground')
                        },
                        th: {
                            color: theme('colors.foreground')
                        },
                        td: {
                            color: theme('colors.foreground')
                        },
                        'th, td': {
                            borderColor: theme('colors.border')
                        },
                        '--tw-prose-bullets': theme('colors.foreground'),
                        '--tw-prose-counters': theme('colors.foreground')
                    }
                }
            }),
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                }
            },
            borderRadius: {
                lg: `var(--radius)`,
                md: `calc(var(--radius) - 2px)`,
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out'
            }
        }
    },
    plugins: [
        require('@tailwindcss/container-queries'),
        require('@tailwindcss/typography'),
        require('tailwindcss-animate')
    ]
};

export default config;
