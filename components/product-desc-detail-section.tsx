import React from "react";

import star from "@/public/icons/heartIcon.svg";
//types
import { Product } from "@/types/product";

//components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";
import CustomDialog from "./ui/custom-dialog";
import AddReviewForm from "./add-review-form";
import { getReview } from "@/actions/reviews";
import Image from "next/image";

interface DescriptionAndDetailSectionProps {
  product: Product;
}

const DescriptionAndDetailSection = async ({
  product,
}: DescriptionAndDetailSectionProps) => {
  const { reviews } = await getReview(product.id);
  if (!reviews) {
    return <p>Nema komentara</p>;
  }

  return (
    <section className="flex flex-col py-6">
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
          <AccordionTrigger>Komentari</AccordionTrigger>
          <AccordionContent>
            <CustomDialog header="Vaš komentar" trigger="Dodaj komentar">
              <AddReviewForm />
            </CustomDialog>
            {reviews.map((review) => (
              <div className="flex flex-col justify-center align-middle md:p-2 md:my-6 md:rounded-xl bg-hoverButton  ">
                <div className="flex flex-row gap-1 justify-between align-middle">
                  <div className="flex flex-row gap-1 justify-center align-middle">
                    <Image height={20} width={20} alt="star" src={star} />
                    <Image height={20} width={20} alt="star" src={star} />
                    <Image height={20} width={20} alt="star" src={star} />
                    <Image height={20} width={20} alt="star" src={star} />
                    <Image height={20} width={20} alt="star" src={star} />
                  </div>
                  <p>
                    {review.createdAt.getDate()}.{review.createdAt.getMonth()}.
                    {review.createdAt.getFullYear()}
                  </p>
                </div>
                <p className="md:py-4">{review.comment}</p>
                <p className="md:py-4">{review.user.username}</p>
                <p className="md:py-4">{review.rating} / 5 stars</p>
              </div>
            ))}
            {/* TODO REVIEWS AND REVIEW CARDS */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};

export default DescriptionAndDetailSection;
