'use client';

import { getEndpoints } from '@/api';
import { fetcher } from '@/api/client/fetcher';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem
} from '@/components/ui/command';

import { Input } from '@/components/ui/input';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getFormCountries } from '@/constants/countries';

import { Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserStore } from '@/stores/user';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';

import { TPayments } from '@/types/payments';
import { useCartStore } from '@/stores/cart';
import { paymentFormSchema } from './form-schema';
import { useCurrencyStore } from '@/stores/currency';

const { checkout } = getEndpoints(fetcher);

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

const defaultValues: Partial<PaymentFormValues> = {
    details: {
        fullname: '',
        email: '',
        address1: '',
        address2: '',
        city: '',
        region: '',
        country: '',
        zipcode: ''
    },
    paymentMethod: ''
};

const { getPaymentMethods } = getEndpoints(fetcher);

export function PaymentForm() {
    const { items } = useCartStore();
    const { currency } = useCurrencyStore();
    const [paymentMethods, setPaymentMethods] = useState<TPayments>([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getPaymentMethods()
            .then((response) => {
                console.log(response);
                setPaymentMethods(response);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [items]);

    const formCountries = getFormCountries();

    const form = useForm<PaymentFormValues>({
        resolver: zodResolver(paymentFormSchema),
        defaultValues,
        mode: 'onSubmit'
    });

    async function onSubmit(data: PaymentFormValues) {
        const paymentMethod = paymentMethods.find(
            (method) => method.name === data.paymentMethod
        )?.name;

        if (paymentMethod === 'Stripe') {
            loadScript('https://js.stripe.com/v3/')
                .then(() => {
                    console.log('Stripe loaded');
                })
                .catch((err) => {
                    console.error('Failed to load Stripe', err);
                });
        }
        if (paymentMethod === 'RazorPay') {
            loadScript('https://checkout.razorpay.com/v1/checkout.js')
                .then(() => {
                    console.log('RazorPay loaded');
                })
                .catch((err) => {
                    console.error('Failed to load RazorPay', err);
                });
        }

        try {
            setLoading(true);

            const response = await checkout({
                currency: currency?.name || 'USD',
                paymentMethod: paymentMethod || 'PayPal',
                details: data.details
            });

            if (response.success) {
                console.log(response);
                console.log(response.data);

                if (response.data.type === 'url') {
                    window.location.href = response.data.url;
                } else if (response.data.type === 'html') {
                    const paymentForm = document.createElement('div');
                    paymentForm.innerHTML = response.data.html;
                    document.body.appendChild(paymentForm);

                    paymentForm.querySelector('form')?.submit();
                }
            }
        } catch (error) {
            console.error('Error while processing payment:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-[400px,1fr] gap-8">
                    <div className="m-auto">
                        <UserAvatar />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-accent-foreground">Your details</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="details.fullname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>*Full name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="details.email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>*Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="test@gmail.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="details.address1"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>*Address 1</FormLabel>
                                        <FormControl>
                                            <Input placeholder="1234 Main St" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="details.address2"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address 2</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Apartment, studio, or floor"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="details.city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="New York" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="details.region"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>*Region</FormLabel>
                                        <FormControl>
                                            <Input placeholder="NY" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="details.zipcode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>*Zipcode</FormLabel>
                                        <FormControl>
                                            <Input placeholder="12345" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="details.country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>*Country</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            'w-full justify-between',
                                                            !field.value && 'text-muted-foreground'
                                                        )}
                                                    >
                                                        {field.value
                                                            ? formCountries.find(
                                                                  (language) =>
                                                                      language.value === field.value
                                                              )?.label
                                                            : 'Select country'}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search country..." />
                                                    <CommandEmpty>No country found.</CommandEmpty>
                                                    <CommandGroup className="max-h-[200px] overflow-auto">
                                                        {formCountries.map((country) => (
                                                            <CommandItem
                                                                value={country.label}
                                                                key={country.value}
                                                                onSelect={() => {
                                                                    form.setValue(
                                                                        'details.country',
                                                                        country.value
                                                                    );
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        'mr-2 h-4 w-4',
                                                                        country.value ===
                                                                            field.value
                                                                            ? 'opacity-100'
                                                                            : 'opacity-0'
                                                                    )}
                                                                />
                                                                {country.label}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>

                <div className="my-8 space-y-4 rounded-md border border-border p-4 dark:bg-accent">
                    <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-[20px] font-bold text-accent-foreground">
                                    Payment Method
                                </FormLabel>
                                <RadioGroup
                                    className="grid grid-cols-3 gap-4"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    {paymentMethods.map((method, index) => (
                                        <div key={index}>
                                            <RadioGroupItem
                                                value={method.name}
                                                id={method.name}
                                                className="peer sr-only"
                                            />
                                            <Label
                                                htmlFor={method.name}
                                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
                                                    [&:has([data-state=checked])]:border-primary
                                                    "
                                            >
                                                <Image
                                                    className="h-20 w-28 rounded object-contain"
                                                    src={`/media/payments/${method.name.toLowerCase()}.svg`}
                                                    alt=""
                                                    width={112}
                                                    height={80}
                                                />
                                                {method.name}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="termsAndConditions"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Privacy Statement</FormLabel>
                                    <FormDescription>
                                        All payments are final and non-refundable. Attempting a
                                        chargeback or opening a PayPal dispute will result in
                                        permanent and irreversible banishment from all of our
                                        servers, and other minecraft stores.
                                    </FormDescription>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-wrap items-center justify-between">
                    <FormField
                        control={form.control}
                        name="privacyPolicy"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        I agree to the terms & conditions of this purchase.
                                    </FormLabel>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={loading}
                        className="mt-4 flex items-center justify-center gap-2"
                    >
                        {loading && <Loader2 className="animate-spin" size={24} />}
                        Continue to Payment
                    </Button>
                </div>
            </form>
        </Form>
    );
}

function UserAvatar() {
    const { user } = useUserStore();

    if (!user) return null;

    return (
        <>
            <span className="font-medium">You are buying as</span>
            <Image
                src={user.avatar}
                className="mt-4 h-auto w-auto flex-1"
                width={128}
                height={308}
                alt=""
            />
            <p className="mt-8 text-[20px] font-bold text-accent-foreground">{user.username}</p>
        </>
    );
}

const loadScript = (src: string) => {
    return new Promise<void>((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve();
        };
        document.body.appendChild(script);
    });
};
