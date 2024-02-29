import { parsedEnv } from "@/utils/env";
import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${parsedEnv.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: parsedEnv.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: parsedEnv.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});
