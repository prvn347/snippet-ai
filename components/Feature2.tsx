import { Montserrat } from "next/font/google";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import a from "../app/a.gif";
import { CircleCheckBig, VerifiedIcon } from "lucide-react";
const montserrat = Montserrat({
  weight: ["100", "400", "600", "700", "800"],
  subsets: ["latin"],
});
export function FeatureSection2() {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2   ">
      <div className=" w-96">
        <div className=" flex flex-col justify-center h-full">
          <span
            className={cn(
              " text-3xl font-bold px-4  tracking-tight  ",
              montserrat.className
            )}
          >
            <span className=" bg-gradient-to-r from-violet-100 to-primeryCol inline-block text-transparent bg-clip-text">
              AI-Powered
            </span>
            Explanations&nbsp;
          </span>
          <span
            className={cn(
              " text-xl  px-4  text-gray-400 ",
              montserrat.className
            )}
          >
            Get detailed, AI-generated explanations of your code, making it
            easier to understand complex snippets.
          </span>
        </div>
      </div>
      <div className=" flex justify-center m-4 sm:m-10 rounded-lg shadow-lg backdrop-blur-md animate-slidein ">
        <div className=" flex flex-col  h-full py-5 sm:py-10  ">
          <Image
            className=" rounded-md "
            src={a}
            alt="my gif"
            height={1200}
            width={1200}
          />
        </div>
      </div>
    </div>
  );
}
