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
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const inter = Montserrat({ subsets: ["latin"] });
export const Appbar = () => {
  const session = useSession();
  const user = session.data?.user;
  const admin = false;
  const router = useRouter();

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
          <Button
            onClick={() => {
              router.push("/create");
            }}
          >
            <PlusIcon />
          </Button>
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

          <ModeToggle />
          {user && (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    {" "}
                    <Avatar>
                      <AvatarImage src={session.data?.user?.image} alt="@me" />
                      <AvatarFallback>
                        {session.data?.user?.image[0]}
                      </AvatarFallback>
                    </Avatar>{" "}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-3  dark:bg-black flex flex-col dark:text-white ">
                      <NavigationMenuLink className="p-2">
                        signed in as{" "}
                        <span className=" text-sm font-bold">
                          {session.data?.user?.email}
                        </span>
                      </NavigationMenuLink>

                      <NavigationMenuLink className="p-2">
                        <Button variant={"link"} onClick={async () => {}}>
                          your snippets
                        </Button>
                      </NavigationMenuLink>
                      <NavigationMenuLink className="p-2">
                        <Button variant={"link"} onClick={async () => {}}>
                          Fav snippets
                        </Button>
                      </NavigationMenuLink>
                      <NavigationMenuLink className="p-2">
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
