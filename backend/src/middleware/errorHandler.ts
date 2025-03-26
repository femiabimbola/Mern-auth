import { ErrorRequestHandler, Response, Request, NextFunction } from "express";
import { HTTPSTATUS } from "../lib/config/httpStatus";
import { AppError } from "../lib/error/appError";

export const errorHandler: ErrorRequestHandler = (error, req,
  res,
  next) :any => {
    console.error(`Error occured on PATH: ${req.path}`, error);
    

    if (error instanceof SyntaxError) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        message: "Invalid JSON format, please check your request body",
      });
    }

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
      });
    }

    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      error: error?.message || "Unknown error occurred",
    });
}


type AsynControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const asyncHandler =
  (controller: AsynControllerType): AsynControllerType =>
  async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };