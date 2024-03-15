import './globals.css';

import type { Metadata } from 'next';
import { App } from './app';
import { Montserrat } from 'next/font/google';
import { ThemeProvider } from './providers/theme-provider';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
    title: `${process.env.NEXT_PUBLIC_WEBSTORE_NAME}`,
    description: `${process.env.NEXT_PUBLIC_WEBSTORE_DESCRIPTION}`,
    icons: `${process.env.NEXT_PUBLIC_API_URL}/assets/logo.png`,
    applicationName: `${process.env.NEXT_PUBLIC_WEBSTORE_NAME}`,
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_API_URL}`)
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${montserrat.className} bg-background text-foreground/70`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <App>{children}</App>
                </ThemeProvider>
            </body>
        </html>
    );
}
