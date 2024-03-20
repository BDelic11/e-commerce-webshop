import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export async function getProducts() {
  try {
    const products = await prismadb.product.findMany();

    revalidatePath("/");
    return { products };
  } catch (error) {
    return { error };
  }
}
