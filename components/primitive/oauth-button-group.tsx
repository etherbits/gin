import { Button } from "./button";
import Image from "next/image";

export function OAuthButtonGroup() {
  return (
    <>
      <section className="flex gap-6">
        <Button
          size="icon"
          className="flex h-14 w-14 items-center justify-center bg-charcoal-900"
          title="Sign up with Github"
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
          title="Sign up with Discord"
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
          title="Sign up with Google"
        >
          <Image
            src="/icons/gmail_icon.svg"
            width={32}
            height={32}
            alt="github icon"
          />
        </Button>
      </section>
    </>
  );
}
