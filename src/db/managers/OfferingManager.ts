import { v4 as uuidv4 } from 'uuid';
import { Offering } from "../models/Offering";
import { APIOfferingCreateRequest } from "@root/models";

export class OfferingManager {

    /**
     * Searches for an offering by the company ID.
     * @param companyId The unique identifier of the company associated with the offering.
     * @returns Returns the offering associated with the given company ID, or null if no offering is found.
     */
    static async findOfferingByCompanyId(companyId: string): Promise<Offering | null> {
        return await Offering.findOne({
            where: {
                companyId
            },
        });
    }

     /**
     * Searches for an offering by the offering ID.
     * @param id The unique identifier of the offering.
     * @returns Returns the offering associated with the given ID, or null if no offering is found.
     */
     static async findOfferingById(id: string): Promise<Offering | null> {
        return await Offering.findOne({
            where: {
                id
            },
        });
    }

    /**
     * Creates a new offering. Checks if there is already an offering for the given company.
     * If an offering exists, it throws an error to prevent duplicate offerings for the same company.
     * @param data The data needed to create a new offering, extracted from APIOfferingCreateRequest.
     * @returns Returns the newly created offering.
     */
    static async createOffering(
        data: APIOfferingCreateRequest
    ): Promise<Offering> {
        const { companyId, endDate, maxInvestment, minInvestment, startDate, status, tokenPrice, totalTokens } = data
        const existingCompany = await this.findOfferingByCompanyId(data.companyId);
        if (existingCompany) {
            throw new Error(`An offering with a company already exists.`);
        }

        return await Offering.create({
            id: uuidv4(),
            companyId,
            endDate, 
            maxInvestment, 
            minInvestment, 
            startDate, 
            status, 
            tokenPrice, 
            totalTokens
        });
    }
}
