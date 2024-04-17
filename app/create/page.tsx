"use client";
import CodeBlock from "@/components/CodeBlock";
import { CodeInput } from "@/components/CodeInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendMessage } from "@/lib/sendMessage";
import { useState } from "react";
import { MagicWandIcon } from "@radix-ui/react-icons";
import Spinner from "@/components/Spinner";
interface Choice {
  id: string;
  content: string;
}
export default function () {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analyzedData, setAnalyzedData] = useState({
    choices: [
      {
        index: "",
        message: {
          role: "",
          content: "",
        },
      },
    ],
  });

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
                const resp = await sendMessage([
                  { role: "system", content: "Explain me" + code },
                ]);
                setAnalyzedData(resp);
                setIsLoading(false);
              }}
            >
              Explain Me <MagicWandIcon />
            </Button>
          </div>
          <div>
            <p className=" rounded-lg max-w-screen-lg bg-background border border-input p-3">
              {isLoading ? (
                <Spinner />
              ) : (
                <span className=" flow-root">
                  {JSON.stringify(
                    analyzedData.choices[0].message.content.toString(),
                    null
                  )}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
