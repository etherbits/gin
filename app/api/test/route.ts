import { db } from "@/db";
import { foo } from "@/db/schemas/schema";
import { s3 } from "@/lib/objectStorage";
import { parsedEnv } from "@/utils/env";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

export async function GET() {
  const result = await db.select().from(foo).all();
  const buckets = await s3.send(
    new ListObjectsV2Command({ Bucket: parsedEnv.CLOUDFLARE_R2_BUCKET_NAME }),
  );

  console.log(buckets);

  return Response.json(result);
}
