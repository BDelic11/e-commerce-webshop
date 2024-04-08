// import { RoleGate } from "@/components/auth/role-gate";
// import FormSuccess from "@/components/form-success";
// import { UserRole } from "@prisma/client";
import React from "react";

//icons
import plus from "@/public/icons/plus.svg";

//components
import AdminOverviewCard from "@/components/admin-overview-card";
import SalesAnalitics from "@/components/admin-sales-analitics";
import Modal from "@/components/ui/modal";

const AdminPageComponent = async () => {
  return (
    <main className="flex flex-col gap-2 p-4 md:absolute md:right-0 md:w-4/5 md:flex md:flex-col md:gap-5  md:p-4">
      <div className="flex flex-col gap-2 md:flex md:flex-row md:gap-5 ">
        <AdminOverviewCard
          label="Total revenue"
          price
          amount={200}
          icon={plus}
        />
        <AdminOverviewCard label="Sales" amount={200} icon={plus} />
        <AdminOverviewCard label="Active now" amount={200} icon={plus} />
        {/* <AdminTopProduct /> */}
      </div>
      <div className="md:flex md:flex-row md:w-full">
        <SalesAnalitics />
        <Modal />
      </div>
    </main>
  );
};

export default AdminPageComponent;
