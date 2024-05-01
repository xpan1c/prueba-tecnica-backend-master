import STATUS_CODES, { StatusCodes } from "http-status-codes"

export class APIError extends Error {
  public status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}
export class NotFoundError extends APIError {
  constructor(message: string) {
    super(message, STATUS_CODES.NOT_FOUND)
    this.name = "Not found Error"
  }
}
export class ServerError extends APIError {
  constructor(message: string) {
    super(message, STATUS_CODES.INTERNAL_SERVER_ERROR)
    this.name = "Server Error"
  }
}
export class MethodNotAllowedError extends APIError {
  constructor(message: string) {
    super(message, STATUS_CODES.METHOD_NOT_ALLOWED)
    this.name = "Method Not Allowed"
  }
}
export class BadRequestError extends APIError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST)
    this.name = "Bad Request Error"
  }
}