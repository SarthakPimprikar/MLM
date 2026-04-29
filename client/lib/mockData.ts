// ============================================================================
// STATIC MOCK DATA — HBA & HCM Dashboards
// Replace with real API calls when backend is ready
// ============================================================================

import { IUser, IWallet, ILedgerEntry, ISale, ITreeNode, IEPin } from '@/types';

// ─── HBA Static User ────────────────────────────────────────────────────────
export const HBA_USER: IUser = {
  _id: 'hba-001',
  name: 'Rajesh Kumar',
  mobile: '9876543210',
  email: 'rajesh.kumar@curebharat.in',
  role: 'hba',
  rank: 'HBA',
  memberId: 'CB-HBA-1001',
  referrer: {
    _id: 'sh-001',
    name: 'Vikram Singh',
    memberId: 'CB-SH-0001',
    rank: 'SH',
  },
  state: 'Maharashtra',
  status: 'active',
  kycStatus: 'approved',
  kycDocuments: {
    aadhaarNumber: 'XXXX XXXX 4521',
    panNumber: 'ABCPK1234F',
    bankName: 'State Bank of India',
    accountNumber: 'XXXX XXXX 7890',
    ifscCode: 'SBIN0001234',
  },
  personalSalesCount: 28,
  personalSalesThisMonth: 3,
  teamSize: 5,
  createdAt: '2025-06-15T10:00:00Z',
  updatedAt: '2026-04-25T12:00:00Z',
};

// ─── HCM Static User ────────────────────────────────────────────────────────
export const HCM_USER: IUser = {
  _id: 'hcm-001',
  name: 'Priya Sharma',
  mobile: '9123456780',
  email: 'priya.sharma@curebharat.in',
  role: 'hcm',
  rank: 'HCM',
  memberId: 'CB-HCM-2001',
  referrer: {
    _id: 'hba-001',
    name: 'Rajesh Kumar',
    memberId: 'CB-HBA-1001',
    rank: 'HBA',
  },
  state: 'Maharashtra',
  status: 'active',
  kycStatus: 'approved',
  kycDocuments: {
    aadhaarNumber: 'XXXX XXXX 8832',
    panNumber: 'DEFPS5678G',
    bankName: 'HDFC Bank',
    accountNumber: 'XXXX XXXX 2345',
    ifscCode: 'HDFC0002345',
  },
  personalSalesCount: 18,
  personalSalesThisMonth: 2,
  teamSize: 8,
  createdAt: '2025-09-10T10:00:00Z',
  updatedAt: '2026-04-26T09:30:00Z',
};

// ─── Wallet Data ─────────────────────────────────────────────────────────────
export const HBA_WALLET: IWallet = {
  _id: 'wallet-hba-001',
  user: 'hba-001',
  provisionalBalance: 420000, // ₹4,200 in paise
  finalBalance: 828000,       // ₹8,280
  totalEarned: 4560000,       // ₹45,600
  totalWithdrawn: 3732000,    // ₹37,320
  ledger: [],
};

export const HCM_WALLET: IWallet = {
  _id: 'wallet-hcm-001',
  user: 'hcm-001',
  provisionalBalance: 196000, // ₹1,960
  finalBalance: 482000,       // ₹4,820
  totalEarned: 2140000,       // ₹21,400
  totalWithdrawn: 1658000,    // ₹16,580
  ledger: [],
};

