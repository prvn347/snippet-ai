"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { createComment } from "./utils";
import { useRouter } from "next/navigation";
import { CompressionStream } from "node:stream/web";
import { MessageCircleCode } from "lucide-react";

export const Comments = ({ gistId }: { gistId: number }) => {
  const [comment, setComment] = useState("");
  const router = useRouter();
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
        className="w-full h-full p-4 border  rounded-md border-input  resize-none focus:outline-none"
      ></textarea>
      <div className=" pt-2">
        <Button
          onClick={async () => {
            await createComment(gistId, comment);
            window.location.reload();
          }}
        >
          Comment <MessageCircleCode />
        </Button>
      </div>
    </div>
  );
};
