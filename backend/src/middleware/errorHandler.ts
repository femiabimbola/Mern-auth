import { ErrorRequestHandler, Response } from "express";

export const errorHandler: ErrorRequestHandler = (error, req,
  res,
  next) :any => {
    console.error(`Error occured on PATH: ${req.path}`, error);

    return res.status(500).json({
      message: "Internal Server Error",
      error: error?.message || "Unknown error occurred",
    });
}