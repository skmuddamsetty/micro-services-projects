export class DatabaseConnectionError extends Error {
  reason = 'Error connecting to database';
  constructor() {
    super();

    // only because we are extending a built in class "Error"
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
