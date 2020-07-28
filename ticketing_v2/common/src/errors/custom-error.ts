export abstract class CustomError extends Error {
  // by specifying the statusCode property as abstract we are telling that the subclass must implement this
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    // only because we are extending a built in class "Error"
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
