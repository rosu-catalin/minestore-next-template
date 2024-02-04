export type TItem = {
    id: number;
    name: string;
    image?: string;
    discount?: number;
    featured?: number;
    comparison?: {
        comparasion_id: number;
        value: string;
    };
    success?: boolean;
    description?: string;
    price: number;
    virtual_price: number | null;
    is_virtual_currency_only: number;
    in_cart?: boolean;
    is_unavailable?: boolean;
    is_subs: boolean | number;
    original_price?: number;
};
