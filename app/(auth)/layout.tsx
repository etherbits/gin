import { Button } from "@/components/primitive/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/primitive/card";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center pt-16">
      <main>
        <Card className="w-[360px]">
          <CardHeader className="flex items-center">
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <section className="flex gap-6">
              <Button
                size="icon"
                className="flex h-14 w-14 items-center justify-center border-[1px]"
              >
                <Image
                  src="/icons/github_icon.svg"
                  width={32}
                  height={32}
                  alt="github icon"
                />
              </Button>
              <Button
                size="icon"
                className="flex h-14 w-14 items-center justify-center border-[1px]"
              >
                <Image
                  src="/icons/discord_icon.svg"
                  width={32}
                  height={32}
                  alt="github icon"
                />
              </Button>
              <Button
                size="icon"
                className="flex h-14 w-14 items-center justify-center border-[1px]"
              >
                <Image
                  src="/icons/gmail_icon.svg"
                  width={32}
                  height={32}
                  alt="github icon"
                />
              </Button>
            </section>
            <div className="flex w-full items-center gap-4">
              <div className="h-[1px] w-full bg-slate-500" />
              <span>or</span>
              <div className="h-[1px] w-full bg-slate-500" />
            </div>
            <section className="flex w-full flex-col items-center">
              {children}
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
