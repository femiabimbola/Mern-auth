
import { HTTPSTATUS,HttpStatusCode } from "../config/httpStatus";

export class AppError extends Error {
  public statusCode: HttpStatusCode;
  public errorCode?: ErrorCode;

  constructor(
    message: string,
    statusCode = HTTPSTATUS.INTERNAL_SERVER_ERROR,
    errorCode?: ErrorCode
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}


// You can make it object
export const enum ErrorCode {
  AUTH_EMAIL_ALREADY_EXISTS = "AUTH_EMAIL_ALREADY_EXISTS",
  AUTH_INVALID_TOKEN = "AUTH_INVALID_TOKEN",
  AUTH_USER_NOT_FOUND = "AUTH_USER_NOT_FOUND",
  AUTH_NOT_FOUND = "AUTH_NOT_FOUND",
  AUTH_TOO_MANY_ATTEMPTS = "AUTH_TOO_MANY_ATTEMPTS",
  AUTH_UNAUTHORIZED_ACCESS = "AUTH_UNAUTHORIZED_ACCESS",
  AUTH_TOKEN_NOT_FOUND = "AUTH_TOKEN_NOT_FOUND",

  BAD_REQUEST = "BAD_REQUEST",

  // Access Control Errors
  ACCESS_FORBIDDEN = "ACCESS_FORBIDDEN",
  ACCESS_UNAUTHORIZED = "ACCESS_UNAUTHORIZED",

  // Validation and Resource Errors
  VALIDATION_ERROR = "VALIDATION_ERROR",
  RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",

  // System Errors
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  VERIFICATION_ERROR = "VERIFICATION_ERROR",
}

