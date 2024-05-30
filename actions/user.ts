"use server";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
import { z } from "zod";
import prismadb from "@/lib/prismadb";
import { AddReviewSchema } from "@/schemas";
import { CheckoutInfoSchema } from "@/schemas";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

// -------------------------- GET USER BY USERNAME --------------------------

export const checkUserByUsername = async (username?: string) => {
  const data = await prismadb.user.findUnique({
    select: {
      username: true,
    },
    where: {
      username,
    },
  });

  if (data) {
    return { error: "Ovaj username se već koristi" };
  }

  return { success: true };
};

// -------------------------- GET USER BY ID --------------------------

export const getUserById = async (id: string) => {
  try {
    const user = await prismadb.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return { error };
  }
};

// -------------------------- GET USER BALANCE --------------------------

export const getUserBalance = async (id?: string) => {
  const data = await prismadb.temporaryUserWallet.findUnique({
    where: {
      userId: id,
    },
    select: {
      saldo: true,
    },
  });

  if (!data) {
    return { error: "Nepostoji stanje računa ovoga korisnika." };
  }

  if (data.saldo < 0) {
    return { error: "Pogreška u stanju korisnika." };
  }

  return { data };
};

// -------------------------- CREATE EXTENDED USER INFO (CITY, ADDRESS) --------------------------

export const createExtendedUserInfo = async (
  values: z.infer<typeof CheckoutInfoSchema>,
  id?: string
) => {
  const validatedFields = CheckoutInfoSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Neispravan unos!" };
  }

  const { city, country, postalCode, phoneNumber, address } =
    validatedFields.data;

  const data = await prismadb.user.update({
    where: {
      id: id,
    },
    data: {
      city,
      country,
      postalCode,
      phoneNumber,
      address,
    },
  });

  if (!data) {
    return { error: "Pogreška pri dodavanju informacija." };
  }

  return { success: "Uspješno ste dodali informacije korisniku." };
};

// -------------------------- GET EXTENDED USER --------------------------

export const getExtendedUser = async (id?: string) => {
  const data = await prismadb.user.findFirst({
    where: {
      id,
    },
    select: {
      address: true,
      city: true,
      postalCode: true,
      phoneNumber: true,
      country: true,
    },
  });

  if (!data) {
    return { error: "Nepostoji dodatni podatci o korisnku." };
  }

  return { data };
};
