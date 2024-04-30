"use client";

import Image, { ImageProps } from "next/image";
import Link, { LinkProps } from "next/link";
import { HTMLAttributes } from "react";

function OAuthLink({
  children,
  ...props
}: LinkProps &
  HTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode }) {
  return (
    <Link
      className="flex h-14 w-14 rounded-md items-center justify-center bg-charcoal-900"
      title="Sign up with Github"
      {...props}
    >
      {children}
    </Link>
  );
}

function OAuthImage({ alt, ...props }: ImageProps) {
  return (
    <Image
      width={32}
      height={32}
      alt={alt || "OAuth provider icon"}
      {...props}
    />
  );
}

export function OAuthButtonGroup() {
  return (
    <section className="flex gap-6 justify-center">
      <OAuthLink href="api/oauth/github/login" title="Sign in with GitHub">
        <OAuthImage src="/icons/github_icon.svg" alt="github icon" />
      </OAuthLink>
      <OAuthLink href="api/oauth/discord/login" title="Sign in with Discord">
        <OAuthImage src="/icons/discord_icon.svg" alt="discord icon" />
      </OAuthLink>
      <OAuthLink href="api/oauth/google/login" title="Sign in with Google">
        <OAuthImage src="/icons/gmail_icon.svg" alt="gmail icon" />
      </OAuthLink>
    </section>
  );
}
