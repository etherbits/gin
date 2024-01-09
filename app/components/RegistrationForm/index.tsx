"use client"

import { registrationSchema } from "@/validation-schemas/auth"
import Form from "../Form"
import Input from "../Input"
import { useRouter } from "next/navigation"

export default function RegistrationForm() {
  const router = useRouter()

  return (
    <Form
      title="Registration"
      description="Create an account to start using the app."
      schema={registrationSchema}
      onSubmit={async (values) => {

        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
        
        console.log(res)

        if(res.ok) {
          alert("Registration successful!")
          router.replace("/home")
        }

        const errData = await res.json()
        console.error(errData)


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
        </>
      )}
    />
  )
}
