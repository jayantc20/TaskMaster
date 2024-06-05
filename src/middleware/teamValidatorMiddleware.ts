import { body, validationResult, ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { Logger } from "../utils/logger/logger";

const createValidator = (validations: ValidationChain[]) => [
  ...validations,
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      Logger.info(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const createTeamValidator = createValidator([
  body("name").trim().notEmpty().withMessage("Team name is required"),
]);

export const updateTeamValidator = createValidator([
  body("name")
    .trim()
    .optional()
    .notEmpty()
    .withMessage("Team name is required"),
]);

export const inviteValidator = createValidator([
  body("userId").trim().notEmpty().withMessage("User ID is required"),
]);
