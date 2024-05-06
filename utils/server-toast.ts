import { ToastVariants } from "@/components/primitive/toaster";
import { cookies } from "next/headers";
import { ExternalToast } from "sonner";

export function saveToast(toastData: SavedToast) {
  cookies().set("toast", JSON.stringify(toastData));
}

export type SavedToast = ExternalToast & { message: string } & {variant: ToastVariants}
