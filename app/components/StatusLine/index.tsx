"use client"

import { cn } from "@/utils/styling"
import Icon, { IconName } from "../Icon"

type Severity = "error" | "warning" | "info"

type Props = {
  severity: Severity
  children: string
}

export default function StatusLine(props: Props) {
  return (
    <section className="mt-2 flex items-center gap-2">
      <Icon
        icon={getSeverityIcon(props.severity)}
        className={cn("h-4 w-4 stroke-slate-400", {
          "stroke-red-400": props.severity === "error",
          "stroke-yellow-400": props.severity === "warning",
        })}
      />
      <p
        className={cn("text-slate-400", {
          "text-red-400": props.severity === "error",
          "text-yellow-400": props.severity === "warning",
        })}
      >
        {props.children}
      </p>
    </section>
  )
}

function getSeverityIcon(severity: Severity): IconName {
  switch (severity) {
    case "error":
      return "XCircle"
    case "warning":
      return "AlertCircle"
    case "info":
      return "Info"
  }
}
