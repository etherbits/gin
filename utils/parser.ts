import { NextRequest } from "next/server";
import { ZodSchema } from "zod";
import { ApiError, ValidationError, getResult } from "./errorHandling";

export async function getParsedFormData<T>(
	request: NextRequest,
	schema: ZodSchema<T>,
) {
	const formData = await getResult(
		() => request.formData(),
		new ApiError(400, "Please provide form data"),
	);

	const objData = getFormDataObject(formData);

	const data = await schema.safeParseAsync(objData);

	if (!data.success) {
		throw new ValidationError(
			400,
			"The provided data is not valid",
			data.error,
		);
	}

	return data.data;
}

function getTypeParsedObject(object: Record<string, FormDataEntryValue>) {
	const parsedObject: Record<string, FormDataEntryValue | boolean> = object;

	Object.entries(parsedObject).forEach(([key, value]) => {
		if (typeof value !== "string") return;

		const nValue = value.toLowerCase();
		if (nValue === "true" || nValue === "false") {
			parsedObject[key] = Boolean(value);
		}
	});

	return parsedObject;
}

function getFormDataObject(formData: FormData) {
	const formObj = Object.fromEntries(formData.entries());
	const parsedFormObj = getTypeParsedObject(formObj);

	return parsedFormObj;
}
