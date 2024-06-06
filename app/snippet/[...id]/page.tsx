import { Appbar } from "@/components/AppBar";
import { SnippetBlock } from "@/components/SnippetBlock";
import Spinner from "@/components/Spinner";
import { getSnippet } from "@/components/utils";
import { authOption } from "@/lib/authoption";
import { getServerSession } from "next-auth";

interface props {
  params: { id: number };
}
export default async function ({ params }: props) {
  const snippet = await getSnippet(Number(params.id));
  const session = await getServerSession(authOption);
  return (
    <div className=" bg-bg dark:bg-background p-5 min-h-screen">
      {session.user.id ? (
        <SnippetBlock snippet={snippet} />
      ) : (
        <div className=" flex flex-col justify-center items-center">
          {" "}
          <Spinner />
        </div>
      )}
    </div>
  );
}
