export interface Insurance {
  insuranceId: string;
  name: string;
  insuredSum: number;
}

export interface Claim {
  insuranceId: string;
  claimedAmount: number;
}

export interface InsuranceWithClaim extends Insurance {
  claimedAmount: number;
  remainingSum: number;
}
