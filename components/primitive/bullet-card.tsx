'use client'
import { Card } from "./card";
import { Icon, IconKey } from "./icon";
import { cn } from "@/utils/tailwind";
import React from "react";

export const BulletCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { icon: IconKey }
>(({ className, ...props }, ref) => (
  <Card
    className={cn("flex gap-4 px-6 py-4  w-full items-center", className)}
    {...props}
    ref={ref}
  >
    <Icon icon={props.icon} className="w-6 h-6 min-w-6 stroke-gossamer-400" />
    <span className="text-charcoal-100 text-sm">
      {props.children}
    </span>
  </Card>
));
BulletCard.displayName = "BulletCard";
