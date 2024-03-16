'use client';

import Image from 'next/image';
import { PaymentMethods } from './payment-methods';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Content() {
    return (
        <div className="mt-8 space-y-6">
            <BannerSection />

            <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <div>
                            <h2 className="text-balance text-xl font-bold text-primary md:text-2xl">
                                Support / Questions
                            </h2>
                            <hr className="mt-2 h-1 w-12 rounded border-0 bg-primary" />
                        </div>
                        <p className="text-pretty">
                            Need any questions answered before checkout? Waited more than 20 minutes
                            but your package hasn&apos;t arrived? Ask the community or staff on our
                            Discord server! We&apos;re here to help you out.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div>
                            <h2 className="text-balance text-xl font-bold text-primary md:text-2xl">
                                Refund Policy
                            </h2>
                            <hr className="mt-2 h-1 w-12 rounded border-0 bg-primary" />
                        </div>
                        <p className="text-pretty">
                            We have a strict no-refund policy. All purchases are final and
                            non-refundable. Please make sure you are purchasing the correct item
                            before checking out.
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap gap-4">
                    <p>
                        It could take up to 15 minutes for your purchase to be processed. If you are
                        still not credited after 15 minutes, please contact our support team on
                        Discord.
                    </p>
                    <Button asChild>
                        <Link href="https://google.com" target="_blank">
                            Discord
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="https://google.com" target="_blank">
                            Terms & Conditions
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href="https://google.com" target="_blank">
                            Contact Us
                        </Link>
                    </Button>
                </div>
            </div>

            <PaymentMethods />
        </div>
    );
}

function BannerSection() {
    return (
        <div className="grid items-start gap-6 md:grid-cols-2">
            <div className="order-2 space-y-2 text-pretty rounded-md border border-accent-foreground/10 bg-accent p-4 text-center md:order-1">
                <h1 className="text-2xl font-bold text-primary md:text-3xl">
                    Welcome to the official MinestoreCMS Webstore!
                </h1>
                <p>
                    To begin shopping, please select a category from the sidebar. Please note that
                    ranks cost a one-time fee and are permanent.
                </p>
            </div>
            <div className="order-1 md:order-2">
                <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/img/index-banner.png`}
                    alt="Banner"
                    width={500}
                    height={300}
                    className="object-contain"
                    onError={(e) => {
                        e.currentTarget.remove();
                    }}
                />
            </div>
        </div>
    );
}
