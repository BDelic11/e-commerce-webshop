import React from "react";
import Link from "next/link";

//actions
import { getCart } from "@/actions/cart";

//components
import CartEntry from "@/components/cart-entry";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format-price";

const CartPageComponent = async () => {
  const delivery = 100;
  const cart = await getCart();
  if (!cart) {
    return <p>Nema košarice.</p>;
  }

  return (
    <main className="flex flex-col justify-center align-baseline gap-2 md:gap-32 md:py-20 md:flex-row md:w-full md:px-32">
      <div className="flex flex-col md:w-2/3">
        <h1 className="md:font-semibold md:text-2xl md:mb-5">
          Vaša košarica:{" "}
        </h1>
        <div className="flex flex-col ">
          {cart.items.length === 0 ? <p>Vaša košarica je prazna.</p> : <></>}
          {cart?.items.map((cartItem) => (
            <CartEntry
              classname="md:w-full"
              cartItem={cartItem}
              key={cartItem.id}
              cartId={cart.id}
              itemId={cartItem.id}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col md:gap-2 md:w-1/2 ">
        <h1 className="md:font-semibold md:text-2xl md:mb-5 ">Checkout: </h1>
        <div className="flex flex-row gap-6 md:gap-20 md:justify-start ">
          <p>Produkti:</p>
          <p className=" ">{formatPrice(cart.subtotal)}</p>
        </div>
        <div className="flex flex-row gap-6 md:gap-20 md:justify-start ">
          <p>Dostava:</p>
          {cart.items.length === 0 ? <p>-</p> : <p> {formatPrice(delivery)}</p>}
        </div>

        <hr className="md:w-1/2"></hr>
        <div className="flex flex-row gap-6 md:gap-20 md:justify-start font-semibold">
          <p>Ukupno:</p>
          {cart.items.length === 0 ? (
            <p>-</p>
          ) : (
            <p> {formatPrice(cart.subtotal + delivery)}</p>
          )}
        </div>
        {/* <p>{cart.size}</p>
          <p>{cart.status}</p> */}
        {cart.items.length === 0 ? (
          <Button variant="default" disabled className=" md:w-1/2 md:my-10">
            Go to checkout
          </Button>
        ) : (
          <Link href={`cart/${cart?.id}`}>
            <Button variant="default" className=" md:w-1/2 md:my-10">
              Go to checkout
            </Button>
          </Link>
        )}
      </div>
    </main>
  );
};

export default CartPageComponent;
