"use server";
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

export async function getProductsByFilter(filters: []) {
  try {
    const products = await prismadb.product.findMany({
      where: {
        category: {
          in: filters,
        },
      },
    });

    revalidatePath("/products");
    return { products };
  } catch (error) {
    return { error };
  }
}

// export async function getProductsByCategory(sort: string) {
//   try {
//     const products = await prismadb.product.findMany({
//       where: {
//         category: {
//           in: filters,
//         },
//       },
//     });

//     revalidatePath("/products");
//     return { products };
//   } catch (error) {
//     return { error };
//   }
// }
