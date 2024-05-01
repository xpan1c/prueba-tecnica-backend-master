import { User, UserRole } from "@db/models/User";

export class UserManager {


    /**
     * Returns the user with the given email
     * @param email 
     * @returns 
     */
    static async findUser(email: string): Promise<User> {
        return await User.findOne({
            where: {
                email: email
            },
        });
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
            name: name,
            address: address,
            email: email,
            role: role
        });
    }
    
}
