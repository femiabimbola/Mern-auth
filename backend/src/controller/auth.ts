import { Request, Response, NextFunction } from "express";
import { HTTPSTATUS } from "../lib/config/httpStatus";
import { validationResult } from "express-validator";

export const createUser = ( req: Request, res: any, next:NextFunction) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    res.status(HTTPSTATUS.CREATED).json({
      message: "User registered successfully"
    })
  } catch (error) {
    next(error)
  }
}