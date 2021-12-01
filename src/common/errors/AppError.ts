/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly internalCode: string;

  public readonly data: any;

  constructor(message: string, statusCode = 500, internalCode?: string, data?: any) {
    this.message = message;
    this.statusCode = statusCode;
    this.internalCode = internalCode;
    this.data = data;
  }
}

export default AppError;
