import AdminPageComponent from "@/pages/AdminPageComponent";
import { auth } from "@/auth";
import FormError from "@/components/form-error";
import { currentUser } from "@/lib/auth";

export default async function AdminPage() {
  const user = await currentUser();

  if (user?.role !== "ADMIN") {
    return <FormError message="Niste admin, nemate pravo na ovu stranicu." />;
  }

  return (
    <>
      {JSON.stringify(user)}
      <AdminPageComponent />
    </>
  );
}
