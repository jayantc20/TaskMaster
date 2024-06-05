import { body, validationResult, ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { Logger } from "../utils/logger/logger";

/**
 * Middleware function to create a validator chain for request body validations.
 * @param validations Array of validation chain functions.
 * @returns Validator middleware function.
 */
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

// Validator for creating a task
export const createTaskValidator = createValidator([
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
]);

// Validator for updating a task
export const updateTaskValidator = createValidator([
  body("title").trim().optional().notEmpty().withMessage("Title is required"),
  body("description")
    .trim()
    .optional()
    .notEmpty()
    .withMessage("Description is required"),
]);
