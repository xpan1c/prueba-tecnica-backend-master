// Importing necessary modules and mocking them as necessary
import { StatusCodes } from "http-status-codes";
import { constructAPIGwEvent } from "../../utils/helpers";
import { Company } from "../../../src/db/models/Company";
import { getAllCompanies } from '../../../src/handlers/get-all-companies';
import { APIGatewayProxyEvent } from "aws-lambda";

jest.mock("@db/models/Company")


describe('Test getAllCompaniesHandler', function () {
    
    let mockEvent: APIGatewayProxyEvent;
    beforeEach(() => {
        mockEvent = constructAPIGwEvent(null, { method: 'GET' });
        jest.clearAllMocks();
    });
    it('should handle GET requests correctly', async () => {
        const mockCompanies = [
            { id: '042d6b79-ef9a-4b6f-bb75-a4e123647494', userId: 'a419dca3-675b-41d7-b279-ccca04792c8e', tokenSymbol: 'SYM1', tokenName: 'Name1'},
            { id: '60a3832d-596f-4cb5-a476-630278c2269e', userId: '4c2effa3-ea94-47d6-875d-e6f8c6480045', tokenSymbol: 'SYM2', tokenName: 'Name2'}
        ];
        Company.findAll = jest.fn().mockResolvedValue(mockCompanies);
        const response = await getAllCompanies(mockEvent)

        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(JSON.parse(response.body).data).toEqual(mockCompanies);
        expect(Company.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return MethodNotAllowedError for non-GET requests', async () => {
        mockEvent.httpMethod = 'POST';
        const response = await getAllCompanies(mockEvent)

        expect(response.statusCode).toBe(StatusCodes.METHOD_NOT_ALLOWED);
        expect(JSON.parse(response.body).message).toMatch(/Invalid Method/i);
    });

    it('should handle database errors gracefully', async () => {
        Company.findAll = jest.fn().mockRejectedValue(new Error("Database failure"));
        const response = await getAllCompanies(mockEvent);

        expect(response.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(JSON.parse(response.body).message).toMatch(/Database failure/);
    });
    it('should return an empty array when no companies are found', async () => {
        Company.findAll = jest.fn().mockResolvedValue([]);
        const response = await getAllCompanies(mockEvent);

        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(JSON.parse(response.body).data).toEqual([]);
    });
});
