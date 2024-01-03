import { getPageSession } from "@/utils/auth"
import { redirect } from "next/navigation"
import { env } from "@/app/env"
import TextBox from "../components/TextBox"

export default async function Home() {
  const session = await getPageSession()
  if (!session) redirect(env.AUTH_GUARD_PATH)

  return (
    <main>
      <h1>Gin Home Page</h1>
      <div>username: {session.user.username}</div>
      <div>is email verified: {String(!!session.user.emailVerified)}</div>
      <form action="/api/log-out" method="POST">
        <button>log out</button>
      </form>

      <form action="/api/deck/add" method="POST">
        <input type="text" name="title" value="virgil" />
        <input type="text" name="description" value="desc" />
        <input type="text" name="isPublic" value="true" />
        <input type="text" name="isVisible" value="true" />
        <button>add deck</button>
      </form>

      <TextBox />
    </main>
  )
}
