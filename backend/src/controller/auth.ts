import { Request, Response, NextFunction } from "express";
import { HTTPSTATUS } from "../lib/config/httpStatus";
import { validationResult, matchedData } from "express-validator";
import { hash, compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { db } from "../database/connectdb";
import {
  session,
  // userPreference,
  users,
  verificationCode as verificationCodeModel,
} from "../database/schema";
import { BadRequestException } from "../lib/error/catchError";
import { ErrorCode } from "../lib/error/appError";
import { config } from "../lib/config/app.config";
import jwt from 'jsonwebtoken';
import { fortyFiveMinutesFromNow } from "../lib/utils/dateTime";
import { generateUniqueCode } from "../lib/utils/generateCode";
import { passwordSchema } from "../validator/auth";
import { getAccessTokenCookieOptions, getRefreshTokenCookieOptions } from "../lib/utils/cookies";

export const createUser = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const data = matchedData(req);

  const { name, email, password} = data

  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      throw new BadRequestException(
        "User already exists with this email",
        ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
      userPreferences: {
        enable2FA: false,
        emailNotification: false, // Example of overriding the default
        twoFactorSecret: null,
      },
    });

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    const userId = user[0].id;

    const code = generateUniqueCode();
    // const expiredAt = fortyFiveMinutesFromNow()

    const verificationCode = await db.insert(verificationCodeModel).values({
      userId,
      code,
      type: "EMAIL_VERIFICATION",
    });

    res.status(HTTPSTATUS.CREATED).json({
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};


export const loginUser = async (req: Request, res: any,
  next: NextFunction
) => {

  const userAgent = req.headers["user-agent"];
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  
  const data = matchedData(req);

  const { email, password} = data
  // console.log(email, password, userAgent)
  const mfaRequired = false

  try {
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
  
    if (!existingUser[0]) return res.status(400).json({message: "User is not found, register"})
    
    const passwordsMatch = await compare(password, existingUser[0].password);
    if (!passwordsMatch) return res.status(400).json({message: "Password did not match"})

    const sessiondb = await db.insert(session).values({
      userId: existingUser[0].id, userAgent
    }).returning()
    
    const accessToken = jwt.sign(
      {userId: existingUser[0].id, sessionId: sessiondb[0].id,},
       config.JWT.SECRET,
     { audience: ["user"], expiresIn: config.JWT.EXPIRES_IN});

     const refreshToken = jwt.sign(
       {sessionId: sessiondb[0].id,},
       config.JWT.REFRESH_SECRET,
     { audience: ["user"], expiresIn: config.JWT.REFRESH_EXPIRES_IN});

    return res
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions())
    .status(HTTPSTATUS.OK).json({message: "You have successfully signed in", data: existingUser[0]})
  } catch (error) {
    next(error);
  }
}