// ─── Ledger Entries (HBA) ────────────────────────────────────────────────────
export const HBA_LEDGER: ILedgerEntry[] = [
  { _id: 'led-h1', type: 'override', amount: 160000, description: 'Override from HCM Priya Sharma — April cycle', sourceUserId: 'hcm-001', status: 'provisional', cycleMonth: '2026-04', date: '2026-04-25T10:00:00Z' },
  { _id: 'led-h2', type: 'override', amount: 128000, description: 'Override from HCM Amit Patel — April cycle', sourceUserId: 'hcm-002', status: 'provisional', cycleMonth: '2026-04', date: '2026-04-22T14:30:00Z' },
  { _id: 'led-h3', type: 'override', amount: 96000, description: 'Override from HCM Sneha Desai — April cycle', sourceUserId: 'hcm-003', status: 'provisional', cycleMonth: '2026-04', date: '2026-04-18T09:15:00Z' },
  { _id: 'led-h4', type: 'direct', amount: 199900, description: 'Personal sale — Sampoorna Suraksha Premium', status: 'provisional', cycleMonth: '2026-04', date: '2026-04-15T16:45:00Z' },
  { _id: 'led-h5', type: 'override', amount: 192000, description: 'Override from HCM Priya Sharma — March cycle', sourceUserId: 'hcm-001', status: 'final', cycleMonth: '2026-03', date: '2026-03-28T10:00:00Z' },
  { _id: 'led-h6', type: 'override', amount: 144000, description: 'Override from HCM Amit Patel — March cycle', sourceUserId: 'hcm-002', status: 'final', cycleMonth: '2026-03', date: '2026-03-25T11:30:00Z' },
  { _id: 'led-h7', type: 'override', amount: 112000, description: 'Override from HCM Sneha Desai — March cycle', sourceUserId: 'hcm-003', status: 'final', cycleMonth: '2026-03', date: '2026-03-20T15:00:00Z' },
  { _id: 'led-h8', type: 'withdrawal', amount: -500000, description: 'Payout processed — March cycle', status: 'final', cycleMonth: '2026-03', date: '2026-03-05T10:00:00Z' },
  { _id: 'led-h9', type: 'tds_deduction', amount: -50000, description: 'TDS deduction @ 5% — March payout', status: 'final', cycleMonth: '2026-03', date: '2026-03-05T10:00:00Z' },
  { _id: 'led-h10', type: 'override', amount: 168000, description: 'Override from HCM Ravi Joshi — Feb cycle', sourceUserId: 'hcm-004', status: 'final', cycleMonth: '2026-02', date: '2026-02-26T12:00:00Z' },
];

// ─── Ledger Entries (HCM) ────────────────────────────────────────────────────
export const HCM_LEDGER: ILedgerEntry[] = [
  { _id: 'led-m1', type: 'override', amount: 80000, description: 'Override from HCC Meera Nair — April cycle', sourceUserId: 'hcc-001', status: 'provisional', cycleMonth: '2026-04', date: '2026-04-26T10:00:00Z' },
  { _id: 'led-m2', type: 'override', amount: 64000, description: 'Override from HCC Arjun Reddy — April cycle', sourceUserId: 'hcc-002', status: 'provisional', cycleMonth: '2026-04', date: '2026-04-23T11:00:00Z' },
  { _id: 'led-m3', type: 'override', amount: 48000, description: 'Override from HCC Kavita Singh — April cycle', sourceUserId: 'hcc-003', status: 'provisional', cycleMonth: '2026-04', date: '2026-04-20T09:30:00Z' },
  { _id: 'led-m4', type: 'direct', amount: 159900, description: 'Personal sale — Sampoorna Suraksha', status: 'provisional', cycleMonth: '2026-04', date: '2026-04-17T14:00:00Z' },
  { _id: 'led-m5', type: 'override', amount: 72000, description: 'Override from HCC Vikash Gupta — April cycle', sourceUserId: 'hcc-004', status: 'provisional', cycleMonth: '2026-04', date: '2026-04-14T16:30:00Z' },
  { _id: 'led-m6', type: 'override', amount: 96000, description: 'Override from HCC Meera Nair — March cycle', sourceUserId: 'hcc-001', status: 'final', cycleMonth: '2026-03', date: '2026-03-27T10:00:00Z' },
  { _id: 'led-m7', type: 'override', amount: 56000, description: 'Override from HCC Rohit Verma — March cycle', sourceUserId: 'hcc-005', status: 'final', cycleMonth: '2026-03', date: '2026-03-24T11:00:00Z' },
  { _id: 'led-m8', type: 'withdrawal', amount: -300000, description: 'Payout processed — March cycle', status: 'final', cycleMonth: '2026-03', date: '2026-03-05T10:00:00Z' },
  { _id: 'led-m9', type: 'tds_deduction', amount: -30000, description: 'TDS deduction @ 5% — March payout', status: 'final', cycleMonth: '2026-03', date: '2026-03-05T10:00:00Z' },
  { _id: 'led-m10', type: 'direct', amount: 119900, description: 'Personal sale — Super Suraksha', status: 'final', cycleMonth: '2026-03', date: '2026-03-12T15:00:00Z' },
];

