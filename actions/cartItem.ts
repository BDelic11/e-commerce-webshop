"use server";
import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";
// ---------------------------------------------- DELETE ITEM FROM CART ----------------------------------------------------

export const deleteCartItem = async (cartID: string, itemID: string) => {
  await prismadb.cartItem.deleteMany({
    where: {
      cartId: cartID,
      id: itemID,
    },
  });

  if (!cartID) {
    return { error: "Dogodila se greška u ID košarice." };
  }

  if (!itemID) {
    return { error: "Dogodila se greška u ID produkta." };
  }

  revalidatePath("/products");
  return { success: "Uspješno ste obrisali produkt." };
};
