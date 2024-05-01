import {
    Table,
    Column,
    PrimaryKey,
    AutoIncrement,
    UpdatedAt,
    Model,
    CreatedAt,
  } from "sequelize-typescript";
  @Table({ tableName: "users", schema: "public" , timestamps: true})
  export class User extends Model<User> {
 
    @PrimaryKey
    @Column
    email: string;

    @Column
    name!: string;
  
    @Column
    surname!: string;
  
  }