import axios from 'axios';
import { 
  ApiResponse, 
  IUser, 
  RegisterData, 
  KYCData, 
  ITreeNode, 
  CreateSaleData, 
  ISale, 
  PaginatedResponse, 
  IWallet, 
  GenerateEPinData, 
  IEPin,
  IPlan 
} from '../types';

const api = axios.create({
  // Use relative path for client-side to leverage Next.js rewrites (handles CORS/Cookies)
  baseURL: typeof window !== 'undefined' ? '/api' : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'),
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

// Response interceptor - handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login') && !window.location.pathname.startsWith('/register')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// AUTH
export const authAPI = {
  sendOTP: (mobile: string) => 
    api.post('/auth/send-otp', { mobile }),
  verifyOTP: (mobile: string, otp: string) => 
    api.post('/auth/verify-otp', { mobile, otp }),
  register: (data: RegisterData) => 
    api.post('/auth/register', data),
  getMe: () => 
    api.get<ApiResponse<IUser>>('/auth/me'),
  logout: () => 
    api.post('/auth/logout'), // Note: Backend needs to implement this or just clear cookie on client
};

// USERS
export const usersAPI = {
  getAll: (params?: { page?: number; limit?: number; search?: string }) =>
    api.get<PaginatedResponse<IUser>>('/users', { params }),
  getById: (id: string) => 
    api.get<ApiResponse<IUser>>(`/users/${id}`),
  updateKYC: (id: string, data: KYCData) =>
    api.put<ApiResponse<any>>(`/users/${id}/kyc`, data),
  getDownline: (id: string) =>
    api.get<ApiResponse<ITreeNode>>(`/users/${id}/downline`),
};

// SALES
export const salesAPI = {
  create: (data: CreateSaleData) =>
    api.post<ApiResponse<ISale>>('/sales', data),
  getAll: (params?: { page?: number; limit?: number; cycleMonth?: string }) =>
    api.get<PaginatedResponse<ISale>>('/sales', { params }),
  getById: (id: string) =>
    api.get<ApiResponse<ISale>>(`/sales/${id}`),
};

// WALLET
export const walletAPI = {
  getMyWallet: () =>
    api.get<ApiResponse<IWallet>>('/wallet/my'),
  requestWithdrawal: (amount: number) =>
    api.post('/wallet/withdraw', { amount }),
  triggerPayoutCycle: (cycleMonth: string) =>
    api.post('/wallet/payout-cycle', { cycleMonth }),
};

// EPINS
export const epinsAPI = {
  generate: (data: GenerateEPinData) =>
    api.post('/epins/generate', data),
  transfer: (pinCode: string, toMemberId: string) =>
    api.post('/epins/transfer', { pinCode, toMemberId }),
  getMyPins: () =>
    api.get<ApiResponse<{ unused: IEPin[]; used: IEPin[]; totalUnused: number }>>('/epins/my-pins'),
};

// PLANS
export const plansAPI = {
  getAll: () =>
    api.get<ApiResponse<IPlan[]>>('/plans'),
};

// ADMIN
export const adminAPI = {
  getPendingKYC: () =>
    api.get<ApiResponse<IUser[]>>('/admin/kyc/pending'),
  updateKYCStatus: (id: string, status: 'approved' | 'rejected') =>
    api.put<ApiResponse<any>>(`/admin/kyc/${id}/status`, { status }),
  getCommissionConfig: () =>
    api.get<ApiResponse<any>>('/admin/commission-config'),
  updateCommissionConfig: (data: any) =>
    api.put<ApiResponse<any>>('/admin/commission-config', data),
  getAllProvisional: () =>
    api.get<ApiResponse<{ wallets: any[]; summary: any }>>('/wallet/all-provisional'),
  triggerPayoutCycle: (cycleMonth: string) =>
    api.post<ApiResponse<any>>('/wallet/payout-cycle', { cycleMonth }),
};

export default api;
