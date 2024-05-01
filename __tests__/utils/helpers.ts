import { APIGatewayProxyEvent, SQSEvent } from "aws-lambda";

const DEFAULT_OPTIONS = { method: "GET", headers: {}, query: {}, path: "/" }
 

export function constructAPIGwEvent(
  message: any,
  options: Partial<APIGatewayProxyEvent & {
    method: string, headers: Record<string, string>, path: string
  }> = DEFAULT_OPTIONS, authorizer?, isBodyString?: boolean): APIGatewayProxyEvent {
  const opts = Object.assign({}, DEFAULT_OPTIONS, options);
  return {
    httpMethod: opts.method,
    path: opts.path,
    queryStringParameters: opts.queryStringParameters || opts.query,
    headers: opts.headers,
    body: opts.body || (message && !isBodyString) ? JSON.stringify(message) : message,
    multiValueHeaders: {},
    multiValueQueryStringParameters: {},
    isBase64Encoded: false,
    pathParameters: opts.pathParameters || {},
    stageVariables: {},
    requestContext: {
      ...opts.requestContext,
      accountId: 'asda',
      apiId: 'afdsd',
      authorizer: authorizer ? authorizer : {},
      protocol: 'https',
      httpMethod: 'GET',
      identity: {
        accessKey: null,
        accountId: null,
        apiKey: null,
        apiKeyId: null,
        clientCert: null,
        caller: null,
        cognitoAuthenticationProvider: null,
        cognitoAuthenticationType: null,
        cognitoIdentityId: null,
        cognitoIdentityPoolId: null,
        principalOrgId: null,
        sourceIp: 'null',
        user: null,
        userAgent: null,
        userArn: null,
      },
      path: 'any',
      stage: 'asdasda',
      requestId: 'anyas',
      requestTimeEpoch: 451,
      resourceId: 'asdasd',
      resourcePath: 'asdada',
    },
    resource: 'null',
  }
}