"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { signIn, signOut } from "next-auth/react";
import { Montserrat } from "next/font/google";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useSession } from "next-auth/react";
const inter = Montserrat({ subsets: ["latin"] });
export const Appbar = () => {
  //   const session = useSession();
  const user = false;
  const admin = false;

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 p-3 flex justify-center border-b shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl flex justify-between w-full">
        <Link href={"/"}>
          <div
            className={`dark:text-zinc-100 text-zinc-950 text-2xl ${inter.className} `}
          >
            Snippet<span className=" font-bold">ai</span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger> Create</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-3  dark:bg-black flex flex-col dark:text-white ">
                    <NavigationMenuLink href="/create" className="p-2">
                      Snippet
                    </NavigationMenuLink>

                    <NavigationMenuLink className="p-2">
                      Enhanced Snippet
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button variant={"link"} onClick={async () => {}}>
            {" "}
            All snippets
          </Button>
          {!user ? (
            <Button
              variant={"link"}
              onClick={async () => {
                await signIn();
              }}
            >
              Login
            </Button>
          ) : (
            ""
          )}
          {user ? (
            <Button
              variant={"link"}
              onClick={async () => {
                await signOut();
              }}
            >
              Logout
            </Button>
          ) : (
            ""
          )}

          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
