import { ValidationError } from 'express-validator';
export class RequestValidationError extends Error {
  constructor(public errors: ValidationError[]) {
    super();

    // only because we are extending a built in class "Error"
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
