"use client"

import { LoginData, loginSchema } from "@/validation-schemas/auth"
import Form from "../Form"
import Input from "../Input"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useState } from "react"
import StatusLine from "../StatusLine"

export default function AuthForm() {
  const router = useRouter()

  const [error, setError] = useState<string | null>(null)

  async function register(loginData: LoginData) {
    return new Promise(async (resolve, reject) => {
      const response = await fetch("/api/log-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      })

      const data = await response.json()

      if (response.ok) {
        router.replace("/home")
        return resolve(data)
      }

      setError(data.message)
      reject(data)
    })
  }

  return (
    <Form
      title="Log in"
      description="Fill in your credentials to log in"
      schema={loginSchema}
      serverError={error}
      onSubmit={async (values) => {
        setError(null)

        toast.promise(register(values), {
          pending: "Logging in...",
          success: "Authenticated!",
          error: "Authentication failed",
        })
      }}
      fields={(formProps) => (
        <>
          <Input
            name="email"
            label="Username"
            type="text"
            placeholder="BigGuy"
            {...formProps}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            {...formProps}
          />
          <button type="submit">Log In</button>
        </>
      )}
    />
  )
}
