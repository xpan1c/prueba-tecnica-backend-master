
jest.mock('@utils/db.ts');
jest.mock("@db/models/Company")
jest.mock("@db/models/User", () => {
    const actualUser = jest.requireActual("@db/models/User");
    return {
      ...actualUser,
      User: {
        ...actualUser.User,
        findOne: jest.fn(),
      },
    };
  });
import { StatusCodes } from "http-status-codes";
import { Company } from "../../../src/db/models/Company";
import { User, UserRole } from "../../../src/db/models/User";
import { putCompany } from '@handlers/put-company';
import { constructAPIGwEvent } from "../../utils/helpers";


describe('Test putCompany', function () {

    it('should throw Method Not Allowed Error when method is not POST', async () => {
        const mockEvent = constructAPIGwEvent({}, { method: "GET" });
        const response = await putCompany(mockEvent);
        expect(response.statusCode).toBe(StatusCodes.METHOD_NOT_ALLOWED);
    });

    it('should throw Bad Request Error when body is null', async () => {
        const mockEvent = constructAPIGwEvent(null, { method: "POST" });
        const response = await putCompany(mockEvent);
        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });

    it('should throw Bad Request Error when company data is invalid', async () => {
        const mockEvent = constructAPIGwEvent({ tokenSymbol: "A", tokenName: "" }, { method: 'POST' });
        const response = await putCompany(mockEvent);
        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });

    it('should throw Bad Request Error if user does not exist', async () => {
        User.findOne = jest.fn(() => Promise.resolve(null));
        const mockEvent = constructAPIGwEvent({ userId: "123", tokenSymbol: "ABCD", tokenName: "CompanyX" }, { method: 'POST' });
        const response = await putCompany(mockEvent);
        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });

    it('should throw Bad Request Error if user is not a tokenizer', async () => {
        User.findOne = jest.fn(() => Promise.resolve({ id: "123", role: UserRole.Investor }));
        const mockEvent = constructAPIGwEvent({ userId: "123", tokenSymbol: "ABCD", tokenName: "CompanyX" }, { method: 'POST' });
        const response = await putCompany(mockEvent);
        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });

    it('should throw Bad Request if the company already exists', async () => {
        Company.findOne = jest.fn(() => Promise.resolve(new Company()));
        const mockEvent = constructAPIGwEvent({ userId: "123", tokenSymbol: "ABCD", tokenName: "CompanyX" }, { method: 'POST' });
        const response = await putCompany(mockEvent);
        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    });

    it('should create a new company when all conditions are met', async () => {
        User.findOne = jest.fn(() => Promise.resolve({
            id: "c99c783d-8789-4e89-b5d2-dd95a2e76c26",
            email: 'test1@gmail.com',
            name: 'isNull',
            address: 'notError',
            role: UserRole.Tokenizer,
        }));
        Company.findOne = jest.fn(() => Promise.resolve(null));
        Company.create = jest.fn(() => Promise.resolve(null))
        const mockEvent = constructAPIGwEvent({ userId: "c99c783d-8789-4e89-b5d2-dd95a2e76c26", tokenSymbol: "ABCD", tokenName: "CompanyX" }, { method: 'POST' });
        const response = await putCompany(mockEvent);

        expect(response.statusCode).toBe(StatusCodes.OK);
        expect(Company.create).toHaveBeenCalledWith(expect.objectContaining({
            id: expect.any(String),
            userId: "c99c783d-8789-4e89-b5d2-dd95a2e76c26",
            tokenSymbol: "ABCD",
            tokenName: "CompanyX"
        }));
    });
});
