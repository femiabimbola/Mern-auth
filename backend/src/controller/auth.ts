import { Request, Response, NextFunction } from "express";
import { HTTPSTATUS } from "../lib/config/httpStatus";
import { validationResult,matchedData } from "express-validator";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm"
import { db } from "../database/connectdb";
import { users } from "../database/schema";
import { BadRequestException } from "../lib/error/catchError";
import { ErrorCode } from "../lib/error/appError";

export const createUser = async ( req: Request, res: any, next:NextFunction) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const data = matchedData(req);
  const { name, email, password } = data;

  try {

    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

      if (existingUser.length > 0) {
        throw new BadRequestException (
          "User already exists with this email", ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
        );
      }
    const hashedPassword = await hash(password, 10);
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });
    
    res.status(HTTPSTATUS.CREATED).json({
      message: "User registered successfully"
    })
  } catch (error) {
    next(error)
  }
}