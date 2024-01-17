"use client"

import { RegistrationData, registrationSchema } from "@/validation-schemas/auth"
import Form from "../Form"
import Input from "../Input"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { useState } from "react"
import ErrorLine from "../ErrorLine"

export default function RegistrationForm() {
  const router = useRouter()

  const [error, setError] = useState<string | null>(null)

  async function register(registrationData: RegistrationData) {
    return new Promise(async (resolve, reject) => {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
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
      title="Registration"
      description="Create an account to start using the app."
      schema={registrationSchema}
      onSubmit={async (values) => {
        setError(null)

        toast.promise(register(values), {
          pending: "Registering...",
          success: "Registered!",
          error: "Registration failed.",
        })
      }}
      fields={(formProps) => (
        <>
          <Input
            name="username"
            label="Username"
            type="text"
            placeholder="BigGuy"
            {...formProps}
          />
          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="some@example.com"
            {...formProps}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            {...formProps}
          />
          <Input
            name="confirmPassword"
            label="Confirm password"
            type="password"
            placeholder="••••••••"
            {...formProps}
          />
          <button type="submit">Register</button>
          {error && <ErrorLine severity="error" message={error} />}
        </>
      )}
    />
  )
}
