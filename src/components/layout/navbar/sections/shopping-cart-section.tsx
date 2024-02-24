import { FC } from 'react';
import { ReactSVG } from 'react-svg';
import Link from 'next/link';
import { appSettings } from '@/settings';
import { useAuth } from '@/core/auth/client/use-auth';
import { useCartStore } from '@/stores/cart';
import { Price } from '@/components/base/price/price';
import { useTranslations } from 'next-intl';

export const ShoppingCartSection: FC = () => {
    const { user } = useAuth();
    const { cart } = useCartStore();

    const t = useTranslations('navbar');

    const isCartEmpty = cart?.items === 0;

    if (!user) {
        return (
            <>
                <ReactSVG src="/icons/shopping-cart.svg" />
                <div className="ml-4 flex-col">
                    <span className="text-xs uppercase text-[#cfcfcf]">{t('not-logged')}</span>
                </div>
            </>
        );
    }

    return (
        <>
            <ReactSVG src="/icons/shopping-cart.svg" />
            <div className="ml-4 flex-col">
                <Link
                    href={appSettings.routes.checkout}
                    className="glow-text red-glow cursor-pointer font-bold uppercase"
                >
                    {t('cart')}
                </Link>
                {user ? (
                    <div className="flex text-xs uppercase text-[#cfcfcf]">
                        {isCartEmpty ? (
                            t('empty-cart')
                        ) : (
                            <>
                                {cart?.items} {t('cart-hint')}&nbsp;
                                <Price value={cart?.price || 0} />
                            </>
                        )}
                    </div>
                ) : (
                    <span className="text-xs uppercase text-[#cfcfcf]">{t('not-logged')}</span>
                )}
            </div>
        </>
    );
};
