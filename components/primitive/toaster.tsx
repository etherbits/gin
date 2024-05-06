"use client";

import { Icon, IconButton, IconKey } from "./icon";
import { SavedToast } from "@/utils/server-toast";
import { cn } from "@/utils/tailwind";
import { useEffect } from "react";
import { ExternalToast, Toaster as Sonner, toast } from "sonner";
import { getCookie, removeCookie } from "typescript-cookie";

const iconMap: Record<ToastVariants, { icon: IconKey; className: string }> = {
  default: { icon: "Bell", className: "stroke-charcoal-100" },
  loading: {
    icon: "LoaderCircle",
    className: "stroke-charcoal-300 animate-spin",
  },
  info: { icon: "Info", className: "stroke-charcoal-400" },
  success: { icon: "CircleCheck", className: "stroke-emerald-500" },
  warning: { icon: "CircleAlert", className: "stroke-yellow-500" },
  error: { icon: "CircleX", className: "stroke-red-500" },
} as const;

const Toaster = ({ ...props }: ToasterProps) => {
  useEffect(() => {
    const cookieToast = getCookie("toast");
    removeCookie("toast");

    if (!cookieToast) return;
    let toastData: SavedToast | undefined;

    try {
      toastData = JSON.parse(cookieToast);
    } catch (error) {
      console.error(error);
    }

    if (!toastData) return;

    toast.custom((id) => (
      <Toast
        message={toastData!.message}
        variant={toastData!.variant}
        toastData={{ id }}
      />
    ));
  }, []);

  return (
    <Sonner
      closeButton={true}
      theme="dark"
      toastOptions={{ classNames: { toast: "w-full" } }}
      duration={5000}
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
      {toastData?.id && (
        <IconButton
          className="ml-auto"
          onClick={() => toast.dismiss(toastData.id)}
        >
          <Icon icon="X" />
        </IconButton>
      )}
    </section>
  );
}

export { Toaster, Toast };

type ToasterProps = React.ComponentProps<typeof Sonner>;
type ToastProps = {
  message?: string | React.ReactNode;
  toastData?: ExternalToast;
  icon?: React.ReactNode;
  variant?: keyof typeof iconMap;
} & React.HTMLProps<HTMLDivElement>;

export type ToastVariants =
  | "default"
  | "loading"
  | "info"
  | "success"
  | "warning"
  | "error";
