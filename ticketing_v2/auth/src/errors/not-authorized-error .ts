import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  reason = 'Not Authorized';
  statusCode = 401;
  constructor(message: string) {
    super(message);

    // only because we are extending a built in class "Error"
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message || this.reason }];
  }
}
