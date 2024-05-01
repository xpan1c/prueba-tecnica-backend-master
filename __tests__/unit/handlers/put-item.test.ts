jest.mock('@utils/db.ts')
jest.mock("@db/models/User")
import { StatusCodes } from "http-status-codes"
import { User } from "@db/models/User"
// Import all functions from put-item.js 
import { putItem } from '@handlers/put-item'
import { constructAPIGwEvent } from "../../utils/helpers"


describe('Test putItem', function () { 
    it('should throw Method Not Allowed Error when methods is not POST', async () => {
        const mockEvent = constructAPIGwEvent({name: 'Test', surname: 'test'}, {method: "GET"})
        const response = await putItem(mockEvent)
        expect(response.statusCode).toBe(StatusCodes.METHOD_NOT_ALLOWED)

    })
    it('should throw Bad Request Error when body is null', async () => {
        const mockEvent = constructAPIGwEvent(0, {method: "POST"})
        const response = await putItem(mockEvent)
        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST)
    })
    it('should throw Bad Request when user exists', async () => {
        const mockEvent = constructAPIGwEvent({
            name: 'test',
            surname: 'test',
            email: 'test1@gmail.com'
        }, { method: 'POST'})
        const response = await putItem(mockEvent)
        expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST)
        expect(response.body).toMatch(/user exists/i)
    })

    it('should call findOne with email and create new user', async () => {
        User.findOne = jest.fn(() => Promise.resolve(null))
        User.create = jest.fn(() => Promise.resolve(null))

        const mockEvent = constructAPIGwEvent({
            name: "isNull",
            surname: 'notError',
            email: 'test1@gmail.com'
        }, {method: 'POST'})
        const response = await putItem(mockEvent)

        expect(response.statusCode).toBe(StatusCodes.OK)
        expect(User.findOne).toHaveBeenCalledTimes(1)
        expect(User.findOne).toHaveBeenCalledWith(...[{where: {
            email: 'test1@gmail.com'
        }}])

        expect(User.create).toHaveBeenCalledTimes(1)
        expect(User.create).toHaveBeenCalledWith(...[{
            email: 'test1@gmail.com',
            name: 'isNull',
            surname: 'notError'
        }])

    })
   
   
}); 
 