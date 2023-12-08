import { NextResponse } from "next/server";

export function respondWithSuccess(data?: object) {
  if (!data) {
    return NextResponse.next();
  }
  return NextResponse.json(data);
}
