import { Appbar } from "@/components/AppBar";
import { SnippetBlock } from "@/components/SnippetBlock";
import { getSnippet } from "@/components/utils";

interface props {
  params: { id: number };
}
export default async function ({ params }: props) {
  const snippet = await getSnippet(Number(params.id));

  return (
    <div className=" bg-bg dark:bg-background p-5 min-h-screen">
      <SnippetBlock snippet={snippet} />
    </div>
  );
}
