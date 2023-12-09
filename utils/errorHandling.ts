import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export type Result<T> = [T, null] | [null, Error];

export type ErrorDescriptor = {
  error: Error;
  status: number;
  message?: string;
};

export async function getResult<T>(
  fn: () => Promise<T>,
  customErr?: ApiError,
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (customErr) {
      throw customErr;
    }

    throw err;
  }
}

export function withErrorHandler(fn: Function) {
  return async function (request: NextRequest): Promise<NextResponse> {
    try {
      return await fn(request);
    } catch (err) {
      if (err instanceof ApiError) {
        return err.respond();
      }

      if (err instanceof ValidationError) {
        return err.respond();
      }

      throw err;
    }
  };
}

export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
  }

  respond() {
    return NextResponse.json({
      message: this.message,
      statusCode: this.statusCode,
    });
  }
}

export class ValidationError extends ApiError {
  errors: Record<string, string[] | undefined>;

  constructor(statusCode: number, message: string, errors: ZodError) {
    super(statusCode, message);

    this.errors = errors.flatten().fieldErrors;
  }

  respond() {
    return NextResponse.json({
      message: this.message,
      statusCode: this.statusCode,
      errors: this.errors,
    });
  }
}
