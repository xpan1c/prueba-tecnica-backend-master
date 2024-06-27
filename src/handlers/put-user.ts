import { UserManager } from "../db/managers/UserManager";
import { User } from "../db/models/User";
import { APIResponse, APIUserCreateRequest } from "../models";
import { DB } from "../utils/db";
import { handleError } from "../utils/error-handler";
import { MethodNotAllowedError, BadRequestError } from "../utils/error-handler/errors";
import { buildResponse } from "../utils/response";
import { validateUserData } from "../utils/validations";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { Offering } from "@root/db/models/Offering";
import { Company } from "@root/db/models/Company";
import { Investment } from "@root/db/models/Investment";


export const putUserHandler = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    DB.authenticate();
    DB.useModels([User, Investment, Offering,Company]);
    const result = await putUser(event);
    await DB.closeWithManager();
    return result;
};

/**
 * Handles HTTP requests to create new users. It verifies the request method, parses and validates user data,
 * checks for existing users with the same email, and creates a new user if all validations pass.
 * @param event APIGatewayProxyEvent containing the user details in the body.
 *   - name: string from event.body
 *   - email: string from event.body
 *   - address: string from event.body
 *   - role: UserRole from event.body
 * @returns APIGatewayProxyResult with status 400 if user data is invalid or user already exists,
 *          status 405 if the HTTP method is not POST,
 *          or status 200 with the new user details on success.
 */
export const putUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        if (event.httpMethod !== 'POST') {
            throw new MethodNotAllowedError("Invalid Method - This endpoint only supports POST requests.");
        }

        if (!event.body) {
            throw new BadRequestError("No data provided in the request body.");
        }

        const userRequest = JSON.parse(event.body) as APIUserCreateRequest;
        if (!validateUserData(userRequest)) {
            throw new BadRequestError("Invalid or incomplete user data provided.");
        }

        const posibleUser = await UserManager.findUserByEmail(userRequest.email)

        if (posibleUser) {
            throw new BadRequestError("User exists")
        }

        const newUser = await UserManager.createUser(userRequest.email, userRequest.name, userRequest.address, userRequest.role
        );

        return buildResponse(new APIResponse(newUser));

    } catch (error) {
        return handleError(error);
    }
};