"use client";
import { CartItemWithProducts } from "@/actions/cart";
import Image from "next/image";
import React from "react";

// images
import testImage from "@/public/images/primjer patuljka jpeg.jpg";

interface CartEntryProps {
  cartItem: CartItemWithProducts;
}

const CartEntry = ({ cartItem: { product, quantity } }: CartEntryProps) => {
  return (
    <section className="flex flex-row gap-4 justify-start align-middle w-full ">
      <Image
        src={testImage}
        alt={product.name}
        width={200}
        height={200}
        className="rounded-lg"
      />
      <div className="flex gap-1 flex-col align-middle py-2 ">
        <h1>{product.name}</h1>
        <p>Količina: {quantity}</p>
      </div>
    </section>
  );
};

export default CartEntry;
