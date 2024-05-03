import "module-alias/register"
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
} from "aws-lambda"
import {  APIOfferingCreateRequest, APIResponse } from '../models'
import { DB } from "@utils/db"
import { BadRequestError, MethodNotAllowedError } from "@utils/error-handler/errors"
import { buildResponse } from '@utils/response'
import { handleError } from "@root/utils/error-handler"
import {  validateOfferingData } from "@root/utils/validations"
import { OfferingManager } from "@root/db/managers/OfferingManager"
import { Offering } from "@root/db/models/Offering"
import { Company } from "@root/db/models/Company"
import { User } from "@root/db/models/User"


export const putOfferingHandler = async function (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    DB.authenticate()
    DB.useModels([Offering, Company, User ]);
    const result = await putOffering(event);
    await DB.closeWithManager();
    return result;
}

/**
 * Handles the creation of a new offering via HTTP POST. 
 * Validates that no current offering is linked to the same company ID provided in the request body.
 * Creates a new offering if validation passes.
 *
 * @param event APIGatewayProxyEvent containing the offering details in the body, including:
 *  - companyId: string (from event.body, ID of the company linked to the offering)
 *  - startDate: string (from event.body, start date of the offering)
 *  - endDate: string (from event.body, end date of the offering)
 *  - totalTokens: number (from event.body, total tokens available for this offering)
 *  - tokenPrice: number (from event.body, price per token in USD)
 *  - minInvestment: number (from event.body, minimum investment amount in USD)
 *  - maxInvestment: number (from event.body, maximum investment amount in USD)
 *  - offeringStatus: string (from event.body, current status of the offering)
 *
 * @returns APIGatewayProxyResult with status 400 if an existing offering is already linked to the provided company ID, 
 *          405 if the method is not POST,
 *          or 200 with the details of the newly created offering on success.
 */
export const putOffering = async (
    event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
    try {
        if (event.httpMethod !== 'POST')
            throw new MethodNotAllowedError("Invalid Method");

        if (!event.body)
            throw new BadRequestError("No data provided in the request body.");

        const offeringRequest = JSON.parse(`${event.body}`) as APIOfferingCreateRequest;
        offeringRequest.startDate = new Date(offeringRequest.startDate)
        offeringRequest.endDate = new Date(offeringRequest.endDate)
        if (!validateOfferingData(offeringRequest))
            throw new BadRequestError("Invalid or incomplete offering data provided.");
        const existingOffering = await OfferingManager.findOfferingByCompanyId(offeringRequest.companyId);

        if (existingOffering) {
            throw new BadRequestError("An offering only can be bound to a company.");
        }

        const newOffering = await OfferingManager.createOffering(
            offeringRequest
        );

        return buildResponse(new APIResponse(newOffering));

    } catch (error) {
        return handleError(error);
    }
}


