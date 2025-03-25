import { ErrorRequestHandler, Response } from "express";
import { HTTPSTATUS } from "../lib/config/httpStatus";

export const errorHandler: ErrorRequestHandler = (error, req,
  res,
  next) :any => {
    console.error(`Error occured on PATH: ${req.path}`, error);
    

    if (error instanceof SyntaxError) {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        message: "Invalid JSON format, please check your request body",
      });
    }

    return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
      message: "Internal Server Error",
      error: error?.message || "Unknown error occurred",
    });
}