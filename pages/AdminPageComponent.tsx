import { RoleGate } from "@/components/auth/role-gate";
import FormSuccess from "@/components/form-success";
import { currentRole } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import React from "react";

const AdminPageComponent = async () => {
  const role = await currentRole();

  return (
    <main>
      Current Role: {role}
      <RoleGate allowedRole={UserRole.ADMIN}>
        <FormSuccess message="Vi ste admin" />
      </RoleGate>
    </main>
  );
};

export default AdminPageComponent;
