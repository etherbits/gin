"use client";

import { Icon, IconButton } from "./icon";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function TopBar(props: {
  title: string;
  TitleSlot?: ReactNode;
  description?: string;
  RightSlot?: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/home";

  return (
    <div className="flex w-[min(1440px,100vw)] flex-col gap-5 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {!isHome && (
            <IconButton onClick={router.back}>
              <Icon icon="ChevronLeft" className="w-6 h-6" />
            </IconButton>
          )}
          <h1 className="whitespace-nowrap text-2xl text-charcoal-50">
            {props.title}
          </h1>
          {props.TitleSlot}
        </div>
        {props.RightSlot}
      </div>
      <p className="font-light text-charcoal-200">{props.description}</p>
    </div>
  );
}
