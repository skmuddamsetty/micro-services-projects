import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // modification # 1
  // if (err instanceof RequestValidationError) {
  //   const formattedErrors = err.errors.map((error) => {
  //     return { message: error.msg, field: error.param };
  //   });
  //   return res.status(400).json({ errors: formattedErrors });
  // }
  // if (err instanceof DatabaseConnectionError) {
  //   return res.status(500).json({ errors: [{ message: err.reason }] });
  // }

  // modification # 2

  // if (err instanceof RequestValidationError) {
  //   return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  // }
  // if (err instanceof DatabaseConnectionError) {
  //   return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  // }

  // modification # 3
  // this will handle all types of errors that are extending CustomError class
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ errors: err.serializeErrors() });
  }

  res
    .status(400)
    .json({ errors: [{ message: err.message || 'Something went wrong!' }] });
};
