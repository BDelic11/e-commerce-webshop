"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//schemas
import { CheckoutInfoSchema } from "@/schemas";

// components
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
// import SelectCategories from "./select-categories";
// import { DialogClose } from "./ui/dialog";
import { createExtendedUserInfo } from "@/actions/user";
import { Textarea } from "./ui/textarea";

interface CheckoutAddressFormProps {
  userId: string;
  userCity?: string;
  userAddress?: string;
  userCountry?: string;
  userPostalCode?: string;
}

const CheckoutAddressForm = ({
  userId,
  userCity,
  userAddress,
  userCountry,
  userPostalCode,
  userPhoneNumber,
}: CheckoutAddressFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CheckoutInfoSchema>>({
    resolver: zodResolver(CheckoutInfoSchema),
    defaultValues: {
      city: userCity,
      address: userAddress,
      country: userCountry,
      postalCode: userPostalCode,
      phoneNumber: userPhoneNumber,
    },
  });

  const onSubmit = (values: z.infer<typeof CheckoutInfoSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createExtendedUserInfo(values, userId).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 py-6">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grad</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Unesite ime grada..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresa</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Unesite adresu..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Poštanski kod</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Unesite poštanski kod..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Država</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Unesite ime države..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Broj mobitela</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Unesite broj mobitela..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          disabled={isPending}
          variant="default"
          size="lg"
          type="submit"
          className=" mt-4"
        >
          Spremi
        </Button>
      </form>
    </Form>
  );
};

export default CheckoutAddressForm;
