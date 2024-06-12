import { Montserrat } from "next/font/google";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { CircleCheckBig, VerifiedIcon } from "lucide-react";
import { Button } from "./ui/button";
const montserrat = Montserrat({
  weight: ["100", "400", "600", "700", "800"],
  subsets: ["latin"],
});
export function FeatureSection4() {
  return (
    <div className="   flex justify-center h-60 ">
      <div className=" flex flex-col justify-center h-60 items-center">
        <span
          className={cn(
            " text-3xl font-bold px-4  py-6 tracking-tight  ",
            montserrat.className
          )}
        >
          Ready to Share Your Code&nbsp;
          <span className=" bg-gradient-to-r   from-violet-100 to-primeryCol inline-block text-transparent bg-clip-text">
            Smarter?
          </span>
        </span>
        <Button
          onClick={async () => {
            await signIn();
          }}
          variant={"outline"}
          className=" border border-primeryCol  w-48  flex item-center"
        >
          {" "}
          Signup for free
        </Button>
      </div>
    </div>
  );
}
