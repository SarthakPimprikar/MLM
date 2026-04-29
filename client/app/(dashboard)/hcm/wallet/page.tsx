'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import WalletCard from '@/components/ui/WalletCard';
import LedgerTable from '@/components/ui/LedgerTable';
import { HCM_WALLET, HCM_LEDGER } from '@/lib/mockData';

export default function HcmWalletPage() {
  const color = '#f87171';

  return (
    <DashboardLayout pageTitle="Wallet">
      <div className="space-y-8 pb-10">
        <div>
          <h2 className="font-display text-3xl font-bold text-white tracking-tight">Wallet & Earnings</h2>
          <p className="text-sm text-muted mt-1 font-medium">Complete financial overview and transaction history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <WalletCard
              provisionalBalance={HCM_WALLET.provisionalBalance / 100}
              finalBalance={HCM_WALLET.finalBalance / 100}
              totalEarned={HCM_WALLET.totalEarned / 100}
              totalWithdrawn={HCM_WALLET.totalWithdrawn / 100}
              color={color}
              onWithdraw={() => alert('Withdrawal request feature — connect backend!')}
            />
          </div>
          <div className="lg:col-span-7">
            <div className="bg-surface border border-white/[0.07] rounded-2xl p-6 shadow-xl">
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-5">Income Breakdown</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 text-center">
                  <div className="text-[10px] text-muted font-bold uppercase tracking-widest mb-2">Direct Sales</div>
                  <div className="font-display text-xl font-bold text-blue-400">
                    ₹{(HCM_LEDGER.filter(e => e.type === 'direct').reduce((s, e) => s + e.amount, 0) / 100).toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 text-center">
                  <div className="text-[10px] text-muted font-bold uppercase tracking-widest mb-2">Override Income</div>
                  <div className="font-display text-xl font-bold text-red-400">
                    ₹{(HCM_LEDGER.filter(e => e.type === 'override').reduce((s, e) => s + e.amount, 0) / 100).toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 text-center">
                  <div className="text-[10px] text-muted font-bold uppercase tracking-widest mb-2">TDS Deducted</div>
                  <div className="font-display text-xl font-bold text-orange-400">
                    ₹{(Math.abs(HCM_LEDGER.filter(e => e.type === 'tds_deduction').reduce((s, e) => s + e.amount, 0)) / 100).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <LedgerTable entries={HCM_LEDGER} color={color} title="Complete Transaction History" />
      </div>
    </DashboardLayout>
  );
}
