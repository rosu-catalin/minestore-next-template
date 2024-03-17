import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem
} from '@/components/ui/command';

import { Button } from '@/components/ui/button';

import { Input } from '@/components/ui/input';

import { getFormCountries } from '@/constants/countries';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { UserAvatar } from './user-avatar';
import { useSettingsStore } from '@/stores/settings';

export const UserDetailsForm = () => {
    const { settings } = useSettingsStore();
    const formCountries = getFormCountries();

    const { setValue } = useFormContext();

    if (!settings?.details) {
        return null;
    }

    return (
        <div className="grid grid-cols-[400px,1fr] gap-8">
            <div className="m-auto">
                <UserAvatar />
            </div>
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-accent-foreground">Your details</h2>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        name="details.fullname"
                        defaultValue=""
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
                        defaultValue=""
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
                        defaultValue=""
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
                        defaultValue=""
                        name="details.address2"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address 2</FormLabel>
                                <FormControl>
                                    <Input placeholder="Apartment, studio, or floor" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        defaultValue=""
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
                        defaultValue=""
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
                        defaultValue=""
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
                        defaultValue=""
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
                                                            setValue(
                                                                'details.country',
                                                                country.value
                                                            );
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                'mr-2 h-4 w-4',
                                                                country.value === field.value
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
    );
};
