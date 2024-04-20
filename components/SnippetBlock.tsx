"use client";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/github-dark.css";
import { useEffect } from "react";
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

// Then register the languages you need

export function SnippetBlock({
  snippet,
}: {
  snippet: {
    code: string;
    description: string | null;
    fileName: string | null;
    explaination: string | null;
    User: {
      name: string | null;
    };
  } | null;
}) {
  hljs.registerLanguage("javascript", javascript);
  useEffect(() => {
    hljs.highlightAll();
  }, []);
  const { toast } = useToast();
  return (
    <div className="flex justify-center ">
      <div className="bg-gray-100 dark:bg-background  max-w-3xl  lg:mx-0 flex justify-center  h-screen gap-7">
        <div>
          <div className=" p-3 ">
            {snippet?.User.name} /{" "}
            <span className=" text-sm font-bold font-mono text-purple-800">
              {snippet?.fileName}
            </span>
          </div>
          <div className="p-3 text-lg  font-extralight text-purple-500 bg-background rounded-md">
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
          <span className=" font-bold text-2xl p-3 text-purple-600">
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
