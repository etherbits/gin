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
    </ul>
  )
}
