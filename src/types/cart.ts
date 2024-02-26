export type Line = {
    name: string;
    value: string;
    price: number;
};

export type TCart = {
    cart: {
        id: number;
        user_id: number;
        items: number;
        price: number;
        clear_price: number;
        tax: number;
        virtual_price: number;
        is_active: number;
        coupon_id: number | null;
        gift_id: number | null;
        gift_sum: number;
        created_at: string;
        updated_at: string;
    };
    items: Array<{
        name: string;
        image: string;
        cid: number;
        price: number;
        virtual_price: number;
        is_virtual_currency_only: number;
        id: number;
        payment_type: number;
        vars: Array<CartItemsVar>;
        count: number;
        quantityGlobalLimit: number | null;
        quantityGlobalCurrentLimit: number | null;
        quantityUserLimit: number | null;
        quantityUserCurrentLimit: number | null;
        is_unavailable: boolean;
        allow_select_server: number;
        allowed_servers: string[];
        is_any_price: number;
        min_price: number;
        is_subs: number;
    }>;
};

type CartItemsVar = {
    id: number;
    name: string;
    identifier: string;
    description: string;
    type: 0 | 1 | 2;
    variables: Array<{
        name: string;
        price: string;
        value: string;
    }>;
    use: string | number;
};
