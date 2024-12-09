/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from '../config/axiosInstance';

export const validateCreditCard = async (cardNumber: string): Promise<{ isValid: boolean; message: string }> => {
  try {
    const response = await apiClient.post(`/credit-card/validate`, { cardNumber });
    return { isValid: true, message: response.data.message };
  } catch (error: any) {
    return {
      isValid: false,
      message: error.response?.data?.message || 'Validation failed',
    };
  }
};
