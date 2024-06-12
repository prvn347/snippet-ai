import { Montserrat } from "next/font/google";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import s from "../app/s.gif";
import { CircleCheckBig, VerifiedIcon } from "lucide-react";
const montserrat = Montserrat({
  weight: ["100", "400", "600", "700", "800"],
  subsets: ["latin"],
});
export function FeatureSection3() {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2    ">
      <div className=" w-96">
        <div className=" flex flex-col justify-center h-full">
          <span
            className={cn(
              " text-3xl font-bold px-4  tracking-tight  ",
              montserrat.className
            )}
          >
            Collaborate and Share&nbsp;
            <span className=" bg-gradient-to-r from-violet-100 to-primeryCol inline-block text-transparent bg-clip-text">
              Effortlessly
            </span>
          </span>
          <span
            className={cn(
              " text-xl  px-4  text-gray-400 ",
              montserrat.className
            )}
          >
            Collaborate on code with built-in sharing and commenting features.
          </span>
        </div>
      </div>
      <div className=" flex justify-center m-4 sm:m-10 rounded-lg shadow-lg backdrop-blur-md">
        <div className=" flex flex-col gap-3 h-full  ">
          <Image
            className=" rounded-md"
            src={s}
            alt="my gif"
            height={1200}
            width={1200}
          />
        </div>
      </div>
    </div>
  );
}
