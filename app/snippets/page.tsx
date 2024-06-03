import { SnippetTable } from "@/components/SnippetTable";
import { findAllSnippets, getGistUrls } from "@/components/utils";
import { cache } from "react";

export default async function SnippetPage() {
  const getAllSnippets = await cache(findAllSnippets)();
  const getAllGistUrls = await cache(getGistUrls)();

  const mergedData = mergeSnippetsWithUrls(getAllSnippets, getAllGistUrls);

  return (
    <div className="bg-gray-100 dark:bg-background">
      <SnippetTable snippets={mergedData} />
    </div>
  );
}

function mergeSnippetsWithUrls(snippets, urls) {
  return snippets.map((snippet) => ({
    ...snippet,
    urls: urls.filter((url) => url.gistId === snippet.id),
  }));
}
