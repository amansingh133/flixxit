import { check, validationResult } from "express-validator";

const manageErrors = (cb) => (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  cb(errors.array(), req, res);
};

export const loginUserValidation = [
  check("email").isEmail().withMessage("Email is missing or invalid"),
  check("password").notEmpty().withMessage("Password is empty"),
  manageErrors((errors, req, res) => res.status(422).json({ errors })),
];

export const signUpUserValidation = [
  check("email").isEmail().withMessage("Email is missing or invalid"),
  check("name").notEmpty().withMessage("Name is empty").trim().escape(),
  check("password")
    .notEmpty()
    .withMessage("Password is empty")
    .isLength({ min: 6, max: 16 })
    .withMessage("Password must be between 6 and 16 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one digit")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain at least one special character"),
  manageErrors((errors, req, res) => res.status(422).json({ errors })),
];

export const validatePasswordReset = [
  check("newPassword")
    .notEmpty()
    .withMessage("Password is empty")
    .isLength({ min: 6, max: 16 })
    .withMessage("Password must be between 6 and 16 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one digit")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain at least one special character"),
  manageErrors((errors, req, res) => res.status(422).json({ errors })),
];