// ─── Team Members (HCMs under HBA) ──────────────────────────────────────────
export interface TeamMember {
  _id: string;
  name: string;
  memberId: string;
  rank: string;
  status: 'active' | 'inactive';
  mobile: string;
  joinDate: string;
  personalSalesCount: number;
  personalSalesThisMonth: number;
  teamSize: number;
  totalRevenue: number;
  lastActive: string;
}

export const HBA_TEAM_MEMBERS: TeamMember[] = [
  { _id: 'hcm-001', name: 'Priya Sharma', memberId: 'CB-HCM-2001', rank: 'HCM', status: 'active', mobile: '9123456780', joinDate: '2025-09-10', personalSalesCount: 18, personalSalesThisMonth: 2, teamSize: 8, totalRevenue: 425000, lastActive: '2026-04-28' },
  { _id: 'hcm-002', name: 'Amit Patel', memberId: 'CB-HCM-2002', rank: 'HCM', status: 'active', mobile: '9234567890', joinDate: '2025-10-05', personalSalesCount: 15, personalSalesThisMonth: 3, teamSize: 6, totalRevenue: 368000, lastActive: '2026-04-27' },
  { _id: 'hcm-003', name: 'Sneha Desai', memberId: 'CB-HCM-2003', rank: 'HCM', status: 'active', mobile: '9345678901', joinDate: '2025-11-20', personalSalesCount: 12, personalSalesThisMonth: 1, teamSize: 5, totalRevenue: 289000, lastActive: '2026-04-26' },
  { _id: 'hcm-004', name: 'Ravi Joshi', memberId: 'CB-HCM-2004', rank: 'HCM', status: 'active', mobile: '9456789012', joinDate: '2026-01-15', personalSalesCount: 9, personalSalesThisMonth: 2, teamSize: 4, totalRevenue: 198000, lastActive: '2026-04-25' },
  { _id: 'hcm-005', name: 'Neha Kulkarni', memberId: 'CB-HCM-2005', rank: 'HCM', status: 'inactive', mobile: '9567890123', joinDate: '2026-02-28', personalSalesCount: 5, personalSalesThisMonth: 0, teamSize: 2, totalRevenue: 87000, lastActive: '2026-03-18' },
];

// ─── Team Members (HCCs under HCM) ──────────────────────────────────────────
export const HCM_TEAM_MEMBERS: TeamMember[] = [
  { _id: 'hcc-001', name: 'Meera Nair', memberId: 'CB-HCC-3001', rank: 'HCC', status: 'active', mobile: '9678901234', joinDate: '2025-10-12', personalSalesCount: 22, personalSalesThisMonth: 4, teamSize: 0, totalRevenue: 310000, lastActive: '2026-04-28' },
  { _id: 'hcc-002', name: 'Arjun Reddy', memberId: 'CB-HCC-3002', rank: 'HCC', status: 'active', mobile: '9789012345', joinDate: '2025-11-08', personalSalesCount: 16, personalSalesThisMonth: 3, teamSize: 0, totalRevenue: 245000, lastActive: '2026-04-27' },
  { _id: 'hcc-003', name: 'Kavita Singh', memberId: 'CB-HCC-3003', rank: 'HCC', status: 'active', mobile: '9890123456', joinDate: '2025-12-01', personalSalesCount: 14, personalSalesThisMonth: 2, teamSize: 0, totalRevenue: 198000, lastActive: '2026-04-26' },
  { _id: 'hcc-004', name: 'Vikash Gupta', memberId: 'CB-HCC-3004', rank: 'HCC', status: 'active', mobile: '9901234567', joinDate: '2026-01-20', personalSalesCount: 11, personalSalesThisMonth: 2, teamSize: 0, totalRevenue: 165000, lastActive: '2026-04-25' },
  { _id: 'hcc-005', name: 'Rohit Verma', memberId: 'CB-HCC-3005', rank: 'HCC', status: 'active', mobile: '9012345678', joinDate: '2026-02-10', personalSalesCount: 8, personalSalesThisMonth: 1, teamSize: 0, totalRevenue: 112000, lastActive: '2026-04-24' },
  { _id: 'hcc-006', name: 'Anita Rao', memberId: 'CB-HCC-3006', rank: 'HCC', status: 'inactive', mobile: '9112233445', joinDate: '2026-02-25', personalSalesCount: 4, personalSalesThisMonth: 0, teamSize: 0, totalRevenue: 56000, lastActive: '2026-03-20' },
  { _id: 'hcc-007', name: 'Deepak Mishra', memberId: 'CB-HCC-3007', rank: 'HCC', status: 'active', mobile: '9223344556', joinDate: '2026-03-05', personalSalesCount: 6, personalSalesThisMonth: 2, teamSize: 0, totalRevenue: 84000, lastActive: '2026-04-27' },
  { _id: 'hcc-008', name: 'Sunita Pandey', memberId: 'CB-HCC-3008', rank: 'HCC', status: 'inactive', mobile: '9334455667', joinDate: '2026-03-18', personalSalesCount: 2, personalSalesThisMonth: 0, teamSize: 0, totalRevenue: 28000, lastActive: '2026-04-02' },
];

