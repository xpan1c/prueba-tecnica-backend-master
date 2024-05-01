import { APIUserCreateRequest } from "@root/models";
import { bool } from "aws-sdk/clients/signer";
/* Validation functions */

export function validateItemData(data: APIUserCreateRequest): boolean {
    return !!data?.name && !!data?.surname && !!data?.email;
}