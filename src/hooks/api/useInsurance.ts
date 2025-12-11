import { useQuery } from '@tanstack/react-query';
import { insuranceService } from '@/services/insurance.service';
import { InsuranceWithClaim } from '@/types/insurance';
import { useMemo } from 'react';

// Query keys for insurance-related queries
export const insuranceKeys = {
  all: ['insurance'] as const,
  myInsurances: () => [...insuranceKeys.all, 'myInsurances'] as const,
  myClaims: () => [...insuranceKeys.all, 'myClaims'] as const,
};

/**
 * Hook to fetch user's insurances
 */
export const useMyInsurances = () => {
  return useQuery({
    queryKey: insuranceKeys.myInsurances(),
    queryFn: insuranceService.getMyInsurances,
  });
};

/**
 * Hook to fetch user's claims
 */
export const useMyClaims = () => {
  return useQuery({
    queryKey: insuranceKeys.myClaims(),
    queryFn: insuranceService.getMyClaims,
  });
};

/**
 * **IDEAL SOLUTION: Merge data in the hook layer**
 *
 * This hook fetches both insurances and claims in parallel,
 * then merges them to compute remainingSum.
 *
 * Benefits:
 * - Component stays clean and focused on UI
 * - Data merging logic is reusable
 * - React Query handles caching for both endpoints
 * - Automatic loading/error state coordination
 * - Single source of truth for derived data
 */
export const useInsuranceWithClaims = () => {
  // Fetch both APIs in parallel
  const insurancesQuery = useMyInsurances();
  const claimsQuery = useMyClaims();

  // Merge data using useMemo for performance
  const mergedData = useMemo<InsuranceWithClaim[] | undefined>(() => {
    if (!insurancesQuery.data || !claimsQuery.data) {
      return undefined;
    }

    // Create a map of claims by insuranceId for O(1) lookup
    const claimsMap = new Map(
      claimsQuery.data.map((claim) => [claim.insuranceId, claim.claimedAmount])
    );

    // Merge insurances with claims
    return insurancesQuery.data.map((insurance) => {
      const claimedAmount = claimsMap.get(insurance.insuranceId) ?? 0;
      return {
        ...insurance,
        claimedAmount,
        remainingSum: insurance.insuredSum - claimedAmount,
      };
    });
  }, [insurancesQuery.data, claimsQuery.data]);

  // Combine loading states - loading if ANY query is loading
  const isLoading = insurancesQuery.isLoading || claimsQuery.isLoading;

  // Combine error states - error if ANY query has error
  const error = insurancesQuery.error || claimsQuery.error;

  // Both queries succeeded
  const isSuccess = insurancesQuery.isSuccess && claimsQuery.isSuccess;

  return {
    data: mergedData,
    isLoading,
    error,
    isSuccess,
    // Expose individual queries for advanced use cases
    insurancesQuery,
    claimsQuery,
  };
};
