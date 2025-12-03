import { create } from 'zustand';

interface LoadingState {
  activeRequests: Set<string>;
  isLoading: boolean;

  // Actions
  startLoading: (key: string) => void;
  stopLoading: (key: string) => void;
  isRequestLoading: (key: string) => boolean;
}

export const useLoadingStore = create<LoadingState>((set, get) => ({
  activeRequests: new Set(),
  isLoading: false,

  startLoading: (key: string) => {
    set(state => {
      const newRequests = new Set(state.activeRequests);
      newRequests.add(key);
      return {
        activeRequests: newRequests,
        isLoading: newRequests.size > 0,
      };
    });
  },

  stopLoading: (key: string) => {
    set(state => {
      const newRequests = new Set(state.activeRequests);
      newRequests.delete(key);
      return {
        activeRequests: newRequests,
        isLoading: newRequests.size > 0,
      };
    });
  },

  isRequestLoading: (key: string) => {
    return get().activeRequests.has(key);
  },
}));

/**
 * Hook to check if any API request is loading
 */
export const useGlobalLoading = () => {
  return useLoadingStore(state => state.isLoading);
};

/**
 * Hook to check if a specific API request is loading
 */
export const useRequestLoading = (key: string) => {
  return useLoadingStore(state => state.isRequestLoading(key));
};
