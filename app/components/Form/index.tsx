"use client"
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ZodSchema } from "zod"

type Props<T extends ZodSchema> = {
  title?: string
  description?: string
  fields: (register: UseFormRegister<T>) => React.ReactNode
  schema: T
}

export default function Form<T extends ZodSchema>(props: Props<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({ resolver: zodResolver(props.schema) })

  const onSubmit: SubmitHandler<T> = (data) => console.log(data)
  console.log(errors)

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-[500px] bg-charcoal-900 gap-8 p-8 m-auto mt-[8%]"
    >
      <h1 className="text-2xl text-center">{props.title}</h1>
      <p className="text-base text-center">{props.description}</p>
      {props.fields(register)}
    </form>
  )
}
