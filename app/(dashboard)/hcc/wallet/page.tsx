'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WalletCard from '@/components/ui/WalletCard';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/components/ui/Toast';
import { walletAPI } from '@/lib/api';
import { IWallet, ILedgerEntry } from '@/types';

export default function HCCWallet() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<IWallet | null>(null);
  const [loading, setLoading] = useState(true);

  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawing, setWithdrawing] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    async function fetchWallet() {
      try {
        const res = await walletAPI.getMyWallet();
        if (res.data.success) setWallet(res.data.data || null);
      } catch (err) {
        console.error('Wallet fetch failed', err);
      } finally {
        setLoading(false);
      }
    }
    fetchWallet();
  }, []);

  const handleWithdraw = async () => {
    const amount = parseInt(withdrawAmount);
    if (!amount || amount < 500) {
      addToast({ message: 'Minimum withdrawal is ₹500', type: 'warning' });
      return;
    }
    setWithdrawing(true);
    try {
      const res = await walletAPI.requestWithdrawal(amount * 100);
      if (res.data.success) {
        addToast({ message: 'Withdrawal requested successfully', type: 'success' });
        setShowWithdraw(false);
        setWithdrawAmount('');
        // Refresh wallet
        const res2 = await walletAPI.getMyWallet();
        if (res2.data.success) setWallet(res2.data.data || null);
      }
    } catch (err: any) {
      addToast({ message: err.response?.data?.message || 'Withdrawal failed', type: 'error' });
    } finally {
      setWithdrawing(false);
    }
  };

  const formatAmount = (val: number) =>
    `₹${(val).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

  const getLedgerIcon = (type: string) => {
    switch (type) {
      case 'direct': return '💰';
      case 'override': return '📈';
      case 'leadership': return '⭐';
      case 'withdrawal': return '📤';
      case 'tds_deduction': return '📋';
      default: return '📄';
    }
  };

  return (
    <DashboardLayout pageTitle="Earnings & Wallet">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Wallet Summary */}
        <div className="lg:col-span-4 space-y-6">
          {wallet && (
            <WalletCard
              provisionalBalance={wallet.provisionalBalance / 100}
              finalBalance={wallet.finalBalance / 100}
              totalEarned={wallet.totalEarned / 100}
              totalWithdrawn={wallet.totalWithdrawn / 100}
              color="#60a5fa"
              onWithdraw={() => setShowWithdraw(true)}
            />
          )}

          <div className="bg-surface border border-white/[0.07] rounded-2xl p-6">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Financial Guidelines</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-[10px] text-muted leading-relaxed">
                <span className="text-hcc">•</span>
                <span>Provisional income is credited instantly but finalized on the 5th of every month.</span>
              </li>
              <li className="flex items-start gap-2 text-[10px] text-muted leading-relaxed">
                <span className="text-hcc">•</span>
                <span>TDS is deducted as per Indian Income Tax rules (5% with PAN).</span>
              </li>
              <li className="flex items-start gap-2 text-[10px] text-muted leading-relaxed">
                <span className="text-hcc">•</span>
                <span>Minimum withdrawal limit is ₹500.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Ledger / Transaction History */}
        <div className="lg:col-span-8">
          <div className="bg-surface border border-white/[0.07] rounded-2xl overflow-hidden shadow-2xl h-full flex flex-col">
            <div className="px-6 py-5 border-b border-white/[0.07] flex items-center justify-between bg-white/[0.01]">
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                Transaction History
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[600px] custom-scrollbar">
              {loading ? (
                <div className="p-20 flex justify-center">
                  <div className="w-6 h-6 border-2 border-hcc border-t-transparent rounded-full animate-spin" />
                </div>
              ) : !wallet || wallet.ledger.length === 0 ? (
                <div className="p-20 text-center">
                  <p className="text-xs text-muted font-bold uppercase tracking-widest">No transactions found</p>
                </div>
              ) : (
                <div className="divide-y divide-white/[0.04]">
                  {wallet.ledger.map((entry: ILedgerEntry) => (
                    <div key={entry._id} className="px-6 py-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                        {getLedgerIcon(entry.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-white font-bold truncate tracking-tight uppercase">
                          {entry.type.replace('_', ' ')}
                        </div>
                        <div className="text-[10px] text-muted font-medium mt-0.5 truncate">
                          {entry.description}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-black tracking-tighter ${entry.amount > 0 ? 'text-sh' : 'text-hcm'}`}>
                          {entry.amount > 0 ? '+' : ''} {formatAmount(entry.amount / 100)}
                        </div>
                        <div className="text-[10px] text-muted font-bold mt-0.5 uppercase">
                          {new Date(entry.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                      <div className="pl-2">
                        <div className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${entry.status === 'provisional' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-sh/10 text-sh border border-sh/20'}`}>
                          {entry.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawal Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-[#0d0f14]/80 backdrop-blur-md" onClick={() => !withdrawing && setShowWithdraw(false)} />
           <div className="relative w-full max-w-md bg-surface border border-white/10 rounded-[32px] p-8 shadow-2xl animate-in zoom-in-95 duration-300">
              <h3 className="font-display text-xl font-bold text-white mb-6">Request Payout</h3>
              <div className="space-y-6">
                 <div>
                    <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-2">Withdrawal Amount (₹)</p>
                    <input 
                      type="number"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      placeholder="Min 500"
                      className="w-full bg-surface2 border border-white/10 rounded-2xl px-6 py-4 text-xl font-display font-bold text-white outline-none focus:border-hcc/50"
                    />
                    <p className="text-[9px] text-muted font-bold mt-2 uppercase tracking-tighter">Available: {formatAmount(wallet!.finalBalance / 100)}</p>
                 </div>

                 <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-2">Settlement Account</p>
                    <p className="text-sm font-bold text-white">{user?.kycDocuments?.bankName || 'No bank added'}</p>
                    <p className="text-[10px] font-mono text-muted mt-1 uppercase">{user?.kycDocuments?.accountNumber || 'Check KYC status'}</p>
                 </div>

                 <button 
                   disabled={withdrawing || !withdrawAmount || parseInt(withdrawAmount) < 500}
                   onClick={handleWithdraw}
                   className="w-full py-5 rounded-2xl bg-hcc text-[#0d0f14] font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-hcc/10"
                 >
                   {withdrawing ? 'Processing...' : 'Confirm Withdrawal'}
                 </button>
              </div>
           </div>
        </div>
      )}
    </DashboardLayout>
  );
}
