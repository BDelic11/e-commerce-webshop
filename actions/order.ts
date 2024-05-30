"use server";

import { revalidatePath } from "next/cache";
import * as z from "zod";

import prismadb from "@/lib/prismadb";
import { OrderSchema } from "@/schemas";
import { getUserBalance } from "./user";

// ---------------------------------------------- CREATE ORDER ----------------------------------------------------

export const createOrder = async (values: z.infer<typeof OrderSchema>) => {
  const validatedFields = OrderSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Neispravan unos podataka!" };
  }

  const { orderItems, userId, totalPrice, delivery } = validatedFields.data;

  const userBalance = await getUserBalance(userId);
  console.log(userBalance.data?.saldo);
  if (!userBalance || !userBalance.data) {
    return { error: "Pogreška sa dobavljanjem vašeg računa." };
  }
  // if (userBalance.error) {
  //   return { error: userBalance.error };
  // }

  // if (!userBalance.data?.saldo) {
  //   return { error: "Pogreška sa stanjem vašeg računa." };
  // }

  if (userBalance.data.saldo < totalPrice) {
    return { error: "Nemate dovoljno sredstava na računu." };
  }

  const newSaldo = userBalance.data.saldo - (totalPrice + delivery);

  await prismadb.temporaryUserWallet.update({
    where: {
      userId: userId,
    },
    data: {
      saldo: newSaldo,
    },
  });

  //   const existingOrder = await getOrderById(orderId);

  //   if (existingOrder) {
  //     return { error: "Narudžba već postoji." };
  //   }

  const createdOrder = await prismadb.order.create({
    include: { orderItems: true },
    data: {
      userId,
      totalPrice,
      orderItems: {
        createMany: {
          data: orderItems.map((item) => ({
            quantity: item.quantity,
            productId: item.productId,
            priceAtPurchase: item.priceAtPurchase,
          })),
        },
      },
    },
  });

  if (!createOrder) {
    return { error: "Pogreška tijekom stvaranja narudžbe" };
  }

  // verification token TODO

  revalidatePath("/profile");

  return {
    success: "Narudžba uspješno napravljena!",
    orderId: createdOrder.id,
  };
};
