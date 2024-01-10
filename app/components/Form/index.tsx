"use client"
import {
  useForm,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ZodType, z } from "zod"

export type FormRegister<T extends ZodType> = UseFormRegister<z.infer<T>>

export type FieldProps<T extends ZodType> = {
  register: FormRegister<T>
  errors: FieldErrors<T>
}

type Props<T extends ZodType> = {
  title?: string
  description?: string
  fields?: (fieldProps: FieldProps<T>) => React.ReactNode
  schema: T
  onSubmit?: (data: z.infer<T>) => void
} & Omit<React.HTMLAttributes<HTMLFormElement>, "onSubmit">

export default function Form<T extends ZodType>(props: Props<T>) {
  const { title, description, fields, schema, onSubmit, ...formAttributes } =
    props

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({ resolver: zodResolver(schema) })

  return (
    <form
      onSubmit={onSubmit && handleSubmit(onSubmit)}
      className="flex flex-col w-[500px] bg-charcoal-900 gap-8 p-8 m-auto mt-[8%]"
      {...formAttributes}
    >
      <h1 className="text-2xl text-center">{title}</h1>
      <p className="text-base text-center">{description}</p>
      {fields && fields({ register, errors })}
    </form>
  )
}
