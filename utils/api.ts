import { NextResponse } from "next/server";

export function respondWithSuccess(data?: object) {
	if (!data) {
		return new NextResponse();
	}
	return NextResponse.json(data);
}
