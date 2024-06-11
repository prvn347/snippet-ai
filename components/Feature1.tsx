import { Montserrat } from "next/font/google";
import { signIn } from "next-auth/react";
import Image from "next/image";
import c from "../app/c.gif";
import { cn } from "@/lib/utils";
import { CircleCheckBig, VerifiedIcon } from "lucide-react";
const montserrat = Montserrat({
  weight: ["100", "400", "600", "700", "800"],
  subsets: ["latin"],
});
export function FeatureSection1() {
  return (
    <div className=" grid grid-cols-2   ">
      <div className=" w-96">
        <div className=" flex flex-col justify-center h-full">
          <span
            className={cn(
              " text-3xl font-bold px-4  tracking-tight  ",
              montserrat.className
            )}
          >
            Create and Share&nbsp;
            <span className=" bg-gradient-to-r from-violet-100 to-primeryCol inline-block text-transparent bg-clip-text">
              Snippets
            </span>
          </span>
          <span
            className={cn(
              " text-xl  px-4  text-gray-400 ",
              montserrat.className
            )}
          >
            Quickly create code snippets and share them with your team, friends,
            or the community.
          </span>
        </div>
      </div>
      <div className=" flex justify-center m-10 rounded-lg shadow-lg backdrop-blur-md">
        <div className=" flex flex-col gap-3 h-full py-10  ">
          <Image
            className=" rounded-md"
            src={c}
            alt="my gif"
            height={1100}
            width={1100}
          />
          {/* <div
            className={cn(
              "    bg-[#24292F]  flex items-center gap-2 rounded-md  shadow-lg     text-xl   px-3 py-4  backdrop-blur-md   font-semibold ",
              montserrat.className
            )}
          >
            <CircleCheckBig color="purple" size={36} className=" " /> Easy{" "}
            creation.
          </div>
          <div
            className={cn(
              "    bg-[#24292F] rounded-md  flex items-center gap-2  shadow-lg    text-xl  px-3 py-4  font-semibold ",
              montserrat.className
            )}
          >
            <CircleCheckBig color="purple" size={36} className=" " /> Effective{" "}
            Explaination.
          </div>
          <div
            className={cn(
              "    bg-[#24292F] rounded-md  flex items-center gap-2  shadow-lg    text-xl  px-3 py-4  font-semibold ",
              montserrat.className
            )}
          >
            <CircleCheckBig color="purple" size={36} className=" " /> Easy{" "}
            sharing.
          </div> */}
        </div>
      </div>
    </div>
  );
}
