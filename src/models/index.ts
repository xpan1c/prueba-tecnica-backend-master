import { OfferingStatus } from "@root/db/models/Offering"
import { UserRole } from "@root/db/models/User"

export class APIEmptyResponse { }
export class APIResponse<T> {
  data: T
  constructor(data: T) {
    this.data = data
  }
}
export class APIErrorResponse {
  message: string
  constructor(message: string) {
    this.message = message
  }
}
export type APIUserCreateRequest = {
  name: string;
  email: string;
  address: string;
  role: UserRole;
}

export type APICompanyCreateRequest = {
  userId: string;
  tokenSymbol: string;
  tokenName: string;
}

export type APIOfferingCreateRequest = {
  companyId: string;
  startDate: Date;
  endDate: Date;
  totalTokens: number;
  tokenPrice: number;
  minInvestment: number;
  maxInvestment: number;
  status: OfferingStatus;
}

export type APIInvestmentCreateRequest = {
  userId: string;
  offeringId: string;
  amount: number;
}