import { UserRole } from "@root/db/models/User"

export class APIEmptyResponse {}
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
  name: string
  email:string
  address: string
  role: UserRole
}