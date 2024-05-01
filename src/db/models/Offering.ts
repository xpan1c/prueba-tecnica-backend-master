import { Table, Column, PrimaryKey, ForeignKey, BelongsTo, Model, DataType } from "sequelize-typescript";
import { Company } from "./Company";

export enum OfferingStatus {
  Scheduled = "SCHEDULED",
  Ongoing = "ONGOING",
  Finished = "FINISHED"
}

@Table({ tableName: "offerings", schema: "public", timestamps: false })
export class Offering extends Model<Offering> {
  @PrimaryKey
  @Column
  id!: string;

  @ForeignKey(() => Company)
  @Column({field: "company_id"})
  companyId!: string;

  @Column({field: "start_date"})
  startDate!: Date;

  @Column({field: "end_date"})
  endDate!: Date;

  @Column({field: "total_tokens"})  
  totalTokens!: number;

  @Column({field: "token_price"})
  tokenPrice!: number;

  @Column({field: "min_investment"})
  minInvestment!: number;

  @Column({field: "max_investment"})
  maxInvestment!: number;

  @Column({ type: DataType.ENUM(OfferingStatus.Scheduled, OfferingStatus.Ongoing, OfferingStatus.Finished) })
  status!: OfferingStatus;

  @BelongsTo(() => Company)
  company!: Company;

}
