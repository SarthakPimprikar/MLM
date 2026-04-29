'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import WalletCard from '@/components/ui/WalletCard';
import LedgerTable from '@/components/ui/LedgerTable';
import { HBA_WALLET, HBA_LEDGER } from '@/lib/mockData';

export default function HbaWalletPage() {
  const color = '#3b82f6';

  return (
    <DashboardLayout pageTitle="Wallet">
      <div className="space-y-8 pb-10">
        <div>
          <h2 className="font-display text-3xl font-bold text-black tracking-tight">Wallet & Earnings</h2>
          <p className="text-sm text-muted mt-1 font-medium">Complete financial overview and transaction history</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <WalletCard
              provisionalBalance={HBA_WALLET.provisionalBalance / 100}
              finalBalance={HBA_WALLET.finalBalance / 100}
              totalEarned={HBA_WALLET.totalEarned / 100}
              totalWithdrawn={HBA_WALLET.totalWithdrawn / 100}
              color={color}
              onWithdraw={() => alert('Withdrawal request feature — connect backend!')}
            />
          </div>
          <div className="lg:col-span-7">
            {/* Income Breakdown */}
            <div className="bg-surface border border-white/[0.07] rounded-2xl p-6 shadow-xl">
              <h3 className="font-display text-sm font-bold text-black uppercase tracking-wider mb-5">Income Breakdown</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 text-center">
                  <div className="text-[10px] text-muted font-bold uppercase tracking-widest mb-2">Direct Sales</div>
                  <div className="font-display text-xl font-bold text-blue-400">
                    ₹{(HBA_LEDGER.filter(e => e.type === 'direct').reduce((s, e) => s + e.amount, 0) / 100).toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 text-center">
                  <div className="text-[10px] text-muted font-bold uppercase tracking-widest mb-2">Override Income</div>
                  <div className="font-display text-xl font-bold text-amber-400">
                    ₹{(HBA_LEDGER.filter(e => e.type === 'override').reduce((s, e) => s + e.amount, 0) / 100).toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 text-center">
                  <div className="text-[10px] text-muted font-bold uppercase tracking-widest mb-2">TDS Deducted</div>
                  <div className="font-display text-xl font-bold text-red-400">
                    ₹{(Math.abs(HBA_LEDGER.filter(e => e.type === 'tds_deduction').reduce((s, e) => s + e.amount, 0)) / 100).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <LedgerTable entries={HBA_LEDGER} color={color} title="Complete Transaction History" />
      </div>
    </DashboardLayout>
  );
}
