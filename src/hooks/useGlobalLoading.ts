import { useIsFetching, useIsMutating } from '@tanstack/react-query';

/**
 * Global loading hook using React Query's built-in tracking
 * Tracks all active queries and mutations
 */
export const useGlobalLoading = () => {
  const isFetching = useIsFetching(); // Tracks all queries (GET)
  const isMutating = useIsMutating(); // Tracks all mutations (POST/PUT/DELETE)
  // We are using react-query only for data fetching and mutations so this is sufficient.
  // However later if we use any other ways to fetch data, we can add their tracking here and our global loading will still work.

  return isFetching > 0 || isMutating > 0;
};

/**
 * Track specific queries by key
 */
export const useQueryLoading = (queryKey?: unknown[]) => {
  const isFetching = useIsFetching({ queryKey });
  return isFetching > 0;
};

/**
 * Track specific mutations by key
 */
export const useMutationLoading = (mutationKey?: unknown[]) => {
  const isMutating = useIsMutating({ mutationKey });
  return isMutating > 0;
};
