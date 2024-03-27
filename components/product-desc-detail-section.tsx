import React from "react";

//types
import { Product } from "@/types/product";

//components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface DescriptionAndDetailSectionProps {
  product: Product;
}

const DescriptionAndDetailSection = ({
  product,
}: DescriptionAndDetailSectionProps) => {
  return (
    <section className="flex flex-col px-6 py-6">
      <p className="pb-6">{product.description}</p>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Returns and free delivery</AccordionTrigger>
          <AccordionContent>
            Returnin object.
            {/* TODO INFO ABOUT RETURNS AND DELIVERY */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Reviews</AccordionTrigger>
          <AccordionContent>
            {/* TODO REVIEWS AND REVIEW CARDS */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default DescriptionAndDetailSection;
