import { APIInvestmentCreateRequest } from "@root/models";
import { Offering } from "../models/Offering";
import { Investment } from "../models/Investment";
import { v4 as uuidv4 } from 'uuid';

export class InvestmentManager {
    /**
     * Creates a new investment if it adheres to the offering constraints.
     * @param data Data for creating the investment.
     * @returns The newly created investment.
     */
    static async createInvestment(data: APIInvestmentCreateRequest): Promise<Investment> {
        const { userId, offeringId, amount } = data;

        const offering = await Offering.findByPk(offeringId);
        if (!offering || offering.status !== 'ONGOING') {
            throw new Error("The offering is not valid or not ongoing.");
        }
        
        const totalInvestment = await Investment.sum('amount', {
            where: { userId, offeringId }
        });

        if (amount < offering.minInvestment) {
            throw new Error("Investment amount is below the minimum allowed for this offering.");
        }
        
        if (totalInvestment + amount > offering.maxInvestment) {
            throw new Error("Investment exceeds maximum allowed for this offering.");
        }

        const tokensPurchased = amount / offering.tokenPrice

        return await Investment.create({
            id: uuidv4(),
            userId,
            offeringId,
            amount,
            tokensPurchased
        });
    }
}
