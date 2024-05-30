"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//schemas
import { AddReviewSchema, ProductBaseSchema } from "@/schemas";

// components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
// import { DialogClose } from "./ui/dialog";
// import { createProduct } from "@/actions/create-product";
import { createReview } from "@/actions/reviews";

interface AddReviewFormProps {
  productId: string;
}

const AddReviewForm = ({ productId }: AddReviewFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AddReviewSchema>>({
    resolver: zodResolver(AddReviewSchema),
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof AddReviewSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createReview(values, productId).then((data) => {
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
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Komentar</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isPending}
                    {...field}
                    placeholder="Unesite komentar produkta..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ocjena</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    {...field}
                    type="number"
                    placeholder="Unesite ocjenu..."
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

export default AddReviewForm;
