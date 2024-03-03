import { parsedEnv } from "@/utils/env";
import { Resend } from "resend";

export const resend = new Resend(parsedEnv.RESEND_API_KEY);
