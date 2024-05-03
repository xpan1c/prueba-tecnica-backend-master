import "module-alias/register"
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda"
import { APIResponse } from '../models'
import { DB } from "@utils/db"
import {  MethodNotAllowedError } from "@utils/error-handler/errors"
import { buildResponse } from '@utils/response'
import { handleError } from "@root/utils/error-handler"
import { Company } from "@root/db/models/Company"
import { User } from "@root/db/models/User"
import { CompanyManager } from "@root/db/managers/CompanyManager"
import { Investment } from "@root/db/models/Investment"
import { Offering } from "@root/db/models/Offering"


export const getAllCompaniesHandler = async function (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    DB.authenticate()
    DB.useModels([ User, Company, Investment, Offering]);
    const result = await getAllCompanies(event);
    await DB.closeWithManager();
    return result;
}

/**
 * Fetches all companies from the database. This function is called within the AWS Lambda handler
 * after ensuring that the HTTP method is GET. If the method is not GET, it throws a MethodNotAllowedError.
 * It then retrieves all companies using the CompanyManager's findAll method and returns them.
 * @param event APIGatewayProxyEvent - The event object from AWS Lambda, used here primarily for method checking.
 * @returns Promise<APIGatewayProxyResult> - A successful response will return an HTTP 200 status with the company data.
 *          If the method is not GET, it will return an HTTP 405 status.
 */
export const getAllCompanies = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    try {
        if (event.httpMethod !== 'GET')
            throw new MethodNotAllowedError("Invalid Method");

        const companies = await CompanyManager.findAll();

        return buildResponse(new APIResponse(companies));

    } catch (error) {
        return handleError(error);
    }
}


