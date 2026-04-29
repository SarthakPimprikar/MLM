'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import WithdrawalTable from '@/components/ui/WithdrawalTable';
import StatCard from '@/components/ui/StatCard';
import { HBA_WITHDRAWALS, HBA_WALLET } from '@/lib/mockData';

export default function HbaWithdrawalPage() {
  const color = '#3b82f6';
  const pendingAmount = HBA_WITHDRAWALS.filter(w => w.status === 'pending').reduce((sum, w) => sum + w.amount, 0);
  const completedAmount = HBA_WITHDRAWALS.filter(w => w.status === 'completed').reduce((sum, w) => sum + w.amount, 0);

  return (
    <DashboardLayout pageTitle="Withdrawal">
      <div className="space-y-8 pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold text-white tracking-tight">Withdrawal Requests</h2>
            <p className="text-sm text-muted mt-1 font-medium">Request payouts from your wallet balance</p>
          </div>
          <button className="px-6 py-3 rounded-xl bg-hba text-[#0d0f14] text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-hba/10 self-start">
            New Withdrawal Request
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard label="Available Balance" value={`₹${(HBA_WALLET.finalBalance / 100).toLocaleString('en-IN')}`} change="Ready for withdrawal" color={color} />
          <StatCard label="Pending Requests" value={`₹${(pendingAmount / 100).toLocaleString('en-IN')}`} change="Processing T+3 days" color={color} />
          <StatCard label="Total Withdrawn" value={`₹${(completedAmount / 100).toLocaleString('en-IN')}`} change="All-time payouts" color={color} />
        </div>

        <WithdrawalTable withdrawals={HBA_WITHDRAWALS} color={color} />
      </div>
    </DashboardLayout>
  );
}
