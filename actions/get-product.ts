"use server";
import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export async function getProduct(id: string) {
  try {
    const product = await prismadb.product.findUnique({
      where: {
        id: id,
      },
    });

    revalidatePath("/");
    return { product };
  } catch (error) {
    return { error };
  }
}

export const getProductByName = async (name: string) => {
  try {
    const product = await prismadb.product.findFirst({
      where: {
        name,
      },
    });
    return product;
  } catch (error) {
    return null;
  }
};
