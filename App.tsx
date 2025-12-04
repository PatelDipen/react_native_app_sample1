/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import RootNavigation from '@/navigation/RootNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { ErrorBoundary } from '@/components';

// Create QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
    },
  },
});

export default function App() {
  const loadStoredAuth = useAuthStore(state => state.loadStoredAuth);

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
          </SafeAreaProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}
