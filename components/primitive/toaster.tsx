"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      closeButton
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex p-4 items-center w-[min(100%,400px)] rounded-md gap-3 bg-charcoal-800 text-white border-none",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          closeButton: "unset static order-2 ml-auto transform",
          icon: "m-0"
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
