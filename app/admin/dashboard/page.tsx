import AdminPageComponent from "@/pages/admin/AdminPageComponent";
import { auth } from "@/auth";
import FormError from "@/components/form-error";
import { currentRole, currentUser } from "@/lib/auth";

export default async function AdminPage() {
  const role = await currentRole();

  if (role !== "ADMIN") {
    return (
      <>
        {console.log(role)}
        <p> {JSON.stringify(role)}</p>
        <FormError message="Niste admin, nemate pravo na ovu stranicu." />
      </>
    );
  }

  return (
    <>
      <AdminPageComponent />
    </>
  );
}
