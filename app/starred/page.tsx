import { StarIcon } from "lucide-react";

export default async function StarredSnippets() {
  return (
    <div>
      <span className=" text-lg font-bold p-3 ">
        {" "}
        Starred Snippets <StarIcon />{" "}
      </span>
      <div className=" ">
        <span> no snipperts</span>
      </div>
    </div>
  );
}
