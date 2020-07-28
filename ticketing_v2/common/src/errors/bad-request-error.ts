import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  reason = 'Bad Request';
  statusCode = 400;
  constructor(message: string) {
    super(message);

    // only because we are extending a built in class "Error"
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message || this.reason }];
  }
}
