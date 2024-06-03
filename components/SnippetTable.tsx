"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { $Enums, Gist, GistUrl, User } from "@prisma/client";

import "highlight.js/styles/github-dark.css";
import javascript from "highlight.js/lib/languages/javascript";
import hljs from "highlight.js";
import { useEffect } from "react";

export function SnippetTable({
  snippets,
}: {
  snippets: {
    code: string;
    fileName: string | null;
    user: string | null;
    createdAt: Date;
    image: string | null;
    url: void[];
    id: number;
  }[];
}) {
  hljs.registerLanguage("javascript", javascript);
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div>
      <div className=" text-lg text-purple-600 p-8 flex items-center">
        All Snippets <ArrowRightIcon />
      </div>
      <div>
        <div className="flex justify-center ">
          <div className="bg-gray-100 dark:bg-background  max-w-3xl  lg:mx-0 flex flex-col justify-center  h-screen gap-7">
            {snippets.map((e, id) => (
              <div className=" flex flex-col  border border-purple-600">
                <div>
                  <div className=" p-3  ">
                    <div className=" flex  gap-3">
                      <Avatar>
                        <AvatarImage src={e.image} alt="@me" />
                        <AvatarFallback>{e.user[0]}</AvatarFallback>
                      </Avatar>{" "}
                      <div className=" flex justify-center items-center">
                        {e.user} /{" "}
                        <span className=" text-sm font-bPold font-mono text-purple-800">
                          {e.fileName}
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
