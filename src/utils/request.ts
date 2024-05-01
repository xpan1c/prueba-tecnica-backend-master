import { APIGatewayProxyEvent } from "aws-lambda";

const notPostMethod = (event: APIGatewayProxyEvent): boolean =>
  event.httpMethod !== "POST";

const optionsMethod = (event: APIGatewayProxyEvent): boolean =>
event.httpMethod == "OPTIONS";
  
const getRequestBody = (event: APIGatewayProxyEvent): unknown =>
  typeof event.body === "object" ? event.body : JSON.parse(event.body);

const getRequestHeaders = (event: APIGatewayProxyEvent): unknown =>
  typeof event.headers === "object" ? event.headers : JSON.parse(event.headers);

const getRequestParameters = (event: APIGatewayProxyEvent): unknown =>
  typeof event.queryStringParameters === "object" ? event.queryStringParameters : JSON.parse(event.queryStringParameters);

export const Request = {
    getRequestParameters: getRequestParameters,
    getRequestHeaders: getRequestHeaders,
    getRequestBody: getRequestBody,
    optionsMethod: optionsMethod,
    notPostMethod: notPostMethod
}