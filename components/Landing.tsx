"use client";
import { signIn, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { Home } from "./Home";
import { FeatureSection } from "./FeatureSection";
import { FeatureSection1 } from "./Feature1";
import { FeatureSection2 } from "./Feature2";
import { FeatureSection3 } from "./Feature3";
import { FeatureSection4 } from "./Feature4";
import { useState } from "react";
import { redirect } from "next/navigation";
import { LoopScroll } from "./CodeLoop";

export function Landing() {
  const session = useSession();

  if (session.status == "authenticated") {
    redirect("/snippets");
  }
  return (
    <div className=" min-h-screen px-6 ">
      <Home />
      <FeatureSection1 />
      <FeatureSection2 />
      <FeatureSection3 />

      <FeatureSection4 />
    </div>
  );
}
