import { NextResponse } from "next/server";

export function respondWithSuccess() {
  return NextResponse.json({
    message: "success",
    statusCode: 200,
  });
}
