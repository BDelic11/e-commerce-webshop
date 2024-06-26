"use server";
import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export async function deleteProduct(id: string) {
  try {
    const product = await prismadb.product.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/products");
    revalidatePath("/admin/products");
    return { success: "Obrisali ste produkt" };
  } catch (error) {
    return { error };
  }
}
