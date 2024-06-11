"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { Home } from "./Home";
import { FeatureSection } from "./FeatureSection";
import { FeatureSection1 } from "./Feature1";
import { FeatureSection2 } from "./Feature2";
import { FeatureSection3 } from "./Feature3";
import { FeatureSection4 } from "./Feature4";

export function Landing() {
  return (
    <div className=" min-h-screen px-6 m-9">
      <Home />
      <FeatureSection1 />
      <FeatureSection2 />
      <FeatureSection3 />
      <FeatureSection4 />
    </div>
  );
}
