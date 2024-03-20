import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email je obavezan.",
  }),
  password: z.string().min(1, {
    message: "Lozinka je obavezna",
  }),
});
export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email je obavezan.",
  }),
  password: z.string().min(1, {
    message: "Minimalno 6 znakova.",
  }),
  name: z.string().min(1, {
    message: "Ime je obavezno",
  }),
  username: z.string().min(1, {
    message: "Ime je obavezno",
  }),
});
