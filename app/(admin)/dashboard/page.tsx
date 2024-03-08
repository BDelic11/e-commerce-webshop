import AdminPageComponent from "@/pages/AdminPageComponent";
import { auth } from "@/auth";
export default async function AdminPage() {
  const session = await auth();
  return (
    <>
      {JSON.stringify(session)}
      <AdminPageComponent />
    </>
  );
}
