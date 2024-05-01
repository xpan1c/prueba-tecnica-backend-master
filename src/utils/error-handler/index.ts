import "module-alias/register"
import { APIError, ServerError } from "./errors"
import { APIGatewayProxyResult } from "aws-lambda"
import { APIErrorResponse } from "@models/index"


export function handleError(error: Error): Promise<APIGatewayProxyResult> {
  let errorModel;
  if (error instanceof APIError)
    errorModel = error as APIError;
  else
    errorModel = new ServerError(`Error not handle [${error.name}, ${error.message}]`)

  return Promise.resolve({
    statusCode: errorModel.status,
    body: JSON.stringify(new APIErrorResponse(errorModel.message)),
  })

}

