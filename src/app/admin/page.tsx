import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";
import { isAdminEmail } from "@/lib/auth";

export const dynamic = "force-dynamic";

async function AdminPage() {
  const user = await currentUser();

  // User is not logged in
  if (!user) redirect("/");

  // Check if any of user's emails match the configured admin email
  const hasAdminAccess = user.emailAddresses.some((e) => isAdminEmail(e.emailAddress));

  if (!hasAdminAccess) {
    redirect("/dashboard");
  }

  return <AdminDashboardClient />;
}

export default AdminPage;
