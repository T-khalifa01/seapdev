

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import DashboardClient from "./components/DashboardClient";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return <DashboardClient session={session} />;
}