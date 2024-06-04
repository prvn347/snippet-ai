"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { createComment } from "./utils";

export const Comments = ({ gistId }: { gistId: number }) => {
  const [comment, setComment] = useState("");
  const createComments = async (gistId: number, commentText: string) => {
    await createComment(gistId, commentText);
  };
  function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {}
  return (
    <div className=" pt-5 ">
      <textarea
        cols={80}
        rows={5}
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
        placeholder="leave comment"
        className="w-full h-full p-4 border  rounded-md border-input bg-transparent resize-none focus:outline-none"
      ></textarea>
      <div className=" pt-2">
        <Button
          onClick={async () => await createComment(gistId, comment)}
          className=" bg-green-600 dark:bg-green-600"
        >
          Comment
        </Button>
      </div>
    </div>
  );
};
