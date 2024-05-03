import { Company } from "@db/models/Company";
import { v4 as uuidv4 } from 'uuid';

export class CompanyManager {

    /**
     * Returns the company with the given token symbol.
     * @param tokenSymbol The unique token symbol of the company.
     * @returns Returns the company found or null if no company is found.
     */
    static async findCompanyBySymbol(tokenSymbol: string): Promise<Company | null> {
        return await Company.findOne({
            where: {
                tokenSymbol
            },
        });
    }

    static async findCompanyByUserId(userId: string): Promise<Company | null> {
        return await Company.findOne({
            where: {
                userId
            },
        });
    }

    static async findAll(): Promise<Company[]> {
        return await Company.findAll({});
    }

    /**
     * Creates a new company. If a company with the same token symbol already exists, it will throw an error.
     * @param tokenSymbol The unique token symbol for the company.
     * @param tokenName The name of the token issued by the company.
     * @returns Returns the newly created company.
     */
    static async createCompany(
        userId: string,
        tokenSymbol: string,
        tokenName: string
    ): Promise<Company> {
        return await Company.create({
            id: uuidv4(),
            userId,
            tokenSymbol,
            tokenName
        });
    }
}
