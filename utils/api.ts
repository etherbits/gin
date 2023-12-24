import { NextResponse } from "next/server"

export function respondWithSuccess(data?: object) {
  return NextResponse.json(data ?? { message: "ok" }, { status: 200 })
}
