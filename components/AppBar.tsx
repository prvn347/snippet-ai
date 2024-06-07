"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";
import { signIn, signOut } from "next-auth/react";
import { Montserrat } from "next/font/google";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Source_Code_Pro } from "next/font/google";
import { QrCode, SquareCode, SquareFunction } from "lucide-react";

const inter = Montserrat({ subsets: ["latin"] });
export const Appbar = () => {
  const session = useSession();
  const user = session.data?.user;
  const admin = false;
  const router = useRouter();

  return (
    <div className="bg-zinc-50   dark:bg-zinc-950 p-3 flex    justify-center border-b shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl  items-center flex justify-between w-full">
        <Link href={"/"}>
          <div
            className={`  flex  justify-center items-center dark:text-zinc-100 text-zinc-950 text-2xl ${inter.className} `}
          >
            <SquareCode /> Snippet<span className=" font-bold">ai</span>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Button
            className=" p-3 w-10 h-8"
            onClick={() => {
              router.push("/create");
            }}
          >
            <PlusIcon />
          </Button>
          <Button
            className="hidden sm:block"
            variant={"link"}
            onClick={async () => {
              router.push("/snippets");
            }}
          >
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

          <ModeToggle />
          {user && (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    {" "}
                    <Avatar className=" size-8">
                      {/* @ts-ignore */}
                      <AvatarImage src={session.data?.user?.image} alt="@me" />
                      <AvatarFallback>
                        {/* @ts-ignore */}
                        {session.data?.user?.image[0]}
                      </AvatarFallback>
                    </Avatar>{" "}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="  dark:bg-black  flex flex-col dark:text-white ">
                      <NavigationMenuLink className="p-2 ">
                        signed in as{" "}
                        <span className=" text-sm font-bold">
                          {session.data?.user?.email}
                        </span>
                      </NavigationMenuLink>

                      <NavigationMenuLink>
                        <Button
                          variant={"link"}
                          onClick={async () => {
                            router.push("/snippets");
                          }}
                        >
                          Your Snippets
                        </Button>
                      </NavigationMenuLink>
                      <NavigationMenuLink>
                        <Button
                          variant={"link"}
                          onClick={async () => {
                            router.push("/starred");
                          }}
                        >
                          Starred Snippets
                        </Button>
                      </NavigationMenuLink>
                      <NavigationMenuLink>
                        <Button
                          variant={"link"}
                          onClick={async () => {
                            await signOut();
                          }}
                        >
                          Logout
                        </Button>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
      </div>
    </div>
  );
};
