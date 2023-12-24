import { z } from "zod"


// Quick and dirty
process.env.BASE_URL =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "development"
    ? "http://localhost:3000"
    : "https://gin.nikaa.online"

export function createServerEnv<ServerEnv extends Record<string, z.ZodTypeAny>>(
  server: ServerEnv,
) {
  const serverEnv = z.object(server)

  const serverEnvResult = serverEnv.safeParse(process.env)
  if (!serverEnvResult.success) {
    throw new Error(serverEnvResult.error.message)
  }

  return serverEnvResult.data
}
