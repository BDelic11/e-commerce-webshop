"use client";

import { Product } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

//icons
import pencile from "@/public/icons/pencil.svg";
import cross from "@/public/icons/cross.svg";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CustomTooltip from "./ui/custom-tooltip";
import Image from "next/image";
import { deleteProduct } from "@/actions/delete-product";
import CustomAlertDialog from "./ui/custom-alert-dialog";
import { updateProduct } from "@/actions/update-product";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

// export const payments: Product[] = [
//   {
//     id: "728ed52f",
//     name: 100,
//     status: "pending",
//     email: "m@example.com",
//   },
//   {
//     id: "489e1d42",
//     amount: 125,
//     status: "processing",
//     email: "example@gmail.com",
//   },
//   // ...
// ];

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Ime",
  },
  {
    accessorKey: "stock",
    header: "Kolicina",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Cijena</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price")) / 100;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex flex-row whitespace-nowrap justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 mx-2 ">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(product.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            // onClick={() => updateProduct(product.id)}
            variant="ghost"
            className="h-8 w-8 p-0 mx-2"
          >
            <Image src={pencile} alt="pencile icon" width={20} height={20} />
          </Button>
          <CustomAlertDialog
            id={product.id}
            action={deleteProduct}
            deletingObject="produkt"
          >
            <div className="h-8 w-8 p-0 mx-2 hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center whitespace-nowrap rounded-3xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              <Image src={cross} alt="cross icon" width={20} height={20} />
            </div>
          </CustomAlertDialog>
        </div>
      );
    },
  },
];