// ─── Network Tree (HBA view) ────────────────────────────────────────────────
export const HBA_TREE: ITreeNode[] = [
  {
    _id: 'hba-001', name: 'Rajesh Kumar', memberId: 'CB-HBA-1001', rank: 'HBA', status: 'active', level: 0, personalSalesCount: 28, teamSize: 25,
    children: [
      {
        _id: 'hcm-001', name: 'Priya Sharma', memberId: 'CB-HCM-2001', rank: 'HCM', status: 'active', level: 1, personalSalesCount: 18, teamSize: 8,
        children: [
          { _id: 'hcc-001', name: 'Meera Nair', memberId: 'CB-HCC-3001', rank: 'HCC', status: 'active', level: 2, personalSalesCount: 22, teamSize: 0 },
          { _id: 'hcc-002', name: 'Arjun Reddy', memberId: 'CB-HCC-3002', rank: 'HCC', status: 'active', level: 2, personalSalesCount: 16, teamSize: 0 },
          { _id: 'hcc-003', name: 'Kavita Singh', memberId: 'CB-HCC-3003', rank: 'HCC', status: 'active', level: 2, personalSalesCount: 14, teamSize: 0 },
        ],
      },
      {
        _id: 'hcm-002', name: 'Amit Patel', memberId: 'CB-HCM-2002', rank: 'HCM', status: 'active', level: 1, personalSalesCount: 15, teamSize: 6,
        children: [
          { _id: 'hcc-004', name: 'Vikash Gupta', memberId: 'CB-HCC-3004', rank: 'HCC', status: 'active', level: 2, personalSalesCount: 11, teamSize: 0 },
          { _id: 'hcc-005', name: 'Rohit Verma', memberId: 'CB-HCC-3005', rank: 'HCC', status: 'active', level: 2, personalSalesCount: 8, teamSize: 0 },
        ],
      },
      {
        _id: 'hcm-003', name: 'Sneha Desai', memberId: 'CB-HCM-2003', rank: 'HCM', status: 'active', level: 1, personalSalesCount: 12, teamSize: 5,
        children: [
          { _id: 'hcc-006', name: 'Anita Rao', memberId: 'CB-HCC-3006', rank: 'HCC', status: 'inactive', level: 2, personalSalesCount: 4, teamSize: 0 },
        ],
      },
      { _id: 'hcm-004', name: 'Ravi Joshi', memberId: 'CB-HCM-2004', rank: 'HCM', status: 'active', level: 1, personalSalesCount: 9, teamSize: 4 },
      { _id: 'hcm-005', name: 'Neha Kulkarni', memberId: 'CB-HCM-2005', rank: 'HCM', status: 'inactive', level: 1, personalSalesCount: 5, teamSize: 2 },
    ],
  },
];

