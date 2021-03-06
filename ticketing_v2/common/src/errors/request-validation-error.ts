import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

// interface example
// here we did not implement this interface in RequestValidationError because by using interface we cannot do a instance of check in Custom Error
// interface CustomError {
//   statusCode: number;
//   serializeErrors(): {
//     message: string;
//     field?: string;
//   }[];
// }

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    // only because we are extending a built in class "Error"
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    const formattedErrors = this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
    return formattedErrors;
  }
}
