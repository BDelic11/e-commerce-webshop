"use server";

import * as z from "zod";

// import prismadb from "@/lib/prismadb";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_USER_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Neispravan unos!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_USER_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Neispravan unos!" };

        default:
          return { error: "Nešto je pošlo po krivu!" };
      }
    }
    // return { success: "Uspješna prijava" };
    throw error;
  }
};
