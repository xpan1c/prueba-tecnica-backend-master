export class User {
  public static findAll(config: Record<string,any>): Promise<User[]> {
    return import("./users_mock.json").then(usersJson => usersJson.users)
  }

  public static findByPk(email: string): Promise<User> {
    return import("./users_mock.json").then(usersJson => usersJson.users.filter(user => user.email==email)[0]); 
  }

  public static findOne(config: Record<string, any>): Promise<User|null> {
    return config.where.name !== "isNull" ? import("./users_mock.json").then((usersJson) => usersJson.user) : Promise.resolve(null)
  }

  public static create(model: Record<string, any>): Promise<User> {
    if (model.surname === "isError")  {
      return Promise.reject(new Error("mock error"))
    }
    return Promise.resolve(model)
  }
}