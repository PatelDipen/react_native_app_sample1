import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  QueryKey,
} from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

/**
 * Custom wrapper around useQuery with logging and tracking capabilities
 *
 * Benefits:
 * - Centralized logging for all queries
 * - Performance tracking
 * - Custom analytics integration
 * - Debug information in development
 */
export const useCustomQuery = <
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
) => {
  const startTimeRef = useRef<number>(Date.now());

  const query = useQuery(options);

  // Log query lifecycle
  useEffect(() => {
    if (__DEV__) {
      const queryKey = JSON.stringify(options.queryKey);

      if (query.isFetching) {
        console.log(`🔄 [Query] Fetching: ${queryKey}`);
        startTimeRef.current = Date.now();
      }

      if (query.isSuccess && !query.isFetching) {
        const duration = Date.now() - startTimeRef.current;
        console.log(`✅ [Query] Success: ${queryKey} (${duration}ms)`);
      }

      if (query.isError) {
        const duration = Date.now() - startTimeRef.current;
        console.error(`❌ [Query] Error: ${queryKey} (${duration}ms)`, query.error);
      }
    }
  }, [query.isFetching, query.isSuccess, query.isError, query.error, options.queryKey]);

  // Track query in custom loading store if needed
  useEffect(() => {
    // You can integrate with a custom loading store here
    // Example: loadingStore.setQueryLoading(queryKey, query.isFetching);
  }, [query.isFetching]);

  return query;
};

/**
 * Custom wrapper around useMutation with logging and tracking capabilities
 *
 * Benefits:
 * - Centralized logging for all mutations
 * - Performance tracking
 * - Custom analytics integration
 * - Debug information in development
 */
export const useCustomMutation = <
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
) => {
  const startTimeRef = useRef<number>(0);
  const mutationNameRef = useRef<string>(
    options.mutationKey ? JSON.stringify(options.mutationKey) : 'anonymous-mutation'
  );

  const mutation = useMutation({
    ...options,
    onMutate: async (variables, mutationContext) => {
      if (__DEV__) {
        startTimeRef.current = Date.now();
        console.log(`🚀 [Mutation] Started: ${mutationNameRef.current}`, variables);
      }

      // Call original onMutate if exists and return its result
      if (options.onMutate) {
        return await options.onMutate(variables, mutationContext);
      }

      // Return undefined as TContext if no onMutate provided
      return undefined as TContext;
    },
    onSuccess: (data, variables, context, mutationContext) => {
      if (__DEV__) {
        const duration = Date.now() - startTimeRef.current;
        console.log(`✅ [Mutation] Success: ${mutationNameRef.current} (${duration}ms)`);
      }

      // Call original onSuccess if exists
      options.onSuccess?.(data, variables, context, mutationContext);
    },
    onError: (error, variables, context, mutationContext) => {
      if (__DEV__) {
        const duration = Date.now() - startTimeRef.current;
        console.error(`❌ [Mutation] Error: ${mutationNameRef.current} (${duration}ms)`, error);
      }

      // Call original onError if exists
      options.onError?.(error, variables, context, mutationContext);
    },
  });

  // Track mutation in custom loading store if needed
  useEffect(() => {
    // You can integrate with a custom loading store here
    // Example: loadingStore.setMutationLoading(mutationName, mutation.isPending);
  }, [mutation.isPending]);

  return mutation;
};

/**
 * Example: Custom loading store integration (optional)
 *
 * You can create a Zustand store to track all query/mutation loading states:
 *
 * ```typescript
 * const useLoadingStore = create<{
 *   activeQueries: Set<string>;
 *   activeMutations: Set<string>;
 *   setQueryLoading: (key: string, loading: boolean) => void;
 *   setMutationLoading: (key: string, loading: boolean) => void;
 * }>((set) => ({
 *   activeQueries: new Set(),
 *   activeMutations: new Set(),
 *   setQueryLoading: (key, loading) => set((state) => {
 *     const newSet = new Set(state.activeQueries);
 *     loading ? newSet.add(key) : newSet.delete(key);
 *     return { activeQueries: newSet };
 *   }),
 *   setMutationLoading: (key, loading) => set((state) => {
 *     const newSet = new Set(state.activeMutations);
 *     loading ? newSet.add(key) : newSet.delete(key);
 *     return { activeMutations: newSet };
 *   }),
 * }));
 * ```
 */
