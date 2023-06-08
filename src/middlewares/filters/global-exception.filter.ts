import { ArgumentsHost, Catch, ExceptionFilter, HttpException, NotAcceptableException } from "@nestjs/common";
import { Response } from "express";
import { VALIDATION_ERROR } from "src/lib/error-codes";

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as Record<string, any>;
    // Validation error
    if (isValidationError(exception, exceptionResponse)) {
      delete exceptionResponse.statusCode;
      delete exceptionResponse.error;
      exceptionResponse.code = VALIDATION_ERROR().code;
    }
    response.status(status).json({
      meta: {
        error: exceptionResponse,
        status
      },
      data: null
    });
  }
}

function isValidationError(exception: HttpException, exceptionResponse: Record<string, any>) {
  return (
    (exception instanceof NotAcceptableException && "statusCode" in exceptionResponse) ||
    (exception.getStatus() === 400 && exceptionResponse.message === "Unexpected field")
  );
}
