"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { Home } from "./Home";
import { FeatureSection } from "./FeatureSection";

export function Landing() {
  return (
    <div className=" min-h-screen">
      <Home />
      <FeatureSection />
    </div>
  );
}
