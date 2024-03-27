// import { RoleGate } from "@/components/auth/role-gate";
// import FormSuccess from "@/components/form-success";
// import { UserRole } from "@prisma/client";
import React from "react";

//icons
import plus from "@/public/icons/plus.svg";

//components
import { columns } from "@/components/admin-product-columns";
import { getProducts } from "@/actions/get-products";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import CustomDialog from "@/components/ui/custom-dialog";

const AdminProductsPageComponent = async () => {
  const products = await getProducts();

  if (!products.products) {
    return null;
  }

  return (
    <main className="md:absolute md:right-0 md:w-4/5 md:flex md:flex-col md:gap-5  md:p-4">
      <div className="text-gray-800 md:flex md:flex-row md:justify-between md:align-middle md:w-full md:px-12 mx-auto mt-4">
        <h1 className="md:text-3xl md:mt-2">Produkti</h1>
        <CustomDialog header="Novi produkt">Dodaj produkt</CustomDialog>
      </div>
      <div className="container mx-auto py-6">
        <DataTable columns={columns} data={products.products} />
      </div>
    </main>
  );
};

export default AdminProductsPageComponent;
