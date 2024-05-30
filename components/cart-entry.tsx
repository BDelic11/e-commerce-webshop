"use client";
import { CartItemWithProducts } from "@/actions/cart";
import Image from "next/image";
import React from "react";

// images
import testImage from "@/public/images/primjer patuljka jpeg.jpg";
import cross from "@/public/icons/cross.svg";
import { formatPrice } from "@/lib/format-price";
import CustomTooltip from "./ui/custom-tooltip";
import AlertDeleteFromCart from "./alert-delete-from-cart";
import { Badge } from "./ui/badge";

interface CartEntryProps {
  classname: string;
  cartItem: CartItemWithProducts;
  cartId: string;
  itemId: string;
}

const CartEntry = ({
  classname,
  cartItem: { product, quantity },
  cartId,
  itemId,
}: CartEntryProps) => {
  return (
    <section
      className={`${classname} relative flex flex-row justify-beetween align-middle md:gap-4  md:border-solid-black md:border-2 md:rounded-lg md:h-24 md:my-1`}
    >
      <Image
        src={testImage}
        alt={product.name}
        className="rounded-l-lg object-cover h-full w-40 "
      />
      <div className="flex gap-1 flex-col align-middle py-2 text-wrap ">
        <div className="flex flex-row gap-4">
          <h1 className=" text-base font-semibold">{product.name}</h1>
          <Badge variant="outline">Popust</Badge>
        </div>
        <p className="text-sm">Količina: {quantity}</p>
        <p className="text-sm text-hoverButton">
          {formatPrice(product.salePrice ? product.salePrice : product.price)}{" "}
          po produktu - Sve:{" "}
          {formatPrice(
            (product.salePrice ? product.salePrice : product.price) * quantity
          )}
        </p>
      </div>
      <div>
        <AlertDeleteFromCart
          cartId={cartId}
          itemId={itemId}
          deletingObject={product.name}
        >
          <Image
            src={cross}
            alt="cross icon for delete"
            width={20}
            height={20}
            className="absolute w-min top-1 right-1 rounded-l-lg object-cover my-auto cursor-pointer"
          />
        </AlertDeleteFromCart>
      </div>
    </section>
  );
};

export default CartEntry;
