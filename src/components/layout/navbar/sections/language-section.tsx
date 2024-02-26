import { FC, useState } from 'react';
import { CountryFlag } from '@/components/base/county-flag/country-flag';
import { ReactSVG } from 'react-svg';
import { Modal } from '@/components/base/modal/modal';
import { TSettings } from '@/types/settings';
import { useLangStore } from '@/stores/lang';
import { useTranslations } from 'next-intl';

type LanguageSectionProps = {
    settings: TSettings;
};

export const LanguageSection: FC<LanguageSectionProps> = ({ settings }) => {
    const { languages } = settings;

    const [displayLanguage, setDisplayLanguage] = useState(false);

    const { lang, setLang } = useLangStore();

    const t = useTranslations('navbar');

    return (
        <>
            <span className="uppercase text-muted-foreground">{t('language')}</span>
            <div className="relative ml-4">
                <div
                    onClick={() => setDisplayLanguage((x) => !x)}
                    className="cursor-pointer flex-row items-center"
                >
                    <CountryFlag lang={lang} className="mb-[3px]" />
                    <div className="flex-row text-accent-foreground">
                        <span className="ml-1 font-bold uppercase">
                            {languages?.find((x) => x.code === lang)?.name}
                        </span>
                        <ReactSVG src="/icons/expand-more.svg" />
                    </div>
                </div>
                <Modal
                    show={displayLanguage}
                    onClickOutside={() => setDisplayLanguage(false)}
                    className="absolute -ml-4 mt-[19px] w-max bg-muted px-4"
                >
                    {languages.map((lang, index) => (
                        <div
                            onClick={() => {
                                setLang(lang.code);
                                setDisplayLanguage(false);
                            }}
                            className="cursor-pointer flex-row items-center font-bold leading-10 text-accent-foreground"
                            key={index}
                        >
                            <CountryFlag lang={lang.code} />
                            <span className="ml-1">{lang.name}</span>
                        </div>
                    ))}
                </Modal>
            </div>
        </>
    );
};
