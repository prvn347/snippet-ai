"use client";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/github-dark.css";
import { useEffect, useState } from "react";
import { LucideShare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { usePathname } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import { createGistUrl } from "./utils";
import { Poppins } from "next/font/google";
import { Source_Code_Pro } from "next/font/google";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Comments } from "./Comments";
import { CommentList } from "./CommentList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const btnFont = Poppins({
  weight: ["400", "300"],
  subsets: ["latin"],
});
const codeFont = Source_Code_Pro({
  weight: ["400", "300"],
  subsets: ["latin"],
});
// Then register the languages you need

export function SnippetBlock({
  snippet,
}: {
  snippet: {
    id: number;
    code: string;
    url: string;
    description: string | null;
    fileName: string | null;
    access: string;
    createdAt: Date;
    comments: {
      text: string;
    }[];
    explaination: string | null;
    User: {
      name: string | null;
      image: string | null;
    };
  };
}) {
  hljs.registerLanguage("javascript", javascript);
  useEffect(() => {
    hljs.highlightAll();
  }, []);
  const { toast } = useToast();
  const session = useSession();
  const router = useRouter();
  return (
    <div className="flex justify-center mt-5 ">
      <div className="bg-gray-100 dark:bg-background  max-w-3xl  lg:mx-0 flex justify-center  h-screen gap-7">
        <div>
          <div className=" flex gap-1 flex-col  pb-6 ">
            <div className=" flex gap-1  items-center ">
              <Avatar className="size-8">
                <AvatarImage src={snippet?.User.image} alt="@me" />
                <AvatarFallback>{snippet?.User.name[0]}</AvatarFallback>
              </Avatar>{" "}
              <div className=" flex flex-col">
                <div>
                  <span
                    className={cn(
                      "text-sm font-extralight ",
                      btnFont.className
                    )}
                  >
                    {snippet?.User.name} &nbsp;/{" "}
                  </span>
                  <Link
                    ref={snippet?.url}
                    className=" text-md  items-center pb-1 font-semibold hover:underline text-primeryCol"
                    href={""}
                  >
                    {snippet?.fileName}
                  </Link>
                  <Badge variant="outline">{snippet?.access}</Badge>
                </div>
                <span className=" text-xs   font-extralight">
                  {" "}
                  created at {snippet?.createdAt.toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className=" pb-2 text-lg  font-semibold text-neutral-300 bg-background rounded-md">
            {snippet?.description}
          </div>

          <div className="w-full lg:max-w-3xl mx-auto bg-gray-900 px-4 rounded-md shadow-lg relative">
            <div className="flex justify-between items-center px-4 py-4 rounded-t-lg">
              <span className="text-xs font-semibold text-gray-400">
                {snippet?.fileName}
              </span>
              <button
                id="copyButton"
                className="text-xs font-semibold text-gray-400 btn-copy hover:text-gray-200"
                data-clipboard-target="#codeBlock"
                onClick={() => {
                  // @ts-ignore
                  navigator.clipboard.writeText(snippet?.code).then(() => {
                    // @ts-ignore
                    document.getElementById(copied_display_id).style.display =
                      "block";
                    setTimeout(() => {
                      // @ts-ignore
                      document.getElementById(copied_display_id).style.display =
                        "none";
                    }, 1000);
                  });
                }}
              >
                📋 Copy code
              </button>
            </div>
            <pre className="text-sm  text-wrap    ">
              <code id="codeBlock" className="language-javascript block ">
                {snippet?.code}
              </code>
            </pre>
          </div>
          <span
            className={cn(
              " font-bold text-2xl mt-5 text-purple-600",
              btnFont.className
            )}
          >
            {" "}
            AI Explaination:
          </span>
          {snippet?.explaination && (
            <article className="prose lg:prose-xl font-mono border border-purple-700 mt-3 p-3 max-w-3xl rounded-md bg-background">
              <div
                dangerouslySetInnerHTML={{
                  __html: snippet.explaination,
                }}
              />
            </article>
          )}
          {snippet.comments.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Comments:</h3>
              <ul>
                {snippet.comments.map((comment) => (
                  <CommentList
                    comment={comment.text}
                    timestamp={snippet.createdAt}
                    imageUrl={snippet.User.image}
                    username={snippet.User.name}
                  />
                ))}
              </ul>
            </div>
          )}
          {session.data?.user ? (
            <Comments gistId={snippet?.id} />
          ) : (
            <div className=" flex justify-center border rounded-md p-2     border-orange-950">
              {" "}
              <button
                onClick={() => {
                  router.push("/api/auth/signin");
                }}
                className=" rounded-md px-2 py-1 text-sm shadow-sm bg-green-600"
              >
                Login
              </button>
              <span className=" text-lg font-semibold ">
                &nbsp;to join this conversation.
              </span>{" "}
            </div>
          )}
          <div className=" flex justify-center p-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className=" p-3" variant="default">
                  Share <LucideShare className=" p-1 " />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Copy the url!</DialogTitle>
                </DialogHeader>
                <div>
                  <Input type="text" disabled value={window.location.href} />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast({
                        title: "copied!",

                        action: (
                          <ToastAction altText="Goto schedule to undo">
                            ok
                          </ToastAction>
                        ),
                      });
                    }}
                  >
                    Copy
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
