import { db } from "@/db/drizzle";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const users = await db.query.user.findMany();
  console.log(users);

  return new Response(
    request.method + " " + request.nextUrl.pathname + " " + users[0].username,
  );
}
