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
        vars: Array<{
            id: number;
            description: string;
            type: number;
            lines: null | any;
            use: string;
        }>;
        count: number;
        quantityLimit: number | null;
        is_subs: number;
    }>;
};
