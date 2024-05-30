"use server";

import prismadb from "@/lib/prismadb";

import { currentUser } from "@/lib/auth";
import { AddReviewSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// ------------------ GET REVIEW ------------------

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

// ------------------ CREATE REVIEW ------------------

export const createReview = async (
  values: z.infer<typeof AddReviewSchema>,
  productId: string
) => {
  const validatedFields = AddReviewSchema.safeParse(values);
  const user = await currentUser();
  if (!user?.id) {
    return { error: "Niste ulogirani" };
  }

  if (!productId) {
    return { error: "Nema produkta" };
  }

  if (!validatedFields.success) {
    return { error: "Neispravan unos!" };
  }

  const { comment, rating } = validatedFields.data;

  const limitedReviews = await prismadb.review.count({
    where: {
      productId,
      userId: user.id,
    },
  });

  if (limitedReviews > 4) {
    return { error: "Maksimalni broj komentara na proizvod je 4." };
  }

  const newReview = await prismadb.review.create({
    data: {
      comment,
      rating,
      productId,
      userId: user.id,
    },
  });
  revalidatePath("/products/[id]");

  return { success: "Dodali ste komentar!", newReview };
};

// id        String          @id @default(cuid())
//   product    Product   @relation(fields: [productId], references: [id])
//   user       User      @relation(fields: [userId], references: [id])
//   productId  String
//   userId     String
//   comment    String
//   rating     Int
//   createdAt  DateTime  @default(now())