// ─── Network Tree (HCM view) ────────────────────────────────────────────────
export const HCM_TREE: ITreeNode[] = [
  {
    _id: 'hcm-001', name: 'Priya Sharma', memberId: 'CB-HCM-2001', rank: 'HCM', status: 'active', level: 0, personalSalesCount: 18, teamSize: 8,
    children: [
      { _id: 'hcc-001', name: 'Meera Nair', memberId: 'CB-HCC-3001', rank: 'HCC', status: 'active', level: 1, personalSalesCount: 22, teamSize: 0 },
      { _id: 'hcc-002', name: 'Arjun Reddy', memberId: 'CB-HCC-3002', rank: 'HCC', status: 'active', level: 1, personalSalesCount: 16, teamSize: 0 },
      { _id: 'hcc-003', name: 'Kavita Singh', memberId: 'CB-HCC-3003', rank: 'HCC', status: 'active', level: 1, personalSalesCount: 14, teamSize: 0 },
      { _id: 'hcc-004', name: 'Vikash Gupta', memberId: 'CB-HCC-3004', rank: 'HCC', status: 'active', level: 1, personalSalesCount: 11, teamSize: 0 },
      { _id: 'hcc-005', name: 'Rohit Verma', memberId: 'CB-HCC-3005', rank: 'HCC', status: 'active', level: 1, personalSalesCount: 8, teamSize: 0 },
      { _id: 'hcc-006', name: 'Anita Rao', memberId: 'CB-HCC-3006', rank: 'HCC', status: 'inactive', level: 1, personalSalesCount: 4, teamSize: 0 },
      { _id: 'hcc-007', name: 'Deepak Mishra', memberId: 'CB-HCC-3007', rank: 'HCC', status: 'active', level: 1, personalSalesCount: 6, teamSize: 0 },
      { _id: 'hcc-008', name: 'Sunita Pandey', memberId: 'CB-HCC-3008', rank: 'HCC', status: 'inactive', level: 1, personalSalesCount: 2, teamSize: 0 },
    ],
  },
];

// ─── Recent Sales ────────────────────────────────────────────────────────────
const PLANS = {
  superSuraksha:     { _id: 'plan-3', name: 'Super Suraksha', price: 199900, businessVolume: 199900, isCommissionable: true, gstPercent: 18, description: '', isActive: true },
  sampoornaSuraksha: { _id: 'plan-4', name: 'Sampoorna Suraksha', price: 299900, businessVolume: 299900, isCommissionable: true, gstPercent: 18, description: '', isActive: true },
  sampoornaSuper:    { _id: 'plan-5', name: 'Sampoorna Suraksha Super', price: 399900, businessVolume: 399900, isCommissionable: true, gstPercent: 18, description: '', isActive: true },
  sampoornaPremium:  { _id: 'plan-6', name: 'Sampoorna Suraksha Premium', price: 499900, businessVolume: 499900, isCommissionable: true, gstPercent: 18, description: '', isActive: true },
};

export const HBA_RECENT_SALES: ISale[] = [
  { _id: 's-hba-1', policyId: 'POL-2026-04-0189', seller: { _id: 'hba-001', name: 'Rajesh Kumar', memberId: 'CB-HBA-1001' }, customerName: 'Sanjay Mehta', customerMobile: '9887766554', plan: PLANS.sampoornaPremium, amount: 499900, businessVolume: 499900, status: 'completed', commissionProcessed: false, cycleMonth: '2026-04', createdAt: '2026-04-25T14:30:00Z' },
  { _id: 's-hba-2', policyId: 'POL-2026-04-0156', seller: { _id: 'hba-001', name: 'Rajesh Kumar', memberId: 'CB-HBA-1001' }, customerName: 'Pooja Agarwal', customerMobile: '9776655443', plan: PLANS.sampoornaSuraksha, amount: 299900, businessVolume: 299900, status: 'completed', commissionProcessed: true, cycleMonth: '2026-04', createdAt: '2026-04-18T11:00:00Z' },
  { _id: 's-hba-3', policyId: 'POL-2026-04-0123', seller: { _id: 'hba-001', name: 'Rajesh Kumar', memberId: 'CB-HBA-1001' }, customerName: 'Manish Tiwari', customerMobile: '9665544332', plan: PLANS.superSuraksha, amount: 199900, businessVolume: 199900, status: 'completed', commissionProcessed: true, cycleMonth: '2026-04', createdAt: '2026-04-10T16:45:00Z' },
];

