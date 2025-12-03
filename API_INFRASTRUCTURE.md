# API Infrastructure Setup - Complete Guide

## Overview

A production-ready API infrastructure has been configured with:

- **axios** - HTTP client with interceptors
- **@tanstack/react-query** - Server state management and caching
- **zustand** - Client state management (auth + loading)
- **react-native-keychain** - Secure token storage

## Architecture

```
Components/Screens
        ↓
React Query Hooks (useAuth.ts)
        ↓
Service Layer (auth.service.ts)
        ↓
Axios Instance (api.ts)
        ↓ [interceptors]
Backend API

Parallel:
- Zustand Auth Store (user, tokens, isAuthenticated)
- Zustand Loading Store (global loading state)
- Keychain Storage (secure token persistence)
```

## Key Features

### ✅ Authentication with Refresh Token

- Automatic token injection in requests
- 401 error detection and token refresh
- Seamless retry of failed requests
- Automatic logout on refresh failure

### ✅ Global Loading State

- Tracks all active API requests
- Centralized loading indicator
- Integrates with ScreenWrapper
- Can be used per-request or globally

### ✅ Secure Token Storage

- Uses iOS Keychain / Android Keystore
- Automatic token persistence
- Encrypted storage

### ✅ Type Safety

- Full TypeScript support
- Typed requests/responses
- Type-safe hooks

## File Structure

```
src/
├── utils/
│   └── storage.ts              # Keychain wrapper
├── store/
│   ├── authStore.ts           # Auth state (Zustand)
│   └── loadingStore.ts        # Loading state (Zustand)
├── services/
│   ├── api.ts                 # Axios instance + interceptors
│   └── auth.service.ts        # Auth API endpoints
└── hooks/
    └── api/
        └── useAuth.ts         # React Query hooks
```

## Usage Examples

### 1. Login with Global Loading

```typescript
import { useLogin } from '@/hooks/api/useAuth';
import { useGlobalLoading } from '@/store/loadingStore';

function LoginScreen() {
  const loginMutation = useLogin();
  const isLoading = useGlobalLoading();

  const handleLogin = async (email: string, password: string) => {
    try {
      await loginMutation.mutateAsync({ email, password });
      // Auto-navigates when auth state changes
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return <ScreenWrapper loading={isLoading}>{/* Your form */}</ScreenWrapper>;
}
```

### 2. Get Current User

```typescript
import { useCurrentUser } from '@/hooks/api/useAuth';

function ProfileScreen() {
  const { data: user, isLoading, error } = useCurrentUser();

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Error loading profile</Text>;

  return <Text>Welcome, {user?.name}</Text>;
}
```

### 3. Logout

```typescript
import { useLogout } from '@/hooks/api/useAuth';

function SettingsScreen() {
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    // Auto-navigates to auth screens
  };

  return <Button title="Logout" onPress={handleLogout} />;
}
```

### 4. Check Auth State

```typescript
import { useAuthStore } from '@/store/authStore';

function MyComponent() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Text>Please login</Text>;
  }

  return <Text>Hello {user?.email}</Text>;
}
```

## Loading State Solutions

### Option 1: Global Loading (Current Implementation)

**Pros:**

- Automatic for all API calls
- Single source of truth
- No manual tracking needed
- Works with ScreenWrapper

**Usage:**

```typescript
import { useGlobalLoading } from '@/store/loadingStore';

function MyScreen() {
  const isLoading = useGlobalLoading();

  return <ScreenWrapper loading={isLoading}>{/* content */}</ScreenWrapper>;
}
```

### Option 2: Per-Request Loading

**Pros:**

- More granular control
- Can show different loaders
- Better for multiple concurrent requests

**Usage:**

```typescript
import { useRequestLoading } from '@/store/loadingStore';

function MyScreen() {
  const isLoginLoading = useRequestLoading('post_/auth/login');

  return (
    <ScreenWrapper loading={isLoginLoading}>{/* content */}</ScreenWrapper>
  );
}
```

### Option 3: React Query Loading

**Pros:**

- Built into React Query
- Per-mutation/query tracking
- No additional setup

**Usage:**

```typescript
function MyScreen() {
  const loginMutation = useLogin();

  return (
    <ScreenWrapper loading={loginMutation.isPending}>
      {/* content */}
    </ScreenWrapper>
  );
}
```

**Recommended:** Use Global Loading for general cases, React Query loading for specific mutations.

## How Token Refresh Works

1. API request returns 401 (Unauthorized)
2. Interceptor detects 401 and `_retry` flag is not set
3. Gets refresh token from keychain
4. Calls `/auth/refresh` endpoint with refresh token
5. If successful:
   - Stores new tokens in keychain
   - Updates Zustand store
   - Retries original request with new access token
