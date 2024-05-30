import { ProductCategories } from "@prisma/client";
// import { ProductCategories } from "@/schemas";

export const filters = [
  //   {
  //     id: 0,
  //     label: "Cijena",
  //     options: [
  //       { id: 0, label: "0 EUR - 20 EUR" },
  //       { id: 1, label: "20 EUR - 40 EUR" },
  //     ],
  //   },
  {
    id: 1,
    label: "Kategorija",
    options: [
      { id: "PATULJAK", label: "Patuljci" },
      { id: "VIJENAC", label: "Vijenci" },
      //   { id: "OSTALO", label: "Sve" },
    ],
  },
];

export interface Filter {
  id: number;
  label: string;
  options: Option[];
}

export interface Option {
  id: ProductCategories;
  label: string;
  // action: () => void
}