export const HCM_RECENT_SALES: ISale[] = [
  { _id: 's-hcm-1', policyId: 'POL-2026-04-0201', seller: { _id: 'hcm-001', name: 'Priya Sharma', memberId: 'CB-HCM-2001' }, customerName: 'Ramesh Yadav', customerMobile: '9554433221', plan: PLANS.sampoornaSuper, amount: 399900, businessVolume: 399900, status: 'completed', commissionProcessed: false, cycleMonth: '2026-04', createdAt: '2026-04-26T09:00:00Z' },
  { _id: 's-hcm-2', policyId: 'POL-2026-04-0178', seller: { _id: 'hcm-001', name: 'Priya Sharma', memberId: 'CB-HCM-2001' }, customerName: 'Sunita Chopra', customerMobile: '9443322110', plan: PLANS.sampoornaSuraksha, amount: 299900, businessVolume: 299900, status: 'completed', commissionProcessed: true, cycleMonth: '2026-04', createdAt: '2026-04-19T13:30:00Z' },
];

// Team sales visible to HCM (sales by their HCCs)
export const HCM_TEAM_SALES: ISale[] = [
  { _id: 's-t1', policyId: 'POL-2026-04-0210', seller: { _id: 'hcc-001', name: 'Meera Nair', memberId: 'CB-HCC-3001' }, customerName: 'Ajay Bhatt', customerMobile: '9111222333', plan: PLANS.sampoornaPremium, amount: 499900, businessVolume: 499900, status: 'completed', commissionProcessed: false, cycleMonth: '2026-04', createdAt: '2026-04-27T10:00:00Z' },
  { _id: 's-t2', policyId: 'POL-2026-04-0205', seller: { _id: 'hcc-001', name: 'Meera Nair', memberId: 'CB-HCC-3001' }, customerName: 'Nisha Kapoor', customerMobile: '9222333444', plan: PLANS.sampoornaSuper, amount: 399900, businessVolume: 399900, status: 'completed', commissionProcessed: false, cycleMonth: '2026-04', createdAt: '2026-04-24T11:30:00Z' },
  { _id: 's-t3', policyId: 'POL-2026-04-0198', seller: { _id: 'hcc-002', name: 'Arjun Reddy', memberId: 'CB-HCC-3002' }, customerName: 'Kiran Rao', customerMobile: '9333444555', plan: PLANS.sampoornaSuraksha, amount: 299900, businessVolume: 299900, status: 'completed', commissionProcessed: true, cycleMonth: '2026-04', createdAt: '2026-04-22T15:00:00Z' },
  { _id: 's-t4', policyId: 'POL-2026-04-0190', seller: { _id: 'hcc-002', name: 'Arjun Reddy', memberId: 'CB-HCC-3002' }, customerName: 'Pankaj Jain', customerMobile: '9444555666', plan: PLANS.superSuraksha, amount: 199900, businessVolume: 199900, status: 'completed', commissionProcessed: true, cycleMonth: '2026-04', createdAt: '2026-04-20T09:45:00Z' },
  { _id: 's-t5', policyId: 'POL-2026-04-0185', seller: { _id: 'hcc-003', name: 'Kavita Singh', memberId: 'CB-HCC-3003' }, customerName: 'Suresh Prabhu', customerMobile: '9555666777', plan: PLANS.sampoornaSuper, amount: 399900, businessVolume: 399900, status: 'completed', commissionProcessed: true, cycleMonth: '2026-04', createdAt: '2026-04-18T14:20:00Z' },
  { _id: 's-t6', policyId: 'POL-2026-04-0170', seller: { _id: 'hcc-004', name: 'Vikash Gupta', memberId: 'CB-HCC-3004' }, customerName: 'Geeta Iyer', customerMobile: '9666777888', plan: PLANS.sampoornaSuraksha, amount: 299900, businessVolume: 299900, status: 'completed', commissionProcessed: true, cycleMonth: '2026-04', createdAt: '2026-04-15T10:00:00Z' },
  { _id: 's-t7', policyId: 'POL-2026-04-0162', seller: { _id: 'hcc-004', name: 'Vikash Gupta', memberId: 'CB-HCC-3004' }, customerName: 'Mohan Das', customerMobile: '9777888999', plan: PLANS.superSuraksha, amount: 199900, businessVolume: 199900, status: 'completed', commissionProcessed: true, cycleMonth: '2026-04', createdAt: '2026-04-12T16:30:00Z' },
  { _id: 's-t8', policyId: 'POL-2026-04-0155', seller: { _id: 'hcc-005', name: 'Rohit Verma', memberId: 'CB-HCC-3005' }, customerName: 'Lakshmi Narayan', customerMobile: '9888999000', plan: PLANS.sampoornaPremium, amount: 499900, businessVolume: 499900, status: 'completed', commissionProcessed: true, cycleMonth: '2026-04', createdAt: '2026-04-08T12:15:00Z' },
  { _id: 's-t9', policyId: 'POL-2026-04-0148', seller: { _id: 'hcc-007', name: 'Deepak Mishra', memberId: 'CB-HCC-3007' }, customerName: 'Vinod Sharma', customerMobile: '9999000111', plan: PLANS.sampoornaSuper, amount: 399900, businessVolume: 399900, status: 'completed', commissionProcessed: true, cycleMonth: '2026-04', createdAt: '2026-04-05T11:00:00Z' },
  { _id: 's-t10', policyId: 'POL-2026-04-0140', seller: { _id: 'hcc-007', name: 'Deepak Mishra', memberId: 'CB-HCC-3007' }, customerName: 'Usha Devi', customerMobile: '9000111222', plan: PLANS.superSuraksha, amount: 199900, businessVolume: 199900, status: 'completed', commissionProcessed: true, cycleMonth: '2026-04', createdAt: '2026-04-02T14:30:00Z' },
];

