import "module-alias/register"
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda"
import { APICompanyCreateRequest, APIResponse } from '../models'
import { DB } from "@utils/db"
import { BadRequestError, MethodNotAllowedError } from "@utils/error-handler/errors"
// Create clients and set shared const values outside of the handler.
import { buildResponse } from '@utils/response'
import { handleError } from "@root/utils/error-handler"
import { validateCompanyData } from "@root/utils/validations"
import { Company } from "@root/db/models/Company"
import { CompanyManager } from "@root/db/managers/CompanyManager"
import { User, UserRole } from "../db/models/User"
import { UserManager } from "@root/db/managers/UserManager"
import { Investment } from "@root/db/models/Investment"
import { Offering } from "@root/db/models/Offering"


export const putCompanyHandler = async function (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    DB.authenticate()
    DB.useModels([Company, User, Investment, Offering]);
    const result = await putCompany(event);
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
export const putCompany = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    try {
        if (event.httpMethod !== 'POST')
            throw new MethodNotAllowedError("Invalid Method");

        if (!event.body)
            throw new BadRequestError("No data provided in the request body.");

        const companyRequest = JSON.parse(`${event.body}`) as APICompanyCreateRequest;

        if (!validateCompanyData(companyRequest))
            throw new BadRequestError("Invalid or incomplete company data provided.");

        const posibleUser = await UserManager.findUserById(companyRequest.userId)
        if (!posibleUser) {
            throw new BadRequestError("User does not exist");
        }
        if (posibleUser && posibleUser.role && posibleUser.role !== UserRole.Tokenizer) throw new BadRequestError("Only Tokenizer users can own a company");
        
        const existingCompanyByUserId = await CompanyManager.findCompanyByUserId(companyRequest.userId)

        if(existingCompanyByUserId) throw new BadRequestError("A user can only have one company")

        const existingCompany = await CompanyManager.findCompanyBySymbol(companyRequest.tokenSymbol);

        if (existingCompany) {
            throw new BadRequestError("A company with the given token symbol already exists.");
        }

        const newCompany = await CompanyManager.createCompany(
            companyRequest.userId,
            companyRequest.tokenSymbol,
            companyRequest.tokenName
        );

        return buildResponse(new APIResponse(newCompany));

    } catch (error) {
        return handleError(error);
    }
}


