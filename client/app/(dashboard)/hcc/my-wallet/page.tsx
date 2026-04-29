'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WalletCard from '@/components/ui/WalletCard';
import { authAPI, walletAPI } from '@/lib/api';
import { IUser, IWallet, ILedgerEntry } from '@/types';

const TYPE_LABELS: Record<string, string> = {
  direct: '🟢 Direct Commission',
  override: '🔵 Override Income',
  leadership: '🏆 Leadership Bonus',
  withdrawal: '🔴 Withdrawal',
  tds_deduction: '📋 TDS Deduction',
};

export default function HccWalletPage() {
  const [user, setUser] = useState<Partial<IUser>>({});
  const [wallet, setWallet] = useState<Partial<IWallet>>({});
  const [ledger, setLedger] = useState<ILedgerEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authAPI.getMe().then((r) => {
      const u = r.data.data; // Note: api.ts returns ApiResponse<IUser> where data is IUser
      if (u) {
        setUser(u);
        walletAPI.getMyWallet().then((wr) => {
          setWallet(wr.data.data || {});
          setLedger(wr.data.data?.ledger || []);
        }).finally(() => setLoading(false));
      }
    }).catch(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout pageTitle="My Wallet">
      <div className="space-y-6">
        <div>
          <h1 className="text-white text-2xl font-bold">My Wallet</h1>
          <p className="text-slate-400 text-sm">Track your earnings and transactions</p>
        </div>

        <div className="max-w-sm">
          <WalletCard
            provisionalBalance={wallet.provisionalBalance || 0}
            finalBalance={wallet.finalBalance || 0}
            totalEarned={wallet.totalEarned || 0}
            totalWithdrawn={wallet.totalWithdrawn || 0}
            color="#60a5fa"
            onWithdraw={() => window.location.href = '/hcc/withdrawal'}
          />
        </div>

        {/* Ledger */}
        <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5">
          <h2 className="text-white font-semibold mb-4">Transaction History</h2>
          {loading ? (
            <p className="text-slate-500 text-sm text-center py-8">Loading...</p>
          ) : ledger.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-8">No transactions yet</p>
          ) : (
            <div className="space-y-2">
              {ledger.map((entry, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-slate-700/50 last:border-0">
                  <div>
                    <p className="text-white text-sm font-medium">{TYPE_LABELS[entry.type] || entry.type}</p>
                    <p className="text-slate-500 text-xs">{entry.description}</p>
                    <p className="text-slate-600 text-xs">{entry.cycleMonth}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-sm ${entry.amount >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {entry.amount >= 0 ? '+' : ''}₹{Math.abs(entry.amount).toLocaleString('en-IN')}
                    </p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${entry.status === 'provisional' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                      {entry.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
