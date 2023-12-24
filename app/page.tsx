import Link from "next/link"

export default async function Landing() {
  return (
    <main>
      Gink
      <Link href="/log-in"> Log In </Link>
      <Link href="/register"> Register </Link>
      <Link href="/home"> Home </Link>
    </main>
  )
}
