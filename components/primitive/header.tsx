import { Button } from "./button";
import { validateRequest } from "@/utils/auth";
import Image from "next/image";
import Link from "next/link";

export async function Header() {
  const { user } = await validateRequest();

  return (
    <header className="w-full sticky top-0 z-10">
      <div className="flex justify-between w-full w-max-[1280px] mx-auto py-6 px-6 md:py-8 md:px-12">
        <div className="flex gap-3 items-center">
          <Image
            src="/icons/gin_logo.svg"
            alt="logo"
            className="h-8 w-8"
            width={32}
            height={32}
          />
          <span className="text-xl">Gin</span>
        </div>

        <nav className="flex gap-3 items-center">
          {!user && (
            <Link href="/sign-in">
              <Button variant={"secondary"} size="sm">
                Sign In
              </Button>
            </Link>
          )}
        </nav>
      </div>
      <div
        className={`absolute z-[-1] top-0 w-full h-full backdrop-blur-xl
        [mask-image:linear-gradient(0deg,_rgba(255,255,255,0)_0%,_rgba(255,255,255,1)_20%)]`}
      />
    </header>
  );
}
