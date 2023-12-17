import { z } from "zod";

export function createServerEnv<ServerEnv extends Record<string, z.ZodTypeAny>>(
	server: ServerEnv,
) {
	const serverEnv = z.object(server);

	const serverEnvResult = serverEnv.safeParse(process.env);
	if (!serverEnvResult.success) {
		throw new Error(serverEnvResult.error.message);
	}

	return serverEnvResult.data;
}
