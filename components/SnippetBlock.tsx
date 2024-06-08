"use client";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/github-dark.css";
import { useEffect, useState } from "react";
import { Divide, LucideShare } from "lucide-react";
import { env } from "process";
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
// import { toggleStarred } from "./utils";
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
import Spinner from "./Spinner";

import { format } from "date-fns";
import { toggleStarred } from "./utils";

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
    starred: boolean;
    comments: {
      text: string;
      createdAt: Date;
      User: {
        name: string;
        image: string;
      };
    }[];
    explaination: string | null;
    User: {
      name: string | null;
      image: string | null;
      id: string;
    };
  };
}) {
  hljs.registerLanguage("javascript", javascript);
  useEffect(() => {
    hljs.highlightAll();
  }, []);
  const { toast } = useToast();
  const path = usePathname();
  const session = useSession();
  const router = useRouter();
  const [copied, isCopied] = useState(Boolean);
  const [starred, setStarred] = useState(Boolean);
  const baseurl = process.env.BASE_URL;
  useEffect(() => {
    setStarred(snippet.starred);
  }, [snippet.starred]);

  return (
    <div className="flex justify-center mt-5     ">
      <div className="bg-bg  dark:bg-background  max-w-3xl  lg:mx-0 flex justify-center   gap-7">
        <div>
          <div className=" flex  justify-between  pb-3 ">
            <div className=" flex gap-1  items-center ">
              <Avatar className="size-8">
                {/* @ts-ignore */}
                <AvatarImage src={snippet?.User.image} alt="@me" />
                {/* @ts-ignore */}
                <AvatarFallback>{snippet?.User.name[0]}</AvatarFallback>
              </Avatar>{" "}
              <div className=" flex flex-col justify-center  ">
                <div>
                  <span
                    className={cn(
                      "text-sm font-extralight ",
                      btnFont.className
                    )}
                  >
                    {snippet?.User.name}/&nbsp;
                  </span>
                  <Link
                    ref={snippet?.url}
                    className=" text-sm  items-center pb-1 font-semibold hover:underline text-primeryCol"
                    href={""}
                  >
                    {snippet?.fileName}
                  </Link>
                  <Badge variant="outline">{snippet?.access}</Badge>
                </div>
                <span className=" text-xs   font-extralight">
                  {" "}
                  created at {format(new Date(snippet.createdAt), "MM/dd/yyyy")}
                </span>
              </div>
            </div>
            <button
              onClick={async () => {
                const star = await toggleStarred(snippet.id);
                if (star?.starred) {
                  setStarred(true);
                } else {
                  setStarred(false);
                }
              }}
              className=" border border-neutral-500 rounded-md  bg-slate-500 dark:bg-slate-700 text-white justify-center  items-center h-7 w-10  sm:h-7 sm:w-20 flex  text-xs"
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className={cn(starred ? " fill-yellow-600 size-4" : "size-4")}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
              &nbsp;
              <span className=" hidden sm:block">
                {starred ? "Unstar" : "Star"}
              </span>
            </button>
          </div>
          <div className=" pb-2 text-lg  font-semibold text-black dark:text-neutral-300 dark:bg-background rounded-md">
            {snippet?.description}
          </div>

          <div className="w-full lg:max-w-3xl mx-auto bg-gray-900 px-4 rounded-md shadow-lg relative">
            <div className="flex justify-between items-center px-4 py-4 rounded-t-lg">
              <span className="text-xs font-semibold text-gray-400">
                {snippet?.fileName}
              </span>
              <button
                id="copied_display_id"
                className="text-xs font-semibold text-gray-400 btn-copy hover:text-gray-200"
                data-clipboard-target="#codeBlock"
                onClick={() => {
                  // @ts-ignore
                  navigator.clipboard.writeText(snippet?.code).then(() => {
                    // @ts-ignore
                    isCopied(true);
                    setTimeout(() => {
                      // @ts-ignore
                      isCopied(false);
                    }, 8000);
                  });
                }}
              >
                {copied ? "copied!" : "📋 Copy code "}
              </button>
            </div>
            <pre className="text-sm  text-wrap">
              <code id="codeBlock" className="language-javascript block ">
                {snippet?.code}
              </code>
            </pre>
          </div>
          <div className=" p-3">
            {" "}
            <span
              className={cn(
                " font-bold text-lg  pt-8 outline-black text-primeryCol",
                btnFont.className
              )}
            >
              AI Explaination:
            </span>
          </div>

          {snippet?.explaination && (
            <article
              className={cn(
                "prose lg:prose-xl font-mono border-purple-400  bg-opacity-50 bg-purple-500/10 backdrop-blur-md p-3 max-w-3xl sm:w-full rounded-md",
                btnFont.className
              )}
            >
              <div className=" text-right  align-top">
                <span className=" text-xs opacity-90 align-text-top text-right">
                  powered by Gemini
                </span>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: snippet.explaination,
                }}
              />{" "}
            </article>
          )}
          {snippet.comments.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg  p-3 font-semibold">Comments:</h3>
              <ul>
                {snippet.comments.map((comment, id) => (
                  <CommentList
                    key={id}
                    comment={comment.text}
                    id={id}
                    timestamp={comment.createdAt}
                    imageUrl={comment.User.image}
                    username={comment.User.name}
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
                  <Input type="text" disabled value={`${baseurl}/${path}`} />
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    onClick={() => {
                      navigator.clipboard.writeText(`${baseurl}/${path}`);
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
