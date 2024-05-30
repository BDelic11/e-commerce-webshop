"use server";

import { revalidatePath } from "next/cache";
import * as z from "zod";

import prismadb from "@/lib/prismadb";
import { ProductBaseSchema } from "@/schemas";

export const updateProduct = async (
  productId: string,
  values: z.infer<typeof ProductBaseSchema>
) => {
  const validatedFields = ProductBaseSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Neispravan unos!" };
  }

  const { name, description, category, price, image, stock } =
    validatedFields.data;

  await prismadb.product.update({
    where: { id: productId },
    data: {
      name,
      description,
      price,
      image,
      stock,
    },
  });

  // Revalidate paths if using ISR in Next.js to ensure the cache is updated with the new product data
  revalidatePath(`/admin/products`);
  revalidatePath(`/products`);
  revalidatePath(`/products/${productId}`);

  return { success: "Produkt je ažuriran!" }; // Product updated
};
