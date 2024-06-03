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
import { CreateSnippet, createGistUrl } from "@/components/utils";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { PocketKnife, Sparkle } from "lucide-react";
import { CodeIcon } from "lucide-react";
// or const { marked } = require('marked');
const btnFont = Poppins({
  weight: ["400", "300"],
  subsets: ["latin"],
});
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
      <div className=" flex justify-center  ">
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
              className={cn("", btnFont.className)}
              variant={"default"}
              onClick={async () => {
                setIsLoading(true);
                const resp = await sendMessage(
                  `Warning:Please provider the response in html format as i am using your api so that I can populate your resonse neatly on browser.You will be asked a to explain a given code snippet.Your reply should be in html format with proper indentation. Your reply should include a title, a descriptive paragraph,and in bullet points and a concluding paragraph as illustrated below.Example question: What is the meaning of life?Example reply:Title: About life Description: Life. Don't talk to me about life.Conclusion: All the circuits down my left arm code: [${gistMeta.code}]Reply: `
                );
                setGistMeta({ ...gistMeta, analyzedData: resp.mag });
                setIsLoading(false);
              }}
            >
              Explain Me &nbsp; <Sparkle />
            </Button>
          </div>
          {isLoading ? (
            <div className=" flex justify-center">
              <Spinner />
            </div>
          ) : (
            <article className="prose lg:prose-xl font-mono border-purple-400 bg-purple-500 bg-opacity-50 backdrop-blur-md p-3 max-w-3xl rounded-md">
              <div
                dangerouslySetInnerHTML={{
                  __html: gistMeta.analyzedData,
                }}
              />
            </article>
          )}
          <div className=" text-right">
            <Button
              className={cn("", btnFont.className)}
              variant={"default"}
              onClick={async () => {
                if (
                  gistMeta.analyzedData &&
                  gistMeta.code &&
                  gistMeta.description &&
                  gistMeta.fileName
                ) {
                  const resp = await CreateSnippet(gistMeta);

                  const id = resp.id;
                  if (id) {
                    router.push(`/snippet/${id}`);
                  } else {
                    toast({
                      title: "Your session expired please signin again!",
                      action: (
                        <ToastAction altText="Goto schedule to undo">
                          ok
                        </ToastAction>
                      ),
                    });
                  }
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
              Create Snippet <CodeIcon />
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
