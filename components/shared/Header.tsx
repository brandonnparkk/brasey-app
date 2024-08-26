import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="w-full border-b">
      <h2 className="w-full">Casey & Brandon</h2>
      {/* <div className="wrapper flex items-center justify-between">
        <SignedIn>
          <nav className="md:flex-between w-full justify-center hidden max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded-full" size="lg">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div> */}
    </header>
  );
};

export default Header;
