"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import prismadb from "@/lib/prismadb";
import { RegisterSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export const updateUser = async (
  values: z.infer<typeof RegisterSchema>,
  userId: string
) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!userId) {
    return { error: "Niste prijavljeni" };
  }

  if (!validatedFields.success) {
    return { error: "Neispravan unos!" };
  }

  const { name, surname, username, email, password } = validatedFields.data;
  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   const existingUser = await getUserByEmail(email);

  //   if (existingUser) {
  //     return { error: "Email se već koristi." };
  //   }

  await prismadb.user.update({
    where: {
      id: userId,
    },
    data: {
      name,
      surname,
      username,
      email,
      password,
    },
  });

  // {TODO: SESSION UPDATE AFTER CHANGE OF USER INFO - CAUSE IT GETS IT FROM SESSION, CHANGES IN DATATBASE BUT NOT IN SESSION

  // await prismadb.session.update({
  //   where: {
  //     userId,
  //   },
  //   data: {
  //     user: {
  //       update: {
  //         name,
  //         surname,
  //         username,
  //         email,
  //         password,
  //       },
  //     },
  //   },
  // });

  revalidatePath("/profile");
  // verification token TODO

  return { success: "Registrirali ste se!" };
};
