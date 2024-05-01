import "module-alias/register"
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda"
import { User } from "@db/models/User"
import { APIResponse, APIUserCreateRequest } from '../models'
import { DB } from "@utils/db"
import { BadRequestError, MethodNotAllowedError } from "@utils/error-handler/errors"
// Create clients and set shared const values outside of the handler.
import { buildResponse } from '@utils/response'
import { UserManager } from "@root/db/managers/UserManager"
import { handleError } from "@root/utils/error-handler"
import { validateItemData } from "@root/utils/validations"


export const putItemHandler = async function (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    DB.authenticate()
    DB.useModels([User]);
    const result = await putItem(event);
    await DB.closeWithManager();
    return result;
}

/**
 * Receives User data from HTTP post. Check in the DB that there is no user with the same email, 
 * and if it doesnt exist, creates a new user.
 *  * @param event:APIGatewayProxyEvent 
 *      - email:string (PK) from event.body
 *      - surname:string  from event.body
 *      - name:string  from event.body
 *  
 * @returns Error 400 if user already exist 
 *          Error 405 if HTTP method is not POST
 *          Ok 200 on success
 */
export const putItem = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {

    try {
        if (event.httpMethod !== 'POST')
            throw new MethodNotAllowedError("Invalid Method");

        if (!event.body)
            throw new BadRequestError("Invalid Body");

        const userRequest = JSON.parse(`${event.body}`) as APIUserCreateRequest;

        if (!validateItemData(userRequest))
            throw new BadRequestError("Invalid Data");

        const posibleUser = await UserManager.findUser(userRequest.email);

        if (posibleUser) {
            throw new BadRequestError("User exists")
        }

        const newUser = await UserManager.createUser(
            userRequest.email,
            userRequest.name,
            userRequest.surname
        );

        return buildResponse(new APIResponse(newUser));

    } catch (error) {
        return handleError(error)
    }

}


