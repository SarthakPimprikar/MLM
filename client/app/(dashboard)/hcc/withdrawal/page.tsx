'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { authAPI, walletAPI } from '@/lib/api';
import { IUser, IWallet } from '@/types';

export default function WithdrawalPage() {
  const [user, setUser] = useState<Partial<IUser>>({});
  const [wallet, setWallet] = useState<Partial<IWallet>>({});
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    authAPI.getMe().then((r) => {
      setUser(r.data.data || {});
      walletAPI.getMyWallet().then((wr) => setWallet(wr.data.data || {}));
    });
  }, []);

  async function handleWithdraw(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setMsg('');
    try {
      await walletAPI.requestWithdrawal(parseFloat(amount));
      setMsg('✅ Withdrawal request submitted! It will be processed in the next cycle.');
      setAmount('');
    } catch (err: any) {
      setMsg(`❌ Error: ${err.response?.data?.message || 'Failed to submit'}`);
    } finally { setLoading(false); }
  }

  return (
    <DashboardLayout pageTitle="Withdrawal Request">
      <div className="space-y-6 max-w-md">
        <h1 className="text-white text-2xl font-bold">Withdraw Funds</h1>
        <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-1">Available for Withdrawal</p>
          <p className="text-white text-3xl font-bold mb-6">₹{(wallet.finalBalance || 0).toLocaleString('en-IN')}</p>
          
          <form onSubmit={handleWithdraw} className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm font-medium mb-1.5">Amount to Withdraw</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                min={500}
                required
                className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
              />
              <p className="text-slate-500 text-[10px] mt-1">* Minimum withdrawal: ₹500. Processing fee may apply.</p>
            </div>
            
            {msg && <p className={`text-sm ${msg.includes('✅') ? 'text-emerald-400' : 'text-red-400'}`}>{msg}</p>}
            
            <button
              type="submit"
              disabled={loading || !amount || parseFloat(amount) > (wallet.finalBalance || 0)}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-xl transition-colors disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
