"use client";

import { Button } from "../primitive/button";
import { Icon } from "../primitive/icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/primitive/dropdown-menu";
import Link from "next/link";
import { useState } from "react";

export function BurgerButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
      <DropdownMenuTrigger
        className="flex h-8 w-8 items-center justify-center rounded-md
          transition-colors hover:bg-charcoal-800"
      >
        <Icon icon="Menu" className="h-6 w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="mx-3 my-2 flex flex-col items-end gap-2 rounded-md
          border-none bg-charcoal-800 px-4 py-3 shadow-md"
      >
        <DropdownMenuLabel className="text-sm text-charcoal-300">
          Menu
        </DropdownMenuLabel>
        <DropdownMenuItem className="p-0">
          <Link href="/sign-in">
            <Button variant={"secondary"} size="sm">
              Sign In
            </Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-0">
          <Link href="/sign-up">
            <Button size="sm">Register</Button>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
