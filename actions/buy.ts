"use server";

import { revalidatePath } from "next/cache";
import * as z from "zod";

import prismadb from "@/lib/prismadb";
import { ProductBaseSchema } from "@/schemas";
import { getProductByName } from "./get-product";

// ---------------------------------------------- CREATE PURCHASE  ----------------------------------------------------

export const createPurchase = async (
  values: z.infer<typeof ProductBaseSchema>
) => {
  const validatedFields = ProductBaseSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Neispravan unos!" };
  }

  const { name, description, category, price, image, stock } =
    validatedFields.data;

  const existingProduct = await getProductByName(name);

  if (existingProduct) {
    return { error: "Produkt vec postoji." };
  }

  await prismadb.product.create({
    data: {
      name,
      description,
      category,
      price,
      image,
      stock,
    },
  });
  revalidatePath("/admin/products");
  revalidatePath("/products");

  // verification token TODO

  return { success: "Napravili ste produkt!" };
};
