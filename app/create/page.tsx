"use client";

import { CodeInput } from "@/components/CodeInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendMessage } from "@/lib/sendMessage";
import { useEffect, useState } from "react";
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
import { ChevronDown, PocketKnife, Sparkle, Sparkles } from "lucide-react";
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
function Page() {
  const { toast } = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(Boolean);
  const [gistMeta, setGistMeta] = useState({
    fileName: "",
    description: "",
    code: "",
    analyzedData: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [created, setCreated] = useState(Boolean);

  if (created) {
    return (
      <div className="flex justify-center  min-h-screen items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div className=" bg-bg dark:bg-background  min-h-screen ">
      <div className=" flex justify-center p-5 sm:p-0 ">
        <div className="flex flex-col gap-4  pt-5">
          <Input
            type="text"
            className=" bg-gray-100 dark:bg-slate-800  active:outline-none"
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
                const prompt = `Please provide the response in HTML format as I am using your API to populate the response neatly in a browser-based code snippet sharing application. You will be asked to explain a given code snippet. Your reply should be in HTML format with proper indentation. The explanation should include the following sections:

                1. **Title**: A brief, descriptive title for the explanation.
                2. **Description**: A detailed paragraph explaining the purpose and functionality of the code snippet.
                3. **Key Points**: A bullet-point list highlighting important aspects or steps within the code.
                4. **Conclusion**: A concluding paragraph summarizing the explanation and its relevance.
                
                Example question: What is the meaning of life?
                Example reply:
                <h1>About Life</h1>
                <p>The meaning of life has been a topic of debate for centuries. It involves understanding one's purpose, the nature of existence, and the pursuit of happiness.</p>
                <ul>
                  <li>Life is complex and multifaceted.</li>
                  <li>It involves various dimensions including personal, social, and philosophical aspects.</li>
                  <li>Different cultures and philosophies offer unique perspectives on life’s meaning.</li>
                </ul>
                <p>In conclusion, the meaning of life is a deeply personal and subjective concept, varying greatly among individuals and cultures.</p>
                
                Please provide the explanation for the following code snippet:
                
                Code: [${gistMeta.code}]
                Reply: `;
                const resp = await sendMessage(prompt);
                setGistMeta({ ...gistMeta, analyzedData: resp.mag });
                setIsLoading(false);
              }}
            >
              Explain Me &nbsp; <Sparkles />
            </Button>
          </div>
          {isLoading ? (
            <div className=" flex justify-center">
              <Spinner />
            </div>
          ) : (
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
                  __html: gistMeta.analyzedData,
                }}
              />{" "}
            </article>
          )}
          <div className="   flex justify-end   ">
            <div className=" flex">
              <Button
                className={cn(" items-center", btnFont.className)}
                variant={"default"}
                onClick={async () => {
                  if (
                    gistMeta.analyzedData &&
                    gistMeta.code &&
                    gistMeta.description &&
                    gistMeta.fileName
                  ) {
                    setCreated(true);
                    const resp = await CreateSnippet(gistMeta);

                    const id = resp?.id;
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
                  setCreated(false);
                }}
              >
                Create Snippet <CodeIcon />
              </Button>
              {/* <Button
                className=""
                onClick={() => {
                  setOpen((open) => !open);
                }}
              >
                <ChevronDown />
              </Button> */}
            </div>
          </div>
          {/* {open ? (
            <div className=" flex justify-end">
              <div className=" dark:bg-slate-600 p-3 rounded-md bg-white ">
                <li  className=" outline-none  ">Secret Snippet</li>
                <li className=" outline-none ">Public Snippet</li>
              </div>
            </div>
          ) : null} */}
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

export default Page;
