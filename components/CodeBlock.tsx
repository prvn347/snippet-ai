import React, { useEffect } from "react";
import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
// import styles from "../app/CodeBlock.module.css";
import "highlight.js/styles/github-dark.css";

export default function CodeBlock({ block }: { block: any }) {
  const code: string = block.toString();
  hljs.registerLanguage("javascript", javascript);
  console.log(block);
  const copied_display_id = `copied_display_block_id`;
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div className="bg-white">
      <pre className=" text-xl">
        <code className="language-javascript">{code}</code>
        <div className="font-bold">
          <button
            className=" bg-red-300"
            onClick={() => {
              navigator.clipboard.writeText(code).then(() => {
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
            Copy
          </button>
          <div id={copied_display_id} className=" bg-purple-50">
            Copied!!
          </div>
        </div>
      </pre>
    </div>
  );
}
