import React from "react";

//types

//components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// import { Label } from "@/components/ui/label";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Filter } from "@/data/filters";
import { getProducts, getProductsByFilter } from "@/actions/get-products";
import { Product } from "@/types/product";

// const formSchema = z.object({
//   filters: z.array(z.string()).refine((value) => value.some((item) => item), {
//     message: "You have to select at least one item.",
//   }),
// });
// type Form = z.infer<typeof formSchema>;

interface FilterAccordionsProps {
  filters: Filter[];
  // action: (filters: string[]) => {};
  setProducts: (products: Product[]) => void;
}

const FilterAccordions = ({
  setProducts,
  filters,
}: // action,
FilterAccordionsProps) => {
  const form = useForm({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      filters: [],
    },
  });

  return (
    <section className="flex flex-col">
      {filters.map((filter) => (
        <div key={filter.id}>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                {filter.label}
                {/* TODO INSIDE OF THE FILTER (FILTER NAMES 200-300 EUR ...) SELECTS */}
              </AccordionTrigger>
              <AccordionContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(async (data) => {
                      {
                        console.log(data);
                        console.log(data.filters);
                      }

                      const products = await getProductsByFilter(data.filters);
                      console.log(products);
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
                                      ? field.onChange([
                                          ...field.value,
                                          item.id,
                                        ])
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
                    <Button type="submit">Pretraži</Button>
                  </form>
                </Form>

                {/* TODO INFO ABOUT RETURNS AND DELIVERY */}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </section>
  );
};

export default FilterAccordions;
