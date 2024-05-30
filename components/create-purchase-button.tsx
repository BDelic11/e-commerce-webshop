"use client";
import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { createOrder } from "@/actions/order";
import { OrderItems } from "@/types/order";

interface CreateOrderButtonProps {
  classname?: string;
  userId: string;
  totalPrice: number;
  delivery: number;
  orderItems: OrderItems[];
}

const CreateOrderButton = ({
  classname,
  userId,
  totalPrice,
  delivery,
  orderItems,
}: CreateOrderButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<boolean>(false);

  return (
    <>
      <Button
        className={`${classname} `}
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            const createdOrder = await createOrder({
              userId,
              totalPrice,
              orderItems,
              delivery,
            });
            if (createdOrder.error) {
              toast(createdOrder.error);
            } else {
              setSuccess(true);
              toast("Uspješno kreirana narudžba.");
            }
          });
        }}
      >
        Kupi Odmah
      </Button>
      {isPending && <p>Loading...</p>}
    </>
  );
};

export default CreateOrderButton;