// ─── Monthly Performance Data (for charts) ──────────────────────────────────
export interface MonthlyPerformance {
  month: string;
  revenue: number;
  sales: number;
  overrideIncome: number;
}

export const HBA_MONTHLY_PERFORMANCE: MonthlyPerformance[] = [
  { month: 'Nov', revenue: 245000, sales: 8, overrideIncome: 38000 },
  { month: 'Dec', revenue: 312000, sales: 12, overrideIncome: 52000 },
  { month: 'Jan', revenue: 398000, sales: 15, overrideIncome: 64000 },
  { month: 'Feb', revenue: 356000, sales: 13, overrideIncome: 58000 },
  { month: 'Mar', revenue: 445000, sales: 18, overrideIncome: 72000 },
  { month: 'Apr', revenue: 384000, sales: 14, overrideIncome: 62000 },
];

export const HCM_MONTHLY_PERFORMANCE: MonthlyPerformance[] = [
  { month: 'Nov', revenue: 125000, sales: 6, overrideIncome: 18000 },
  { month: 'Dec', revenue: 178000, sales: 9, overrideIncome: 26000 },
  { month: 'Jan', revenue: 215000, sales: 11, overrideIncome: 32000 },
  { month: 'Feb', revenue: 198000, sales: 10, overrideIncome: 28000 },
  { month: 'Mar', revenue: 268000, sales: 14, overrideIncome: 42000 },
  { month: 'Apr', revenue: 232000, sales: 12, overrideIncome: 36000 },
];

// ─── Withdrawal Requests ─────────────────────────────────────────────────────
export interface WithdrawalRequest {
  _id: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  requestDate: string;
  processedDate?: string;
  transactionRef?: string;
  remarks?: string;
}

export const HBA_WITHDRAWALS: WithdrawalRequest[] = [
  { _id: 'wd-h1', amount: 500000, status: 'completed', requestDate: '2026-03-02T10:00:00Z', processedDate: '2026-03-05T10:00:00Z', transactionRef: 'TXN-2026030501234' },
  { _id: 'wd-h2', amount: 350000, status: 'completed', requestDate: '2026-02-03T10:00:00Z', processedDate: '2026-02-06T10:00:00Z', transactionRef: 'TXN-2026020604567' },
  { _id: 'wd-h3', amount: 280000, status: 'completed', requestDate: '2026-01-04T10:00:00Z', processedDate: '2026-01-07T10:00:00Z', transactionRef: 'TXN-2026010708901' },
  { _id: 'wd-h4', amount: 420000, status: 'pending', requestDate: '2026-04-02T10:00:00Z' },
];

