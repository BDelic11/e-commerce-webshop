import { getCart } from "@/actions/cart";
import CartEntry from "@/components/cart-entry";
import React from "react";

const CartPageComponent = async () => {
  const cart = await getCart();
  if (!cart) {
    return <p>Nemaa carta</p>;
  }

  return (
    <section>
      <h1>Vaša košarica: </h1>
      <div className="flex flex-col">
        {cart?.items.map((cartItem) => (
          <CartEntry cartItem={cartItem} key={cartItem.id} />
        ))}
      </div>
    </section>
  );
};

export default CartPageComponent;
