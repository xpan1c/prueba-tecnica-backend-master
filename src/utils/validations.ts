import { OfferingStatus } from "@root/db/models/Offering";
import { UserRole } from "@root/db/models/User";
import { APICompanyCreateRequest, APIInvestmentCreateRequest, APIOfferingCreateRequest, APIUserCreateRequest } from "@root/models";
import { bool } from "aws-sdk/clients/signer";
import { validate as validateUUID } from 'uuid';
/* Validation functions */

export function validateItemData(data: APIUserCreateRequest): boolean {
    return !!data?.name && !!data?.address && !!data?.email && !!data?.role;
}
export function validateCompanyData(data: APICompanyCreateRequest): boolean {

    if (data.tokenSymbol.length < 2 || data.tokenSymbol.length > 5) {
        return false;
    }

    if (data.tokenName.trim().length === 0) {
        return false;
    }

    if (!data.userId || !validateUUID(data.userId)) {
        return false;
    }

    return true;
}

export function validateUserData(data: APIUserCreateRequest): boolean {
    if (!data.name || data.name.trim().length === 0) {
        return false;
    }

    if (!data.email || data.email.trim().length === 0 || !/\S+@\S+\.\S+/.test(data.email)) {
        return false;
    }

    if (!data.address || data.address.trim().length === 0) {
        return false;
    }

    if (!data.role || !Object.values(UserRole).includes(data.role)) {
        return false;
    }

    return true;

}

export function validateOfferingData(data: APIOfferingCreateRequest): boolean {

    const { startDate, endDate, totalTokens, tokenPrice, minInvestment, maxInvestment, status } = data;

    if (!(startDate instanceof Date) || !(endDate instanceof Date) || endDate <= startDate || (endDate.getTime() - startDate.getTime()) > (365 * 24 * 60 * 60 * 1000)) {
        return false;
    }

    if (totalTokens <= 0 || tokenPrice <= 0 || minInvestment <= 0 || maxInvestment <= 0) {
        return false;
    }

    if (minInvestment > maxInvestment) {
        return false;
    }

    if (!Object.values(OfferingStatus).includes(status)) {
        return false;
    }

    return true;
}

export function validateInvestmentData(data: APIInvestmentCreateRequest): boolean {
    const { userId, offeringId, amount } = data;

    if (!validateUUID(userId) || !validateUUID(offeringId)) {
        return false;
    }

    if (amount <= 0 ) {
        return false;
    }

    return true;
}