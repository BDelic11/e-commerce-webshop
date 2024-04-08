"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import prismadb from "@/lib/prismadb";
import { RegisterSchema } from "@/schemas";

export const updateUser = async (
  values: z.infer<typeof RegisterSchema>,
  currentEmail: string
) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Neispravan unos!" };
  }

  const { name } = validatedFields.data;
  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   const existingUser = await getUserByEmail(email);

  //   if (existingUser) {
  //     return { error: "Email se već koristi." };
  //   }

  await prismadb.user.update({
    where: {
      email: currentEmail,
    },
    data: {
      name,
    },
  });

  // verification token TODO

  return { success: "Registrirali ste se!" };
};
