import { Table, Column, PrimaryKey, Model, BelongsTo, ForeignKey } from "sequelize-typescript";
import { User } from "./User";

@Table({ tableName: "companies", timestamps: false })
export class Company extends Model<Company> {
  @PrimaryKey
  @Column
  id!: string;

  @ForeignKey(() => User)
  @Column({field: "user_id"})
  userId!: string;
  
  @Column({field: "token_symbol"})
  tokenSymbol!: string;

  @Column({field: "token_name"})
  tokenName!: string;
  
  @BelongsTo(() => User)
  user!: User;
}
