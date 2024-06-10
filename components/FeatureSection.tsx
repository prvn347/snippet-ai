import { Montserrat } from "next/font/google";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
const montserrat = Montserrat({
  weight: ["100", "400", "600", "700", "800"],
  subsets: ["latin"],
});
export function FeatureSection() {
  return (
    <div className=" grid grid-cols-2   h-72">
      <div className=" w-96">
        <div className=" flex flex-col justify-center">
          <span
            className={cn(
              " text-3xl font-bold px-4  tracking-tight  ",
              montserrat.className
            )}
          >
            Loved
            <span className=" bg-gradient-to-r from-violet-100 to-blue-600 inline-block text-transparent bg-clip-text">
              features
            </span>
          </span>
          <span
            className={cn(
              " text-xl  px-4  text-gray-400 ",
              montserrat.className
            )}
          >
            Created with security in mind, Codespaces provides a secure
            development environment through its built-in capabilities and native
            integration with the GitHub platform.
          </span>
        </div>
      </div>
      <div className=" flex justify-center  bg-slate-800 rounded-md">
        <div className=" flex flex-col">
          <div
            className={cn(
              " bg-slate-600  rounded-md  px-3 py-8 h-10  w-48   text-lg font-semibold text-center",
              montserrat.className
            )}
          >
            Easy creation.
          </div>
          <div
            className={cn(
              " bg-slate-600 p-2 text-lg font-semibold text-center",
              montserrat.className
            )}
          >
            Effective Explaination.
          </div>
          <div
            className={cn(
              " bg-slate-600 p-2 text-lg font-semibold text-center",
              montserrat.className
            )}
          >
            Easy sharing.
          </div>
        </div>
      </div>
    </div>
  );
}
