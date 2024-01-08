"use client"

import { registrationSchema } from "@/validation-schemas/auth"
import Form from "../Form"
import Input from "../Input"

export default function RegistrationForm() {
  return (
    <Form
      title="Registration"
      description="Create an account to start using the app."
      schema={registrationSchema}
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
