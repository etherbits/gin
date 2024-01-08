"use client"

import { registrationSchema } from "@/validation-schemas/auth"
import Form from "../Form"

export default function RegistrationForm() {
  return (
    <Form
      title="Registration"
      description="Create an account to start using the app."
      schema={registrationSchema}
      fields={(register) => (
        <>
          <input type="text" placeholder="BigGuy" {...register("username")} />
          <input type="email" placeholder="Example@mail.com" {...register("email")} />
          <input type="password" placeholder="••••••••" {...register("password")} />
          <input type="password" placeholder="••••••••" {...register("confirmPassword")} />
          <button type="submit">Register</button>
        </>
      )}
    />
  )
}
