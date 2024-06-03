"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { $Enums, Gist, GistUrl, User } from "@prisma/client";

import "highlight.js/styles/github-dark.css";
import javascript from "highlight.js/lib/languages/javascript";
import hljs from "highlight.js";
import { useEffect } from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const btnFont = Poppins({
  weight: ["400", "300"],
  subsets: ["latin"],
});
export function SnippetTable({
  snippets,
}: {
  snippets: {
    code: string;
    fileName: string | null;
    user: string | null;
    createdAt: Date;
    image: string | null;
    id: number;
    urls: {
      url: string | null;
    }[];
  }[];
}) {
  hljs.registerLanguage("javascript", javascript);
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div className="">
      <div
        className={cn(
          " text-lg text-primeryCol p-2 sm:p-7 font-bold flex items-center",
          btnFont.className
        )}
      >
        All Snippets <ArrowRightIcon />
      </div>
      <div>
        <div className="flex justify-center ">
          <div className="bg-gray-100 dark:bg-background  max-w-3xl  lg:mx-0 flex flex-col justify-center  gap-4">
            {snippets.map((e, id) => (
              <div className=" flex flex-col   rounded-md ">
                <div>
                  <div className=" p-2 ">
                    <div className=" flex  gap-1">
                      <Avatar className="size-8">
                        <AvatarImage src={e.image} alt="@me" />
                        <AvatarFallback>{e.user[0]}</AvatarFallback>
                      </Avatar>{" "}
                      <div className=" flex flex-col">
                        <div
                          className={cn(
                            " flex justify-center items-center text-sm"
                          )}
                        >
                          {e.user} /&nbsp;
                          {e.urls.map((url, urlIndex) => (
                            <Link
                              key={urlIndex}
                              href={url.url}
                              className=" text-sm font-bPold font-bold text-primeryCol"
                            >
                              {e.fileName}
                            </Link>
                          ))}
                        </div>
                        <span className=" text-xs  font-extralight">
                          {" "}
                          created at {e.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  key={id}
                  className="w-full lg:max-w-3xl mx-auto bg-gray-900 px-4 rounded-md shadow-lg relative"
                >
                  <div className="flex justify-between items-center px-4 py-4 rounded-t-lg">
                    <span className="text-xs font-semibold text-gray-400">
                      {e.fileName}
                    </span>
                    <button
                      id="copyButton"
                      className="text-xs font-semibold text-gray-400 btn-copy hover:text-gray-200"
                      data-clipboard-target="#codeBlock"
                      onClick={() => {
                        // @ts-ignore
                        navigator.clipboard.writeText(e.code);
                      }}
                    >
                      📋 Copy code
                    </button>
                  </div>
                  <pre className="text-sm  text-wrap    ">
                    <code id="codeBlock" className="language-javascript block ">
                      {e.code}
                    </code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
