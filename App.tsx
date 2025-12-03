/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import RootNavigation from '@/navigation/RootNavigation';
import { StatusBar, useColorScheme } from 'react-native';
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
  const isDarkMode = useColorScheme() === 'dark';
  const loadStoredAuth = useAuthStore(state => state.loadStoredAuth);

  // Load stored authentication on app start
  useEffect(() => {
    loadStoredAuth();
  }, [loadStoredAuth]);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <RootNavigation />
        </SafeAreaProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
