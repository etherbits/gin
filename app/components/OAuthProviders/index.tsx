import React from "react"
import Icon from "../Icon"
import Link from "next/link"

export default function OAuthProviders() {
  return (
    <ul className="flex gap-4">
      <li>
        <Link href="/api/log-in/google">
          <button>
            <Icon icon="Mail" />
          </button>
        </Link>
      </li>
      <li>
        <Link href="/api/log-in/github">
          <button>
            <Icon icon="Github" />
          </button>
        </Link>
      </li>
      <li>
        <Link href="/api/log-in/discord">
          <button>
            <Icon icon="Voicemail" />
          </button>
        </Link>
      </li>
    </ul>
  )
}
