"use server";
import prismadb from "@/lib/prismadb";
import { revalidatePath } from "next/cache";

export async function getReview(id: string) {
  try {
    const reviews = await prismadb.review.findMany({
      where: {
        productId: id,
      },
      include: {
        product: true,
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    revalidatePath("/");
    return { reviews };
  } catch (error) {
    return { error };
  }
}
