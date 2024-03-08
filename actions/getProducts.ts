import prismadb from "@/lib/prismadb";

export async function getProducts() {
  try {
    const products = await prismadb.product.findMany();

    return { products };
  } catch (error) {
    return { error };
  }
}
