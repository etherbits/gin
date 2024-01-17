"use client"

import { cn } from "@/utils/styling"
import Icon, { IconName } from "../Icon"

type Severity = "error" | "warning" | "info"

type Props = {
  severity: Severity
  message: string
}

export default function ErrorLine(props: Props) {
  return (
    <section className="mt-2 flex items-center gap-2">
      <Icon
        icon={getSeverityIcon(props.severity)}
        className="h-4 w-4 stroke-red-400"
      />
      <p
        className={cn("text-slate-400", {
          "text-red-400": props.severity === "error",
          "text-yellow-400": props.severity === "warning",
        })}
      >
        {props.message}
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
