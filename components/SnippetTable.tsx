"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function SnippetTable() {
  return (
    <div>
      <div className=" text-lg text-purple-600 p-8 flex items-center">
        All Snippets <ArrowRightIcon />
      </div>
      <div className="flex justify-center ">
        <div className="bg-gray-100 dark:bg-background  max-w-3xl  lg:mx-0 flex justify-center  h-screen gap-7">
          <div>
            <div>
              <div className=" p-3  ">
                <div className=" flex  gap-3">
                  <Avatar>
                    {/* <AvatarImage src={session.data?.user?.image} alt="@me" /> */}
                    <AvatarFallback>P</AvatarFallback>
                  </Avatar>{" "}
                  <div className=" flex justify-center items-center">
                    Name /{" "}
                    <span className=" text-sm font-bPold font-mono text-purple-800">
                      <Link href={"/snippet/5"}> file name</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:max-w-3xl mx-auto bg-gray-900 px-4 rounded-md shadow-lg relative">
              <div className="flex justify-between items-center px-4 py-4 rounded-t-lg">
                <span className="text-xs font-semibold text-gray-400">
                  code.tsx
                </span>
                <button
                  id="copyButton"
                  className="text-xs font-semibold text-gray-400 btn-copy hover:text-gray-200"
                  data-clipboard-target="#codeBlock"
                  onClick={() => {
                    // @ts-ignore
                    navigator.clipboard.writeText("code").then(() => {
                      // @ts-ignore
                      document.getElementById(copied_display_id).style.display =
                        "block";
                      setTimeout(() => {
                        // @ts-ignore
                        document.getElementById(
                          copied_display_id
                        ).style.display = "none";
                      }, 1000);
                    });
                  }}
                >
                  📋 Copy code
                </button>
              </div>
              <pre className="text-sm  text-wrap    ">
                <code id="codeBlock" className="language-javascript block ">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam
                  culpa porro hic quia nesciunt minima mollitia dolorem quos
                  recusandae et dicta corrupti voluptas officia eaque cupiditate
                  laudantium, explicabo deleniti aperiam eum perspiciatis amet
                  dolore inventore rerum necessitatibus. Quasi, iste dolorum!
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
