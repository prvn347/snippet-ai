"use client";
import CodeBlock from "@/components/CodeBlock";
import { CodeInput } from "@/components/CodeInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendMessage } from "@/lib/sendMessage";
import { useState } from "react";
import { MagicWandIcon } from "@radix-ui/react-icons";
import Spinner from "@/components/Spinner";
import { marked } from "marked";
import { CreateSnippet } from "@/lib/utils";
// or const { marked } = require('marked');

interface Choice {
  id: string;
  content: string;
}
export default function () {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analyzedData, setAnalyzedData] = useState("");

  return (
    <div>
      <div className=" flex justify-center">
        <div className="flex flex-col gap-4  pt-5">
          <Input
            type="text"
            className=" bg-slate-800  active:outline-none"
            placeholder=" Snippet description..."
          />
          <CodeInput onChange={(e) => setCode(e)} />
          <div className=" text-right">
            <Button
              variant={"default"}
              onClick={async () => {
                setIsLoading(true);
                const resp = await sendMessage(
                  "explain me this " +
                    code +
                    "and explain robot and please provider the answer in indentated html format so that i can display them properly"
                );
                setAnalyzedData(resp.mag);
                setIsLoading(false);
              }}
            >
              Explain Me <MagicWandIcon />
            </Button>
          </div>
          {isLoading ? (
            <div className=" flex justify-center">
              <Spinner />
            </div>
          ) : (
            <article className="prose lg:prose-xl font-mono border border-gray-50 p-3 max-w-3xl rounded-md bg-[#322a18]">
              {" "}
              <div
                dangerouslySetInnerHTML={{
                  __html: analyzedData,
                }}
              />
            </article>
          )}
          <div className=" text-right">
            <Button
              variant={"default"}
              onClick={async () => {
                setIsLoading(true);
                // const resp = await CreateSnippet()

                setIsLoading(false);
              }}
            >
              Create <MagicWandIcon />
            </Button>
          </div>
          {/* <div>
            <p className=" rounded-lg max-w-screen-lg bg-background border border-input p-3">
              {isLoading ? (
                <Spinner />
              ) : (
               
              )}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
