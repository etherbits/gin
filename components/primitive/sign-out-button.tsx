"use client";

import { Button } from "./button";
import { Toast } from "./toaster";
import { signOut } from "@/actions/sign-out";
import { eventAction } from "@/utils/toast";
import { toast } from "sonner";

export function SignOutButton() {
  return (
    <form
      action={() =>
        eventAction(signOut, {
          init: (actionId) => {
            toast.custom(
              (id) => (
                <Toast
                  message="Signing out..."
                  variant="loading"
                  toastData={{ id }}
                />
              ),
              { id: actionId },
            );
          },
          error: (actionId) => {
            toast.custom(
              (id) => (
                <Toast
                  message="Could not sign out"
                  variant="error"
                  toastData={{
                    id: id,
                  }}
                />
              ),
              { id: actionId },
            );
          },
          success: (actionId) => {
            toast.custom(
              (id) => (
                <Toast
                  message="Signed out!"
                  variant="success"
                  toastData={{ id }}
                />
              ),
              { id: actionId },
            );
          },
        })
      }
    >
      <Button className="w-full" type="submit" variant={"secondary"}>
        Logout
      </Button>
    </form>
  );
}
