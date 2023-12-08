import { withErrorHandler } from "@/utils/errorHandling";
import { getParsedFormData } from "@/utils/parser";
import { loginSchema } from "@/validation-schemas/auth";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export const POST = withErrorHandler(async (request: NextRequest) => {
  const data = await getParsedFormData(request, loginSchema);

  return new Response("ok");
});
