"use client";

import { Icon, IconButton, IconKey } from "./icon";
import { cn } from "@/utils/tailwind";
import { ExternalToast, Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;
type ToastProps = {
  message?: string | React.ReactNode;
  toastData: ExternalToast;
  icon?: React.ReactNode;
  variant?: keyof typeof iconMap;
} & React.HTMLProps<HTMLDivElement>;

type toastVariants =
  | "default"
  | "loading"
  | "info"
  | "success"
  | "warning"
  | "error";

const iconMap: Record<toastVariants, { icon: IconKey; className: string }> = {
  default: { icon: "Bell", className: "stroke-charcoal-100" },
  loading: {
    icon: "LoaderCircle",
    className: "stroke-charcoal-300 animate-spin",
  },
  info: { icon: "Info", className: "stroke-slate-400" },
  success: { icon: "CircleCheck", className: "stroke-emerald-500" },
  warning: { icon: "CircleAlert", className: "stroke-yellow-500" },
  error: { icon: "CircleX", className: "stroke-red-500" },
} as const;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      closeButton={true}
      theme="dark"
      toastOptions={{ classNames: { toast: "w-full" } }}
      {...props}
    />
  );
};

function Toast({
  message,
  toastData,
  icon,
  variant = "default",
  ...props
}: ToastProps) {
  return (
    <section
      className={cn(
        "flex items-center bg-charcoal-900 w-full px-5 rounded-lg py-4 h-[72px] shadow-md",
        props.className,
      )}
      {...props}
    >
      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          {icon || (
            <Icon
              icon={iconMap[variant].icon}
              className={cn("stroke-charcoal-100", iconMap[variant].className)}
            />
          )}
          <h6 className="text-charcoal-100 font-semibold text">{message}</h6>
        </div>
        {toastData?.description && (
          <p className="text-charcoal-200 text-sm">{toastData.description}</p>
        )}
      </div>
      <IconButton
        className="ml-auto"
        onClick={() => toast.dismiss(toastData.id)}
      >
        <Icon icon="X" />
      </IconButton>
    </section>
  );
}

export { Toaster, Toast };
