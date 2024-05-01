import { Table, Column, PrimaryKey, ForeignKey, BelongsTo, Model } from "sequelize-typescript";
import { User } from "./User";
import { Offering } from "./Offering";

@Table({ tableName: "investments", timestamps: false })
export class Investment extends Model<Investment> {
  @PrimaryKey
  @Column
  id!: string;

  @ForeignKey(() => User)
  @Column({field: "user_id"})
  userId!: string;

  @ForeignKey(() => Offering)
  @Column({field: "offering_id"})
  offeringId!: string;

  @Column
  amount!: number;

  @Column({field: "tokens_purchased"})
  tokensPurchased!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Offering)
  offering!: Offering;
}
