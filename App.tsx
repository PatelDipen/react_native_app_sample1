/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import RootNavigation from '@/navigation/RootNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { useAuthStore } from '@/store/authStore';
import { ErrorBoundary } from '@/components';
import { handleApiError } from '@/services/api';

// Create QueryClient instance with global error handling using QueryCache and MutationCache
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: unknown) => {
      const message = handleApiError(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
        position: 'top',
        visibilityTime: 4000,
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: unknown) => {
      const message = handleApiError(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: message,
        position: 'top',
        visibilityTime: 4000,
      });
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export default function App() {
  const loadStoredAuth = useAuthStore((state) => state.loadStoredAuth);

  // Load stored authentication on app start
  useEffect(() => {
    loadStoredAuth();
  }, [loadStoredAuth]);

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <RootNavigation />
            <Toast />
          </SafeAreaProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}
