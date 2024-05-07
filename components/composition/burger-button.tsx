"use client";

import { useState } from "react";
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

export function BurgerButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
      <DropdownMenuTrigger className="flex items-center rounded-md transition-colors justify-center hover:bg-charcoal-800 w-8 h-8">
        <Icon icon="Menu" className="w-6 h-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-end gap-2 mx-3 my-2 px-4 py-3 rounded-md shadow-md bg-charcoal-800 border-none">
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
