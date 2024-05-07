"use client";

import { Card } from "./card";
import { Icon, IconKey } from "./icon";
import { cn } from "@/utils/tailwind";
import React from "react";

export const BulletCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { icon: IconKey }
>(({ className, ...props }, ref) => (
  <Card
    className={cn(
      "flex gap-4 px-6 py-4 lg:gap-5 lg:px-6 lg:py-5 w-full items-center",
      className,
    )}
    {...props}
    ref={ref}
  >
    <Icon
      icon={props.icon}
      className="w-6 h-6 min-w-6 lg:w-7 lg:h-7 lg:min-w-7 stroke-gossamer-400"
    />
    <span className="text-charcoal-100 text-sm lg:text-lg">
      {props.children}
    </span>
  </Card>
));
BulletCard.displayName = "BulletCard";
