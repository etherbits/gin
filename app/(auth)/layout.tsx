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
        <Card className="max-w-[400px]">
          <CardHeader className="flex items-center gap-4 p-6">
            <CardTitle className="text-2xl text-charcoal-50">Sign Up</CardTitle>
            <CardDescription className="m-0 p-0 text-lg text-charcoal-300">
              Enter with an authorization provider
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-8">
            <section className="flex gap-6">
              <Button
                size="icon"
                className="flex h-14 w-14 items-center justify-center bg-charcoal-900"
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
                className="flex h-14 w-14 items-center justify-center bg-charcoal-900"
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
                className="flex h-14 w-14 items-center justify-center bg-charcoal-900"
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
              <div className="h-[1px] w-full bg-charcoal-600" />
              <span className="text-charcoal-200">or</span>
              <div className="h-[1px] w-full bg-charcoal-600" />
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
