export type TItem = {
    id: number;
    name: string;
    image?: string;
    discount?: number;
    featured?: number;
    success?: boolean;
    description?: string;
    price: number;
    virtual_price: number | null;
    is_virtual_currency_only: number;
    in_cart?: boolean;
    is_unavailable?: boolean;
    is_subs: boolean | number;
    original_price?: number;
    comparison?: {
        comparison_id: number;
        value: string;
    }[];
};
