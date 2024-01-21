"use client"
import { useForm, UseFormRegister, FieldErrors } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ZodType, z } from "zod"
import StatusLine from "../StatusLine"
import { cn } from "@/utils/styling"

export type FormRegister<T extends ZodType> = UseFormRegister<z.infer<T>>

export type FieldProps<T extends ZodType> = {
  register: FormRegister<T>
  errors: FieldErrors<T>
}

type Props<T extends ZodType> = {
  title?: string
  description?: string
  serverError?: string | null
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
      className={cn(
        "m-auto flex w-full flex-col gap-8 p-8",
        formAttributes.className,
      )}
      {...formAttributes}
    >
      <h1 className="text-center text-2xl">{title}</h1>
      <p className="text-center text-base">{description}</p>
      {fields && fields({ register, errors })}
      {props.serverError && (
        <StatusLine severity="error">{props.serverError}</StatusLine>
      )}
    </form>
  )
}
