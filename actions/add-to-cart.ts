"use server";

import { revalidatePath } from "next/cache";
import * as z from "zod";

import prismadb from "@/lib/prismadb";
import { currentUser } from "@/lib/auth";
import { CartItemSchema } from "@/schemas";

//actions
import { createCart, getCart } from "./cart";

// ------------------------------------ PRODUCT QUANTITY MANIPULATION ------------------------------------

interface incrementProductQuantityProps {
  productId: string;
  price: number;
  color: string;
}
export const incrementProductQuantity = async ({
  productId,
  price,
  color,
}: incrementProductQuantityProps) => {
  const cart = (await getCart()) ?? (await createCart());

  const productInCart = cart.items.find((item) => item.productId === productId);

  if (productInCart) {
    await prismadb.cartItem.update({
      where: {
        id: productInCart.id,
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    });
  } else {
    await prismadb.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
        price: price,
        color,
      },
    });
  }

  revalidatePath("/products/[id]");
};

//------------------------------------ GET CART BY USER ID ------------------------------------

const getCartIdByUser = async (userId: string) => {
  const userWithCart = await prismadb.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      cart: {
        select: {
          id: true,
        },
      },
    },
  });
  if (userWithCart && userWithCart.cart) {
    return {
      cartId: userWithCart.cart.id,
    };
  } else {
    return { error: "Error with cart user" };
  }
};

//------------------------------------ ADD TO CART -----------------------------------

export const addToCart = async (values: z.infer<typeof CartItemSchema>) => {
  const validatedFields = CartItemSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Neispravan unos!" };
  }

  const { productId, price, color, quantity } = validatedFields.data;

  const user = await currentUser();
  if (!user?.id) {
    return { error: "Niste prijavljeni" };
  }
  const cartResult = await getCartIdByUser(user.id);

  // Check if there was an error getting the cartId
  if (cartResult.error || !cartResult.cartId) {
    return { error: "Greska u otvaranju carta." };
  }
  //   if (existingProduct) {
  //     return { error: "Produkt vec postoji." };
  //   }

  await prismadb.cartItem.create({
    data: {
      cartId: cartResult.cartId,
      productId,
      quantity,
      color,
      price,
    },
  });
  revalidatePath("/cart");

  // verification token TODO

  return { success: "Dodali ste cart item!" };
};

// ------------------------------------ GET CART ------------------------------------

export async function getUserCart(userId: string) {
  try {
    const cart = await prismadb.cart.findUnique({
      where: {
        id: userId,
      },
    });

    return { cart };
  } catch (error) {
    return { error };
  }
}
