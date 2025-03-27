import { Request, Response, NextFunction } from "express";
import { HTTPSTATUS } from "../lib/config/httpStatus";

export const createUser = ( req: Request, res: Response, next:NextFunction) => {
  try {
    res.status(HTTPSTATUS.CREATED).json({
      message: "User registered successfully"
    })
  } catch (error) {
    next(error)
  }
}