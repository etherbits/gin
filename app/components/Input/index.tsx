"use client"

import { FieldErrors, Path } from "react-hook-form"
import StatusLine from "../StatusLine"
import { FormRegister } from "../Form"
import { TypeOf, ZodType } from "zod"
import { cn } from "@/utils/styling"

type Props<T extends ZodType> = {
  name: Path<TypeOf<T>>
  label?: string
  errors: FieldErrors
  register: FormRegister<T>
} & React.InputHTMLAttributes<HTMLInputElement>

export default function Input<T extends ZodType>(props: Props<T>) {
  const { name, label, register, errors, ...inputProps } = props
  const errorMessage = getErrorMessage(errors, name)

  return (
    <div className="flex flex-col gap-2">
      {label}
      <input
        {...inputProps}
        {...register(name)}
        className={cn("bg-charcoal-800 px-3 py-2", inputProps.className)}
      />
      {errorMessage && <StatusLine severity="error">{errorMessage}</StatusLine>}
    </div>
  )
}

function getErrorMessage(errors: FieldErrors, name: string) {
  const error = errors[name]

  if (!error || !error.message) {
    return null
  }

  return error.message as string
}
