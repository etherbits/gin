import { db } from "@/db";
import { foo } from "@/db/schemas/schema";

export async function GET(){
  const result = await db.select().from(foo).all()

  return Response.json(result)
}
