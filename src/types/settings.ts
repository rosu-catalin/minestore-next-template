import { TCurrency } from './currency';

export type TSettings = {
    auth: string | null;
    header: unknown[];
    footer: Array<{
        id?: number;
        name: string;
        url: string;
        type?: string;
        created_at?: string;
        updated_at?: string;
    }>;
    website_name: string;
    server: {
        ip: string;
        port: string;
    };
    isFeaturedDeal: number | boolean;
    featuredDeal_items: Array<{
        name: string;
        price: number;
        discount: number;
        image: null | string;
        id: number;
    }>;
    details: number | boolean;
    content: string;
    goals: Array<{
        name: string;
        current_amount: number;
        goal_amount: number;
    }>;
    top: {
        avatar: string;
        username: string;
    };
    recentDonators: Array<{
        avatar: string;
        username: string;
    }>;
    discord_url: string;
    discord_id: string;
    is_ref: number;
    block_1: string;
    block_2: string;
    block_3: string;
    socials: {
        facebook: string;
        instagram: string;
        discord: string;
        twitter: string;
    };
    is_virtual_currency: number;
    virtual_currency: string;
    system_currency: TCurrency;
    currencies: Array<TCurrency>;
    languages: Array<{
        code: string;
        name: string;
    }>;
    system_language: {
        code: string;
        name: string;
    };
};
