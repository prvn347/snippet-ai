import { Appbar } from "@/components/AppBar";
import { SnippetBlock } from "@/components/SnippetBlock";
import { getSnippet } from "@/components/utils";

interface props {
  params: { id: number };
}
export default async function ({ params }: props) {
  console.log(params.id);
  const snippet = await getSnippet(Number(params.id));

  return (
    <div className=" m-5">
      <SnippetBlock snippet={snippet} />
    </div>
  );
}
