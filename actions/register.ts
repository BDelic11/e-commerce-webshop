"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import prismadb from "@/lib/prismadb";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "./user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Neispravan unos!" };
  }

  const { username, email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email se već koristi." };
  }

  await prismadb.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      name,
    },
  });

  // verification token TODO

  return { success: "Registrirali ste se!" };
};
