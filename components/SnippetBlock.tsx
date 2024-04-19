"use client";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/github-dark.css";
import { useEffect } from "react";
// Then register the languages you need

export function SnippetBlock() {
  hljs.registerLanguage("javascript", javascript);
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div>
      <div className="bg-gray-100 mx-8 lg:mx-0 flex justify-center items-center h-screen">
        <div>
          <div className="p-3 bg-background border border-gray-800 rounded-md">
            Description
          </div>

          <div className="w-full lg:max-w-2xl mx-auto bg-gray-900 px-4 rounded-md shadow-lg relative">
            <div className="flex justify-between items-center px-4 py-4 rounded-t-lg">
              <span className="text-xs font-semibold text-gray-400">Title</span>
              <button
                id="copyButton"
                className="text-xs font-semibold text-gray-400 btn-copy hover:text-gray-200"
                data-clipboard-target="#codeBlock"
                onClick={() => {
                  navigator.clipboard.writeText("code").then(() => {
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
              <div
                id="copied_display_id"
                className=" p-2 bg-transparent font-mono"
              >
                Copied!!
              </div>
            </div>
            <pre className="text-sm  text-wrap">
              <code id="codeBlock" className="language-javascript block">
                hello hello explain robot and please provider the answer in
                indentated html format so that i can display them properly"
                "explain robot and please provider the answer in indentated html
                format so that i can display them properly
              </code>
            </pre>
          </div>
          <article className="prose lg:prose-xl font-mono border border-gray-50 p-3 max-w-3xl rounded-md bg-[#322a18]">
            explanation
          </article>
        </div>
      </div>
    </div>
  );
}
