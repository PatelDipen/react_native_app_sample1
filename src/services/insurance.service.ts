import apiClient from './api';
import { Insurance, Claim } from '@/types/insurance';

export const insuranceService = {
  /**
   * Get all user's insurances
   */
  getMyInsurances: async (): Promise<Insurance[]> => {
    const response = await apiClient.get<Insurance[]>('/myInsurance');
    return response.data;
  },

  /**
   * Get all user's claims
   */
  getMyClaims: async (): Promise<Claim[]> => {
    const response = await apiClient.get<Claim[]>('/myClaim');
    return response.data;
  },
};
