"use client";
import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { incrementProductQuantity } from "@/actions/add-to-cart";

interface AddToCartButtonProps {
  productId: string;
  price: number;
  color: string;
}

const AddToCartButton = ({ productId, price, color }: AddToCartButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <>
      <Button
        className=" w-10/12"
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementProductQuantity({ productId, price, color });
            setSuccess(true);
            toast("Added to cart");
          });
        }}
      >
        Dodaj u košaricu
      </Button>
      {isPending && <p>Loading...</p>}
    </>
  );
};

export default AddToCartButton;
