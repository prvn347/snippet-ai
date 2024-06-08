import { SnippetTable } from "@/components/SnippetTable";
import { getGistUrls, getStarred } from "@/components/utils";
import { authOption } from "@/lib/authoption";
import { cn } from "@/lib/utils";
import { CodeIcon, StarIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { Poppins } from "next/font/google";
import { cache } from "react";
const btnFont = Poppins({
  weight: ["400", "300"],
  subsets: ["latin"],
});
export default async function StarredSnippets() {
  const starred = await cache(getStarred)();
  const getAllGistUrls = await cache(getGistUrls)();
  const mergedData = mergeSnippetsWithUrls(starred, getAllGistUrls);

  return (
    <div>
      <div className=" bg-bg dark:bg-background min-h-screen">
        <div
          className={cn(
            " underline-offset-3 text-lg text-primeryCol p-2 sm:p-7 font-bold flex items-center",
            btnFont.className
          )}
        >
          <StarIcon /> Starred Snippets
        </div>
        <SnippetTable snippets={mergedData} />
      </div>
    </div>
  );
}

function mergeSnippetsWithUrls(snippets: any[], urls: any[]) {
  return snippets.map((snippet) => ({
    ...snippet,
    urls: urls.filter((url) => url.gistId === snippet.id),
  }));
}
