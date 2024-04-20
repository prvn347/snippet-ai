import { SnippetTable } from "@/components/SnippetTable";
import { findAllSnippets, getSnippet } from "@/components/utils";
import { cache } from "react";

export default async function () {
  const getAllSnippets = await cache(findAllSnippets)();

  return (
    <div>
      <SnippetTable snippets={getAllSnippets} />
    </div>
  );
}
