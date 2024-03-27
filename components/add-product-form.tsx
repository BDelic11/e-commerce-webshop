"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ProductCategories } from "@/types/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
//schemas
import { ProductBaseSchema } from "@/schemas";

// components
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
// import SelectCategories from "./select-categories";
import { createProduct } from "@/actions/create-product";

const AddProductForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProductBaseSchema>>({
    resolver: zodResolver(ProductBaseSchema),
    defaultValues: {
      name: "",
      description: "",
      category: undefined,
      price: undefined,
      onSale: false,
      stock: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof ProductBaseSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createProduct(values).then((data) => {
        setError(data?.error);
        // setSuccess(data?.success);
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4 py-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ime</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    type="text"
                    placeholder="Unesite ime produkta..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opis</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    type="text"
                    placeholder="Unesite opis..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategorija</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Odaberi kategoriju" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={ProductCategories.PATULJAK}>
                      {ProductCategories.PATULJAK}
                    </SelectItem>
                    <SelectItem value={ProductCategories.VIJENAC}>
                      {ProductCategories.VIJENAC}
                    </SelectItem>
                    <SelectItem value={ProductCategories.OSTALO}>
                      {ProductCategories.OSTALO}
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slika</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    type="text"
                    placeholder="Unesite sliku..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cijena</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    type="number"
                    placeholder="Unesite cijenu..."
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zailha</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    type="number"
                    placeholder="Unesite broj na zalihi..."
                    onChange={(event) => field.onChange(+event.target.value)}
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
          Dodaj
        </Button>
      </form>
    </Form>
  );
};

export default AddProductForm;
