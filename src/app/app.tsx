import { getEndpoints } from '@/api';
import { fetcher } from '@/api/server/fetcher';
import { AuthProvider } from '@/core/auth/auth-provider';
import { LocaleProvider } from '@/core/i18n/locale-provider';
import { FC, PropsWithChildren, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { getDictionary } from '@/core/i18n';
import { Container } from '@/components/base/container/container';
import { Header } from '@layout/header/header';
import { Init } from '@/core/init/init';
import { Footer } from '@layout/footer/footer';
import { Sidebar } from '@layout/sidebar/sidebar';

const { getUser, getSettings, getCategories } = getEndpoints(fetcher);

export const App: FC<PropsWithChildren> = async ({ children }) => {
    const settings = await getSettings();
    const categories = await getCategories();

    const user = await getUser().catch(() => undefined);

    const messages = await getDictionary('en');

    return (
        <AuthProvider initialUser={user}>
            <LocaleProvider initialMessages={messages}>
                <Suspense>
                    <Header settings={settings} />
                    <Container className="mt-4 flex-col gap-5 lg:flex-row">
                        <Sidebar settings={settings} categories={categories} />
                        <main className="w-full flex-1 overflow-x-scroll">{children}</main>
                    </Container>
                    <Footer settings={settings} />
                    <Init settings={settings} />
                    <Toaster position="top-right" reverseOrder={false} />
                </Suspense>
            </LocaleProvider>
        </AuthProvider>
    );
};
