import { Request, NextFunction, Router } from "express";
import { createUser } from "../controller/auth";

const router = Router();


router.post("/auth/register", createUser)


export default router;