6. If refresh fails:
   - Clears auth state
   - User redirected to login

## API Service Pattern

To add new API endpoints, follow this pattern:

### Step 1: Create Service

```typescript
// src/services/claims.service.ts
import api from './api';

export interface Claim {
  id: string;
  title: string;
}

export const getClaims = async (): Promise<Claim[]> => {
  const response = await api.get<Claim[]>('/claims');
  return response.data;
};

export const createClaim = async (data: CreateClaimRequest): Promise<Claim> => {
  const response = await api.post<Claim>('/claims', data);
  return response.data;
};
```

### Step 2: Create React Query Hooks

```typescript
// src/hooks/api/useClaims.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getClaims, createClaim } from '@/services/claims.service';

export const useClaims = () => {
  return useQuery({
    queryKey: ['claims'],
    queryFn: getClaims,
  });
};

export const useCreateClaim = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClaim,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claims'] });
    },
  });
};
```

### Step 3: Use in Components

```typescript
import { useClaims, useCreateClaim } from '@/hooks/api/useClaims';
import { useGlobalLoading } from '@/store/loadingStore';

function ClaimsScreen() {
  const { data: claims } = useClaims();
  const createMutation = useCreateClaim();
  const isLoading = useGlobalLoading();

  return <ScreenWrapper loading={isLoading}>{/* Your UI */}</ScreenWrapper>;
}
```

## Loading Store Details

### How It Works

The loading store tracks all active API requests using a Set:

```typescript
interface LoadingState {
  activeRequests: Set<string>; // e.g., "post_/auth/login"
  isLoading: boolean; // true if any request is active
}
```

When a request starts: `startLoading('post_/auth/login')`
When a request ends: `stopLoading('post_/auth/login')`

The axios interceptors handle this automatically!

### Manual Loading Control

If you need manual control:

```typescript
import { useLoadingStore } from '@/store/loadingStore';

function MyComponent() {
  const { startLoading, stopLoading } = useLoadingStore();

  const doSomething = async () => {
    startLoading('custom_operation');
    try {
      await someAsyncWork();
    } finally {
      stopLoading('custom_operation');
    }
  };
}
```

## Configuration

### React Query Config (App.tsx)

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Retry failed queries twice
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false, // Don't refetch on focus
    },
    mutations: {
      retry: 1, // Retry mutations once
    },
  },
});
```

### Axios Config (api.ts)

```typescript
const api = axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: 30000, // 30 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});
```

## Error Handling

All errors are centralized through `handleApiError`:

```typescript
try {
  await loginMutation.mutateAsync(data);
} catch (error) {
  const message = handleApiError(error);
  Alert.alert('Error', message);
}
```

Error messages:

- Server error: Uses `response.data.message` or `error.message`
- Network error: "Network error. Please check your connection."
- Unknown error: "An unexpected error occurred"

## Security

✅ Tokens stored in secure keychain (not AsyncStorage)
✅ Automatic token refresh prevents session expiry
✅ HTTPS only
✅ 30-second timeout
✅ Automatic logout on auth failure

## Testing

Mock setup in `jest.setup.js`:

- Keychain operations mocked
- Vector icons mocked
- Animation helpers mocked

## Troubleshooting

### Tokens not persisting

- Check keychain permissions
- Verify `loadStoredAuth()` is called in App.tsx

### 401 errors not refreshing

- Verify refresh token endpoint: `/auth/refresh`
- Check token expiry times
- Ensure refresh token is in response

### Loading state not updating

- Check axios interceptors are working
- Verify `useGlobalLoading` is used correctly
- Check console for errors

### Navigation not working after login

- Verify `isAuthenticated` changes in auth store
- Check `RootNavigation` watches auth state
- Ensure tokens are stored successfully

## Available Hooks

### Auth Hooks

- `useLogin()` - Login mutation
- `useRegister()` - Register mutation
- `useLogout()` - Logout mutation
- `useCurrentUser()` - Get current user query
- `useUpdateProfile()` - Update profile mutation

### Loading Hooks

- `useGlobalLoading()` - Check if any request is loading
- `useRequestLoading(key)` - Check specific request loading

### Store Hooks

- `useAuthStore()` - Access auth state
- `useLoadingStore()` - Access loading state

## Summary

✅ **Complete auth infrastructure with refresh tokens**
✅ **Global loading state tracking**
✅ **Secure token storage**
✅ **Type-safe API calls**
✅ **Automatic error handling**
✅ **Production-ready**

The infrastructure is ready to use. Just add your API endpoints following the pattern shown above!
