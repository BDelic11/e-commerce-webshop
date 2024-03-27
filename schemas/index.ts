import * as z from "zod";

export const ProductCategories = z.enum(["PATULJAK", "VIJENAC", "OSTALO"]);

//LOGIN

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email je obavezan.",
  }),
  password: z.string().min(1, {
    message: "Lozinka je obavezna",
  }),
});

//REGISTER

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
  surname: z.string().min(1, {
    message: "Ime je obavezno",
  }),
  username: z.string().min(1, {
    message: "Ime je obavezno",
  }),
});

//PRODUCT

export const ProductBaseSchema = z.object({
  name: z.string().min(1, {
    message: "Ime je obavezno.", // Name is required
  }),
  category: ProductCategories, // Ensure the category matches one of the defined categories
  description: z.string().min(1, {
    message: "Opis je obavezan.", // Description is required
  }),
  image: z.string().min(1, {
    message: "Slika je obavezna.", // Image is required
  }),
  price: z.number().min(1, {
    message: "Cijena je obavezna i mora biti veća od 0.", // Price is required and must be greater than 0
  }),
  onSale: z.boolean(), // This field can be optional at creation, defaulting to false
  // Fields related to sale conditions can be omitted or made optional if they are not needed at the time of creation
  stock: z.number().min(0, {
    message: "Zaliha ne može biti negativna.", // Stock cannot be negative
  }),
});

//PRODUCT EXTENDED

export const ProductOnSaleSchema = ProductBaseSchema.extend({
  salePercentage: z
    .number()
    .min(1, "Popust je obavezan kada je proizvod na sniženju.")
    .optional(),
  saleStart: z
    .date()
    .min(new Date(), "Datum početka prodaje ne može biti u prošlosti.")
    .optional(),
  saleEnd: z.date().optional(),
}).refine(
  (data) => {
    // Ensure that when onSale is true, salePercentage, saleStart, and saleEnd are provided
    if (data.onSale) {
      if (!data.salePercentage || !data.saleStart || !data.saleEnd) {
        return false; // Fail the refinement if any are missing
      }
      // Additionally, ensure saleEnd is after saleStart
      return data.saleEnd > data.saleStart;
    }
    return true; // Pass the refinement if onSale is false
  },
  {
    message:
      "Kada je proizvod na sniženju, polja za popust, datum početka i završetka prodaje su obavezna, i datum završetka mora biti nakon datuma početka.",
    path: ["onSale"], // Adjust the path as needed
  }
);
