"use client"

import { FieldErrors, Path } from "react-hook-form"
import ErrorLine from "../ErrorLine"
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
        className={cn("px-3 py-2 bg-charcoal-800", inputProps.className)}
      />
      {errorMessage && <ErrorLine severity="error" message={errorMessage} />}
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
