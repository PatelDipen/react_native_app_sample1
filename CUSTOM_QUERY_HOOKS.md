# Custom Query/Mutation Hooks - Middle Layer Pattern

## Overview

This implementation adds a **middle layer** between your application hooks and React Query's `useQuery`/`useMutation` hooks.

## Architecture

```
Component
   ↓
useAuth/useInsurance hooks (Your business logic)
   ↓
useCustomQuery/useCustomMutation (Middle layer - Logging, tracking)
   ↓
React Query (useQuery/useMutation)
   ↓
API Service
```

## Features

### 1. **Automatic Logging (Development Mode)**
```typescript
🔄 [Query] Fetching: ["auth","currentUser"]
✅ [Query] Success: ["auth","currentUser"] (245ms)

🚀 [Mutation] Started: login {userName: "test@example.com", password: "***"}
✅ [Mutation] Success: login (189ms)
```

### 2. **Performance Tracking**
- Measures query/mutation execution time
- Logs duration in milliseconds
- Useful for identifying slow endpoints

### 3. **Extensible Design**
You can easily add:
- Custom loading state tracking
- Analytics integration (Google Analytics, Mixpanel, etc.)
- Error reporting (Sentry, Crashlytics)
- API call metrics
- Custom middleware logic

## Usage

### Before (Direct React Query):
```typescript
import { useQuery, useMutation } from '@tanstack/react-query';

export const useMyData = () => {
  return useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
  });
};
```

### After (With Middle Layer):
```typescript
import { useCustomQuery } from '@/hooks/useCustomQuery';

export const useMyData = () => {
  return useCustomQuery({
    queryKey: ['data'],
    queryFn: fetchData,
  });
};
```

## Advanced: Custom Loading Store Integration

If you want to track ALL active queries/mutations globally:

```typescript
// 1. Create loading store
import { create } from 'zustand';

export const useLoadingStore = create<{
  activeQueries: Set<string>;
  activeMutations: Set<string>;
  isAnyQueryLoading: () => boolean;
  isAnyMutationLoading: () => boolean;
}>((set, get) => ({
  activeQueries: new Set(),
  activeMutations: new Set(),
  isAnyQueryLoading: () => get().activeQueries.size > 0,
  isAnyMutationLoading: () => get().activeMutations.size > 0,
}));

// 2. Update useCustomQuery.ts to track in this store
useEffect(() => {
  const queryKey = JSON.stringify(options.queryKey);
  useLoadingStore.setState((state) => {
    const newSet = new Set(state.activeQueries);
    query.isFetching ? newSet.add(queryKey) : newSet.delete(queryKey);
    return { activeQueries: newSet };
  });
}, [query.isFetching, options.queryKey]);
```

## Benefits

### ✅ Separation of Concerns
- Business logic in your hooks
- Cross-cutting concerns in middle layer
- React Query handles caching/fetching

### ✅ DRY (Don't Repeat Yourself)
- Add logging once, applies to all queries/mutations
- No need to add console.log in every hook

### ✅ Easy to Extend
- Add analytics: Track API usage patterns
- Add monitoring: Send metrics to APM tools
- Add debugging: Enhanced dev tools integration

### ✅ Type-Safe
- Full TypeScript support
- Same API as React Query
- No type information lost

## Example Extensions

### Analytics Integration:
```typescript
export const useCustomMutation = (options) => {
  const mutation = useMutation({
    ...options,
    onSuccess: (data, variables, context) => {
      // Track success in analytics
      Analytics.logEvent('api_mutation_success', {
        mutation: options.mutationKey,
        duration: Date.now() - startTime,
      });
      
      options.onSuccess?.(data, variables, context);
    },
  });
  return mutation;
};
```

### Error Reporting:
```typescript
if (query.isError) {
  // Send to Sentry
  Sentry.captureException(query.error, {
    tags: {
      queryKey: JSON.stringify(options.queryKey),
      queryType: 'useQuery',
    },
  });
}
```

### Rate Limiting Detection:
```typescript
if (query.isError && query.error.status === 429) {
  console.warn('⚠️ Rate limit hit for:', options.queryKey);
  // Show user-friendly message
  showToast('Too many requests. Please wait a moment.');
}
```

## Best Practices

1. **Keep logging in __DEV__ only** - Don't log in production
2. **Don't break original callbacks** - Always call `options.onSuccess?.()` etc.
3. **Use meaningful mutation keys** - Helps with debugging
4. **Monitor performance** - Track slow queries/mutations
5. **Sanitize sensitive data** - Don't log passwords, tokens

## Migration Guide

1. Create `src/hooks/useCustomQuery.ts`
2. Update imports in your API hooks:
   - Replace `useQuery` → `useCustomQuery`
   - Replace `useMutation` → `useCustomMutation`
3. Test that everything still works
4. Customize logging/tracking as needed

## Notes

- Zero impact on production if you keep logging in `__DEV__`
- No performance overhead (logging is async)
- Fully compatible with React Query features
- Can be disabled by reverting imports
