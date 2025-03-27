import {Schema, validationResult} from "express-validator";
import { Request, Response, NextFunction } from "express";

export const createUserValidationSchema : Schema = {
  name: {
    isLength: {
      options: { min: 3, max: 32 },
      errorMessage: "name cannot be less than 2 characters",
    },
    notEmpty: { errorMessage: "name cannot be empty" },
    isString: { errorMessage: "name must be a string" },
  },

  email: {
    notEmpty: { errorMessage: "Email cannot be empty" },
    isEmail: { errorMessage: "Enter a valid email" },
  },

  password: {
    notEmpty: { errorMessage: "Password cannot be empty" },
    isLength: { options: { min: 6 }, errorMessage: "Password cannot be less than 6 characters" },
    matches: {
      options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
      errorMessage: "Password must contain at least a digit, symbol, uppercase, and lowercase",
    },
  },

  confirmPassword: {
    notEmpty: { errorMessage: "Confirm password cannot be empty" },
    custom: {
      options: (value:string, { req } : {req: any}) => {
        if (value !== req.body.password)  throw new Error("Passwords do not match");
        return true; // Indicates the validation passed
      },
    },
  },
};

