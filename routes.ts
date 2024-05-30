/* An array of routes that are accessible to the public
    These routes do not require Authentification */
export const publicRoutes = [
  "/",
  "/profile",
  "/products",
  "/cart",
  "/products/:productId",
  "/products(.*)",
  "/cart/:cartId",
  "/cart(.*)",
];

/* An array of routes that are used for authentification
        They should be able to */

export const authRoutes = ["/auth/login", "/auth/register"];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_ADMIN_LOGIN_REDIRECT = "/dashboard";
export const DEFAULT_USER_LOGIN_REDIRECT = "/";
