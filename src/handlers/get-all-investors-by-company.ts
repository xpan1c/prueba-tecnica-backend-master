import "module-alias/register"
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda"
import { APIResponse } from '../models'
import { DB } from "@utils/db"
import {  BadRequestError, MethodNotAllowedError } from "@utils/error-handler/errors"
import { buildResponse } from '@utils/response'
import { handleError } from "@root/utils/error-handler"
import { Company } from "@root/db/models/Company"
import { User } from "@root/db/models/User"
import { Investment } from "@root/db/models/Investment"
import { UserManager } from "@root/db/managers/UserManager"
import { Offering } from "@root/db/models/Offering"


export const getAllInvestorsByCompanyHandler = async function (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    DB.authenticate()
    DB.useModels([ User, Company, Investment, Offering]);
    const result = await getAllInvestorsByCompany(event);
    await DB.closeWithManager();
    return result;
}

/**
 * Receives User data from HTTP post. Check in the DB that there is no user with the same email, 
 * and if it doesnt exist, creates a new user
 * @param event APIGatewayProxyEvent containing the company details in the body.
 *  - tokenSymbol: string from event.body  
 *  - tokenName: string from event.body  
 * @returns APIGatewayProxyResult with status 400 if the company exists, 
 *          405 if the method is not POST, 
 *          or 200 with the new company details on success.
 */
export const getAllInvestorsByCompany = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    try {
        if (event.httpMethod !== 'GET')
            throw new MethodNotAllowedError("Invalid Method");

        const companyId = event.pathParameters?.id;
        if (!companyId) {
            throw new BadRequestError("Company ID must be provided.");
        }
        const investors = await UserManager.findAllInvestorsByCompanyId(companyId);

        return buildResponse(new APIResponse(investors));

    } catch (error) {
        return handleError(error);
    }
}


