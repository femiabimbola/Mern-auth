import { Request, NextFunction, Router } from "express";
import { createUser, loginUser } from "../controller/auth";
import {  checkSchema } from "express-validator";
import { createUserValidationSchema, loginUserValidationSchema } from "../validator/expressValidator";

const router = Router();


router.post("/auth/register", checkSchema(createUserValidationSchema), createUser)

router.post("/auth/login", checkSchema(loginUserValidationSchema), loginUser)


export default router;