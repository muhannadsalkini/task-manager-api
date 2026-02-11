import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { AppError } from '../utils/appError';

export const validateCreateTask = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required and must be a non-empty string')
    .isString()
    .withMessage('Title must be a string'),
  
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return the first error message to keep it simple as per requirements
      return next(new AppError(errors.array()[0].msg, 400));
    }
    next();
  },
];
