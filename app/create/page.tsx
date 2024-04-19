"use client";
import CodeBlock from "@/components/CodeBlock";
import { CodeInput } from "@/components/CodeInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendMessage } from "@/lib/sendMessage";
import { useState } from "react";
import { MagicWandIcon, StarIcon } from "@radix-ui/react-icons";
import Spinner from "@/components/Spinner";
import { marked } from "marked";
import { CreateSnippet } from "@/components/utils";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
// or const { marked } = require('marked');

interface Choice {
  id: string;
  content: string;
}
export default function () {
  const { toast } = useToast();
  const router = useRouter();
  const [gistMeta, setGistMeta] = useState({
    fileName: "",
    description: "",
    code: "",
    analyzedData: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <div className=" flex justify-center">
        <div className="flex flex-col gap-4  pt-5">
          <Input
            type="text"
            className=" bg-slate-800  active:outline-none"
            placeholder=" Snippet description..."
            onChange={(e) => {
              setGistMeta({ ...gistMeta, description: e.target.value });
            }}
          />
          <CodeInput
            onTitleChange={(e) => setGistMeta({ ...gistMeta, fileName: e })}
            onChange={(e) => setGistMeta({ ...gistMeta, code: e })}
          />
          <div className=" text-right">
            <Button
              variant={"default"}
              onClick={async () => {
                setIsLoading(true);
                const resp = await sendMessage(
                  "explain me this " +
                    gistMeta.code +
                    "and explain robot and please provider the answer in indentated html format so that i can display them properly"
                );
                setGistMeta({ ...gistMeta, analyzedData: resp.mag });
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
                  __html: gistMeta.analyzedData,
                }}
              />
            </article>
          )}
          <div className=" text-right">
            <Button
              variant={"default"}
              onClick={async () => {
                if (
                  gistMeta.analyzedData &&
                  gistMeta.code &&
                  gistMeta.description &&
                  gistMeta.fileName
                ) {
                  const resp = await CreateSnippet(gistMeta);
                  router.push("/snippet/2");
                } else {
                  toast({
                    title: "Content can't be empty",

                    action: (
                      <ToastAction altText="Goto schedule to undo">
                        ok
                      </ToastAction>
                    ),
                  });
                }
              }}
            >
              Create Snippet
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
