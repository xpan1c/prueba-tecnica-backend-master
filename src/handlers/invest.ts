import "module-alias/register"
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda"
import { APIInvestmentCreateRequest, APIResponse } from '../models'
import { DB } from "@utils/db"
import { BadRequestError, MethodNotAllowedError } from "@utils/error-handler/errors"
// Create clients and set shared const values outside of the handler.
import { buildResponse } from '@utils/response'
import { handleError } from "@root/utils/error-handler"
import {  validateInvestmentData } from "@root/utils/validations"
import { Company } from "@root/db/models/Company"
import { User, UserRole } from "@root/db/models/User"
import { UserManager } from "@root/db/managers/UserManager"
import { Investment } from "@root/db/models/Investment"
import { Offering } from "@root/db/models/Offering"
import { InvestmentManager } from "@root/db/managers/InvesmentManager"
import { OfferingManager } from "@root/db/managers/OfferingManager"


export const investHandler = async function (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    DB.authenticate()
    DB.useModels([Investment, Offering, User, Company]);
    const result = await invest(event);
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
export const invest = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    try {
        if (event.httpMethod !== 'POST')
            throw new MethodNotAllowedError("Invalid Method");

        if (!event.body)
            throw new BadRequestError("No data provided in the request body.");

        const investmentRequest = JSON.parse(`${event.body}`) as APIInvestmentCreateRequest;

        if (!validateInvestmentData(investmentRequest))
            throw new BadRequestError("Invalid or incomplete company data provided.");

        const posibleUser = await UserManager.findUserById(investmentRequest.userId)
        if (!posibleUser) {
            throw new BadRequestError("User does not exist");
        }
        if (posibleUser.role !== UserRole.Investor) throw new BadRequestError("Only Investor users can own invest");

        const posibleOffering = await OfferingManager.findOfferingById(investmentRequest.offeringId)
        if (!posibleOffering) {
            throw new BadRequestError("Offering does not exist");
        }

        const newInvest = await InvestmentManager.createInvestment(investmentRequest);

        return buildResponse(new APIResponse(newInvest));

    } catch (error) {
        return handleError(error);
    }
}


