import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { Cart, Prisma } from "@prisma/client";
import { cookies } from "next/headers";

//------------------------------------------------- CART TYPES -----------------------------------------------

export type CartWithProducts = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: true;
      };
    };
  };
}>;

export type CartItemWithProducts = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export type ShoppingCart = CartWithProducts & {
  size: number;
  subtotal: number;
  userId: string;
};

// ----------------------------------- GET CART ------------------------------------------------

export async function getCart(): Promise<ShoppingCart | null> {
  const user = await currentUser();
  {
    console.log(user);
  }
  let cart: CartWithProducts | null = null;

  if (user) {
    cart = await prismadb.cart.findFirst({
      where: {
        userId: user.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  } else {
    const localCartId = cookies().get("localCartId")?.value;
    cart = localCartId
      ? await prismadb.cart.findUnique({
          where: {
            id: localCartId,
          },
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        })
      : null;
  }

  if (!cart) {
    return null;
  }

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    ),
  };
}

// ---------------------------------------------- CREATE CART ----------------------------------------------------

export async function createCart(): Promise<ShoppingCart> {
  const session = await auth();

  let newCart: Cart;

  if (session) {
    newCart = await prismadb.cart.create({
      data: {
        userId: session.user.id,
      },
    });
  } else {
    newCart = await prismadb.cart.create({
      data: {},
    });
  }

  // NOTE: For production add encryption + secure in real app
  cookies().set("localCartId", newCart.id);

  return {
    ...newCart,
    items: [],
    size: 0,
    subtotal: 0,
  };
}
