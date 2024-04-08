import { checkSchema } from "express-validator";

export const signUpValidation = checkSchema({
  email: {
    in: ["body"],
    notEmpty: true,
    errorMessage: "Email cannot be empty",
    isEmail: {
      errorMessage: "Invalid email",
    },
  },
  username: {
    in: ["body"],
    notEmpty: true,
    errorMessage: "Username cannot be empty",
    isLength: {
      options: { min: 5, max: 20 },
      errorMessage: "Username must be between 5 and 20 characters",
    },
  },
  password: {
    in: ["body"],
    notEmpty: true,
    errorMessage: "Password cannot be empty",
    isLength: {
      options: { min: 5, max: 20 },
      errorMessage: "Password must be between 5 and 20 characters",
    },
  },
});

export const signIpValidation = checkSchema({
  email: {
    in: ["body"],
    notEmpty: true,
    errorMessage: "Email cannot be empty",
    isEmail: {
      errorMessage: "Invalid email",
    },
  },

  password: {
    in: ["body"],
    notEmpty: true,
    errorMessage: "Password cannot be empty",
    isLength: {
      options: { min: 5, max: 20 },
      errorMessage: "Password must be between 5 and 20 characters",
    },
  },
});
