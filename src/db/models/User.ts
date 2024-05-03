import {
  Table,
  Column,
  PrimaryKey,
  Model,
  DataType,
  HasMany,
} from "sequelize-typescript";
import { Investment } from "./Investment";

export enum UserRole {
  Tokenizer = "TOKENIZER",
  Investor = "INVESTOR"
}

@Table({ tableName: "users", timestamps: false })
export class User extends Model<User> {

  @PrimaryKey
  @Column
  id!: string;

  @Column
  name!: string;

  @Column
  email!: string;

  @Column
  address!: string;

  @Column({ type: DataType.ENUM(UserRole.Tokenizer, UserRole.Investor) })
  role!: UserRole;

  @HasMany(() => Investment)
  investments?: Investment[];
}