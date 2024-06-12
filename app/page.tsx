import { Landing } from "@/components/Landing";
import { authOption } from "@/lib/authoption";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOption);
  if (session.user.id) {
    redirect("/snippets");
  }
  return (
    <main>
      <Landing />
    </main>
  );
}
