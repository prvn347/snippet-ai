import { Appbar } from "@/components/AppBar";
import { SnippetBlock } from "@/components/SnippetBlock";
import Spinner from "@/components/Spinner";
import { getSnippet } from "@/components/utils";
import { authOption } from "@/lib/authoption";
import { getServerSession } from "next-auth";

interface props {
  params: { id: number };
}
async function Page({ params }: props) {
  const snippet = await getSnippet(Number(params.id));
  const session = await getServerSession(authOption);
  return (
    <div className="  bg-bg dark:bg-background p-5   min-h-screen">
      {session.user.id ? (
        // @ts-ignore
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
export default Page;
