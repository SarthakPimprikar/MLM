export type Role = 'admin' | 'sh' | 'hba' | 'hcm' | 'hcc';
export type Rank = 'HCC' | 'HCM' | 'HBA' | 'SH' | 'ADMIN';
export type Status = 'active' | 'inactive' | 'blocked';
export type KycStatus = 'pending' | 'approved' | 'rejected' | 'not_submitted';

export interface IUser {
  _id: string;
  name: string;
  mobile: string;
  email?: string;
  role: Role;
  rank: Rank;
  memberId: string;
  referrer?: {
    _id: string;
    name: string;
    memberId: string;
    rank: Rank;
  };
  state: string;
  status: Status;
  kycStatus: KycStatus;
  kycDocuments?: {
    aadhaarNumber?: string;
    panNumber?: string;
    bankName?: string;
    accountNumber?: string;
    ifscCode?: string;
  };
  personalSalesCount: number;
  personalSalesThisMonth: number;
  teamSize: number;
  createdAt: string;
  updatedAt: string;
}

export interface IPlan {
  _id: string;
  name: string;
  price: number;
  businessVolume: number;
  isCommissionable: boolean;
  gstPercent: number;
  description: string;
  isActive: boolean;
}

export interface ISale {
  _id: string;
  policyId: string;
  seller: {
    _id: string;
    name: string;
    memberId: string;
  };
  customerName: string;
  customerMobile: string;
  plan: IPlan;
  amount: number;
  businessVolume: number;
  status: 'pending' | 'completed' | 'cancelled';
  commissionProcessed: boolean;
  cycleMonth: string;
  createdAt: string;
}

export type LedgerType = 
  'direct' | 'override' | 'leadership' | 
  'withdrawal' | 'tds_deduction';

export interface ILedgerEntry {
  _id: string;
  type: LedgerType;
  amount: number;
  description: string;
  sourceUserId?: string;
  status: 'provisional' | 'final';
  cycleMonth: string;
  date: string;
}

export interface IWallet {
  _id: string;
  user: string;
  provisionalBalance: number;
  finalBalance: number;
  totalEarned: number;
  totalWithdrawn: number;
  ledger: ILedgerEntry[];
}

export interface IEPin {
  _id: string;
  pinCode: string;
  plan: IPlan;
  value: number;
  owner: string;
  status: 'unused' | 'used' | 'transferred' | 'expired';
  usedBy?: string;
  usedDate?: string;
  transferHistory: {
    from: string;
    to: string;
    date: string;
  }[];
  createdAt: string;
}

export interface ITreeNode {
  _id: string;
  name: string;
  memberId: string;
  rank: Rank;
  status: Status;
  level: number;
  personalSalesCount: number;
  teamSize: number;
  children?: ITreeNode[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

// Request Data Types
export interface RegisterData {
  name: string;
  mobile: string;
  email?: string;
  referrerId?: string;
  ePinCode?: string;
  state: string;
}

export interface CreateSaleData {
  customerName: string;
  customerMobile: string;
  planId: string;
  ePinCode?: string;
}

export interface KYCData {
  aadhaarNumber: string;
  panNumber: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

export interface GenerateEPinData {
  planId: string;
  quantity: number;
  assignToUserId?: string;
}
