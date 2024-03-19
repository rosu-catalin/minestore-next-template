'use client';

import { hexToHsl } from '@helpers/hex-to-hsl';
import * as React from 'react';

type ConfigProviderProps = {
    children: React.ReactNode;
    config: unknown;
};

type Config = {
    author: string;
    config: {
        header: string;
        options: {
            id: string;
            name: string;
            default: string;
            description: string;
            type: string;
            values?: string[];
        }[];
    }[];
};

export function ConfigProvider({ children, config }: ConfigProviderProps) {
    const configData = config as Config;

    const extractConfigValue = (id: string) => {
        const config = configData.config;
        const options = config.flatMap((header) => header.options);
        const option = options.find((option) => option.id === id);

        return option?.default;
    };

    const { h, l, s } = hexToHsl(extractConfigValue('main-color') as string);

    return (
        <>
            <style jsx global>{`
                .dark {
                    --primary: ${h} ${s}% ${l}%;
                    --hue: ${h};
                }
                :root {
                    --primary: ${h} ${s}% ${l}%;
                    --hue: ${h};
                }
            `}</style>
            {children}
        </>
    );
}
