import { Investment } from "../models/Investment";
import { Offering } from "../models/Offering";
import { User, UserRole } from "../models/User";
import { v4 as uuidv4 } from 'uuid';

export class UserManager {


    /**
     * Returns the user with the given email
     * @param email 
     * @returns 
     */
    static async findUserByEmail(email: string): Promise<User> {
        const user = await User.findOne({
            where: {
                email: email
            },
        });
        return user
    }

    static async findUserById(id: string): Promise<User> {
        const user = await User.findOne({
            where: {
                id: id
            },
        });
        return user
    }
    static async findAllInvestorsByCompanyId(companyId: string): Promise<User[]> {
        const investors = await User.findAll({
            include: [{
                model: Investment,
                required: true,
                attributes: [],
                include: [{
                    model: Offering,
                    required: true,
                    where: { companyId },
                    attributes: []
                }]
            }],
            where: {
                role: UserRole.Investor
            },
            attributes: ['id', 'name', 'email', 'address']
        });
        const plainInvestors = investors.map(investor => investor.get({ plain: true }))
        return plainInvestors;
    }


    /**
   * Creates a user. If the a user with the same email already exist, it will throw an error
   * @param email user email
   * @param name  user name
   * @param surname   user surname
   * @returns Returns the new user
   */
    static async createUser(
        email: string,
        name: string,
        address: string,
        role: UserRole
    ): Promise<User> {

        return await User.create({
            id: uuidv4(),
            name: name,
            address: address,
            email: email,
            role: role
        });
    }

}
