"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

export function Landing() {
  return (
    <div className=" min-h-screen">
      <div className=" px-9">
        <section className=" flex flex-col gap-3">
          <span className=" text-3xl text-primeryCol p-3 font-bold ">
            Snippets with ai.
          </span>
          <span className=" text-2xl font-semibold p-3 text-primeryCol">
            {" "}
            Create,autoexplain and share at ease!
          </span>
        </section>
        <section className="p-3  flex flex-col gap-5">
          <span className="  ">Landing page coming soon... </span>

          <Button
            onClick={async () => {
              await signIn();
            }}
            size={"lg"}
            variant={"secondary"}
          >
            {" "}
            Signup for free.
          </Button>
        </section>
      </div>
    </div>
  );
}