export const HCM_WITHDRAWALS: WithdrawalRequest[] = [
  { _id: 'wd-m1', amount: 300000, status: 'completed', requestDate: '2026-03-02T10:00:00Z', processedDate: '2026-03-05T10:00:00Z', transactionRef: 'TXN-2026030509876' },
  { _id: 'wd-m2', amount: 200000, status: 'completed', requestDate: '2026-02-03T10:00:00Z', processedDate: '2026-02-06T10:00:00Z', transactionRef: 'TXN-2026020605432' },
  { _id: 'wd-m3', amount: 180000, status: 'processing', requestDate: '2026-04-02T10:00:00Z' },
];

// ─── E-Pins ──────────────────────────────────────────────────────────────────
export const HBA_EPINS: IEPin[] = [
  { _id: 'ep-h1', pinCode: 'CB-PIN-HBA-0001', plan: PLANS.superSuraksha, value: 199900, owner: 'hba-001', status: 'unused', transferHistory: [], createdAt: '2026-04-01T10:00:00Z' },
  { _id: 'ep-h2', pinCode: 'CB-PIN-HBA-0002', plan: PLANS.sampoornaSuraksha, value: 299900, owner: 'hba-001', status: 'unused', transferHistory: [], createdAt: '2026-04-01T10:00:00Z' },
  { _id: 'ep-h3', pinCode: 'CB-PIN-HBA-0003', plan: PLANS.sampoornaSuper, value: 399900, owner: 'hba-001', status: 'used', usedBy: 'hcm-001', usedDate: '2026-04-10T11:00:00Z', transferHistory: [], createdAt: '2026-03-15T10:00:00Z' },
  { _id: 'ep-h4', pinCode: 'CB-PIN-HBA-0004', plan: PLANS.sampoornaPremium, value: 499900, owner: 'hba-001', status: 'transferred', transferHistory: [{ from: 'hba-001', to: 'hcm-002', date: '2026-04-05T14:00:00Z' }], createdAt: '2026-03-10T10:00:00Z' },
  { _id: 'ep-h5', pinCode: 'CB-PIN-HBA-0005', plan: PLANS.superSuraksha, value: 199900, owner: 'hba-001', status: 'unused', transferHistory: [], createdAt: '2026-04-15T10:00:00Z' },
  { _id: 'ep-h6', pinCode: 'CB-PIN-HBA-0006', plan: PLANS.sampoornaSuraksha, value: 299900, owner: 'hba-001', status: 'unused', transferHistory: [], createdAt: '2026-04-15T10:00:00Z' },
];

export const HCM_EPINS: IEPin[] = [
  { _id: 'ep-m1', pinCode: 'CB-PIN-HCM-0001', plan: PLANS.superSuraksha, value: 199900, owner: 'hcm-001', status: 'unused', transferHistory: [], createdAt: '2026-04-05T10:00:00Z' },
  { _id: 'ep-m2', pinCode: 'CB-PIN-HCM-0002', plan: PLANS.sampoornaSuraksha, value: 299900, owner: 'hcm-001', status: 'used', usedBy: 'hcc-001', usedDate: '2026-04-12T11:00:00Z', transferHistory: [], createdAt: '2026-03-20T10:00:00Z' },
  { _id: 'ep-m3', pinCode: 'CB-PIN-HCM-0003', plan: PLANS.superSuraksha, value: 199900, owner: 'hcm-001', status: 'unused', transferHistory: [], createdAt: '2026-04-18T10:00:00Z' },
  { _id: 'ep-m4', pinCode: 'CB-PIN-HCM-0004', plan: PLANS.sampoornaSuper, value: 399900, owner: 'hcm-001', status: 'transferred', transferHistory: [{ from: 'hcm-001', to: 'hcc-003', date: '2026-04-08T14:00:00Z' }], createdAt: '2026-03-25T10:00:00Z' },
];
