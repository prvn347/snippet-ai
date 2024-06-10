import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import { signIn } from "next-auth/react";
const montserrat = Montserrat({
  weight: ["100", "400", "600", "700", "800"],
  subsets: ["latin"],
});
export function Home() {
  return (
    <div className="  min-h-screen flex justify-center ">
      <div className="   flex justify-center flex-col ">
        <div className=" flex flex-col">
          <span
            className={cn(
              " text-6xl font-bold p-4 text-center tracking-tight  ",
              montserrat.className
            )}
          >
            Code sharing <br /> made{" "}
            <span className=" bg-gradient-to-r from-violet-100 to-blue-600 inline-block text-transparent bg-clip-text">
              simple
            </span>
          </span>
          <span
            className={cn(
              " text-xl text-center p-4  text-gray-400 ",
              montserrat.className
            )}
          >
            SnippetAi gets you up and share <br />
            code snippets faster with fully detail explaination.
          </span>
        </div>
        <div className=" flex justify-center p-4">
          <Button
            onClick={async () => {
              await signIn();
            }}
            variant={"default"}
            className={cn(
              "text-xl px-12 py-7 bg-white text-black font-semibold   ",
              montserrat.className
            )}
            size={"lg"}
          >
            Signup for free <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
