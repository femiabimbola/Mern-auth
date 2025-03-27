import { Request, NextFunction, Router } from "express";
import { createUser } from "../controller/auth";
import {  checkSchema } from "express-validator";
import { createUserValidationSchema } from "../validator/expressValidator";

const router = Router();


router.post("/auth/register", checkSchema(createUserValidationSchema), createUser)


export default router;