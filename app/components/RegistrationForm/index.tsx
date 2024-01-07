"use client"
import { RegistrationData, registrationSchema } from "@/validation-schemas/auth"
import { useForm, SubmitHandler } from "react-hook-form"
import {zodResolver} from '@hookform/resolvers/zod'

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationData>({resolver: zodResolver(registrationSchema)})

  const onSubmit: SubmitHandler<RegistrationData> = (data) => console.log(data)
  console.log(errors)

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-[500px] bg-charcoal-900 gap-8 p-8 m-auto mt-[8%]"
    >
      <h1 className="text-2xl text-center">Register your account</h1>
      <input type="text" placeholder="John Doe" {...register("username")} />
      <input
        type="email"
        placeholder="Example@mail.com"
        {...register("email")}
      />
      <input type="password" placeholder="●●●●●●●●" {...register("password")} />
      <input
        type="password"
        placeholder="●●●●●●●●"
        {...register("confirmPassword")}
      />

      <input type="submit" />
    </form>
  )
}
