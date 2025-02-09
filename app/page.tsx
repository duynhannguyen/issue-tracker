import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "./auth/authOptions";
import HomePage from "./HomePage";
export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session) return redirect("/dashboard/groups");

  return <HomePage />;
}
