import { BurgerButton } from "../composition/burger-button";
import { Button } from "./button";
import { validateRequest } from "@/utils/auth";
import Image from "next/image";
import Link from "next/link";

export async function Header() {
  const { user } = await validateRequest();

  return (
    <header className="sticky top-0 z-10 w-full">
      <div
        className="mx-auto flex w-full max-w-[1440px] justify-between px-6 py-6
          md:px-12 md:py-8"
      >
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/icons/gin_logo.svg"
            alt="logo"
            className="h-8 w-8"
            width={32}
            height={32}
          />
          <span className="text-xl">Gin</span>
        </Link>

        <nav className="hidden items-center gap-3 sm:flex">
          {!user && (
            <>
              <Link href="/sign-in">
                <Button variant={"secondary"} size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm">Register</Button>
              </Link>
            </>
          )}
        </nav>
        <div className="sm:hidden">
          <BurgerButton />
        </div>
      </div>
      <div
        className={`absolute top-0 z-[-1] h-full w-full backdrop-blur-xl
          [mask-image:linear-gradient(0deg,_rgba(255,255,255,0)_0%,_rgba(255,255,255,1)_20%)]`}
      />
    </header>
  );
}
