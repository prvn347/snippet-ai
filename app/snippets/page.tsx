import { SnippetTable } from "@/components/SnippetTable";
import { findAllSnippets, getGistUrls } from "@/components/utils";
import { cn } from "@/lib/utils";
import { CodeIcon } from "lucide-react";
import { Poppins } from "next/font/google";
import { cache } from "react";

const btnFont = Poppins({
  weight: ["400", "300"],
  subsets: ["latin"],
});
export default async function SnippetPage() {
  const getAllSnippets = await cache(findAllSnippets)();
  const getAllGistUrls = await cache(getGistUrls)();

  const mergedData = mergeSnippetsWithUrls(getAllSnippets, getAllGistUrls);

  return (
    <div className="bg-bg   dark:bg-background  min-h-screen">
      <div
        className={cn(
          " underline-offset-3 text-lg text-primeryCol p-2 sm:p-7 font-bold flex items-center",
          btnFont.className
        )}
      >
        <CodeIcon /> My Snippets
      </div>
      {getAllSnippets ? (
        <SnippetTable snippets={mergedData} />
      ) : (
        "You have no snippets."
      )}
    </div>
  );
}

function mergeSnippetsWithUrls(snippets: any[], urls: any[]) {
  return snippets.map((snippet) => ({
    ...snippet,
    urls: urls.filter((url) => url.gistId === snippet.id),
  }));
}
