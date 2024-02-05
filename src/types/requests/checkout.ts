import { Line } from '../cart';

export type TCheckoutRequest = {
    currency: string;
    paymentMethod: string;
    details: {
        fullname: string;
        email: string;
        address1: string;
        address2?: string;
        city: string;
        country: string;
        region: string;
        zipcode: string;
    };
    ref: string;
    vars: Vars[];
};

type Vars = {
    id: number;
    description: string;
    type: number;
    lines: Line[] | null;
    use: string;
};
