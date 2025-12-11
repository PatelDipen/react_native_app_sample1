import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  login,
  register,
  logout,
  getCurrentUser,
  updateProfile,
  LoginRequest,
  RegisterRequest,
} from '@/services/auth.service';
import { useAuthStore } from '@/store/authStore';

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  currentUser: () => [...authKeys.all, 'currentUser'] as const,
};

/**
 * Hook for login mutation
 */
export const useLogin = () => {
  const { setAuth } = useAuthStore();
  const queryClient = useQueryClient();

  // useCustomMutation can be used here if additional logging/tracking is needed
  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (response) => {
      setAuth(response.user, {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
    },
  });
};

/**
 * Hook for register mutation
 */
export const useRegister = () => {
  const { setAuth } = useAuthStore();
  const queryClient = useQueryClient();

  // useCustomMutation can be used here if additional logging/tracking is needed
  return useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
    onSuccess: (response) => {
      setAuth(response.user, {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
    },
  });
};

/**
 * Hook for logout mutation
 */
export const useLogout = () => {
  const { clearAuth } = useAuthStore();
  const queryClient = useQueryClient();

  // useCustomMutation can be used here if additional logging/tracking is needed
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
    },
    onError: () => {
      // Clear auth even if API call fails
      clearAuth();
      queryClient.clear();
    },
  });
};

/**
 * Hook to fetch current user profile
 */
export const useCurrentUser = (enabled: boolean = true) => {
  const { isAuthenticated } = useAuthStore();

  // useCustomQuery can be used here if additional logging/tracking is needed
  return useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: getCurrentUser,
    enabled: enabled && isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

/**
 * Hook for updating user profile
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  // useCustomMutation can be used here if additional logging/tracking is needed
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(authKeys.currentUser(), updatedUser);
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser() });
    },
  });
};
