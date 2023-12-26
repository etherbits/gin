"use client"

export default async function LogIn() {
  return (
    <main>
      <form
        className="flex flex-col gap-4 max-w-[600px] mx-auto m-16"
        action="/api/log-in"
        method="POST"
        onSubmit={async (e) => {
          e.preventDefault()

          const data = {
            email: "asd@asd.com",
            password: "asdasdasd",
          }

          const res = await fetch("/api/log-in", {
            method: "POST",
            body: JSON.stringify(data),
          })

          console.log(res.ok)
        }}
      >
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <button>Log In</button>
        <a href="/api/log-in/github">Log in with github</a>
      </form>
    </main>
  )
}
