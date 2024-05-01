import { APIGatewayProxyResult } from "aws-lambda"
import { StatusCodes } from "http-status-codes"
import { APIResponse } from "@models/index"

const resultOK = (body: unknown = undefined): APIGatewayProxyResult => {
  return {
    statusCode: StatusCodes.OK,
    body: typeof body === 'string' ? body : JSON.stringify(body)
  };
};

const notFound = (body: unknown = undefined): APIGatewayProxyResult => {
  return {
    statusCode: StatusCodes.NOT_FOUND,
    body: typeof body === 'string' ? body : JSON.stringify(body)
  };
};

const badRequest = (message: string): APIGatewayProxyResult => {
    return {
      statusCode: StatusCodes.BAD_REQUEST,
      body: JSON.stringify({error:message})
    };
};

const internalServerError = (message: string): APIGatewayProxyResult => {
  return {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    body: JSON.stringify({error:message})
  };
};

const methodNotAllowed = (message: string): APIGatewayProxyResult => {
  return {
    statusCode: StatusCodes.METHOD_NOT_ALLOWED,
    body: JSON.stringify({error:message})
  };
};

export function buildResponse(response: APIResponse<any>): APIGatewayProxyResult {
  return {
    statusCode: StatusCodes.OK,
    body: (response.data && response.data!=null)?JSON.stringify(response):"{}",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "*"
    }
  }
}

export const Response = {
    methodNotAllowed: methodNotAllowed,
    internalServerError: internalServerError,
    badRequest: badRequest,
    notFound: notFound,
    resultOK: resultOK
}