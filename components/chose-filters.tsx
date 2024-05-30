"use client";

import React from "react";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

//schemas
import { ProductBaseSchema } from "@/schemas";
import { Product } from "@/types/product";

import { Filter } from "@/data/filters";

// components
import { DialogClose } from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { getProductsByFilter } from "@/actions/get-products";

interface ChooseFiltersProps {
  filters: Filter[];
  setProducts: (products: Product[]) => void;
}

const ChooseFilters = ({
  setProducts,
  filters,
}: // action,
ChooseFiltersProps) => {
  //   const [error, setError] = useState<string | undefined>("");
  //   const [success, setSuccess] = useState<string | undefined>("");
  //   const [isPending, startTransition] = useTransition();
  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      filters: [],
    },
  });
  if (!filters) {
    return <p>Nema filtera</p>;
  }

  return (
    <section className="flex flex-col">
      {filters.map((filter) => (
        <div key={filter.id}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (data) => {
                const products = await getProductsByFilter(data.filters);

                if (products.products) {
                  setProducts(products.products);
                }
              })}
              className="space-y-6 py-2"
            >
              {filter.options.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="filters"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
              <DialogClose>
                <Button type="submit">Pretraži</Button>
              </DialogClose>
            </form>
          </Form>
        </div>
      ))}
    </section>
  );
};

export default ChooseFilters;
