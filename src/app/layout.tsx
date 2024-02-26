import './globals.css';

import type { Metadata } from 'next';
import { App } from './app';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
    title: 'Mine Store',
    description: ''
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${montserrat.className} bg-background text-foreground/70`}>
                <App>{children}</App>
            </body>
        </html>
    );
}
