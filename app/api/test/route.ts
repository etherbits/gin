import { db } from "@/db";
import { users } from "@/db/schemas/user";
import { s3 } from "@/lib/objectStorage";
import { parsedEnv } from "@/utils/env";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

export const dynamic = 'force-dynamic'

export async function GET() {
  const result = await db.select().from(users).all();
  const buckets = await s3.send(
    new ListObjectsV2Command({ Bucket: parsedEnv.CLOUDFLARE_R2_BUCKET_NAME }),
  );

  console.log(buckets);

  return Response.json(result);
}
