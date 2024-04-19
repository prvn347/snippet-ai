import { useEffect, useRef } from "react";
import { Input } from "./ui/input";

export function CodeInput({
  onChange,
  onTitleChange,
}: {
  onChange: (e: string) => void;
  onTitleChange: (e: string) => void;
}) {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-gray-100  dark:bg-background  rounded-lg">
        <div className="p-3  dark:bg-slate-800 ">
          <Input
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="File name with extension. "
            className=" w-30"
          />
        </div>
        <pre>
          <code>
            <textarea
              cols={80}
              rows={15}
              className="w-full h-full p-4 border border-input bg-transparent resize-none focus:outline-none"
              onChange={handleInputChange}
            ></textarea>
          </code>
        </pre>
      </div>
    </div>
  );
}
