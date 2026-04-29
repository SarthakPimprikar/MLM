'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { walletAPI } from '@/lib/api';
import { ILedgerEntry } from '@/types';

export default function ShRevenuePage() {
  const [ledger, setLedger] = useState<ILedgerEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLedger() {
      try {
        const res = await walletAPI.getMyWallet();
        if (res.data.success) {
          setLedger(res.data.data?.ledger || []);
        }
      } catch (err) {
        console.error('Failed to fetch ledger', err);
      } finally {
        setLoading(false);
      }
    }
    fetchLedger();
  }, []);

  return (
    <DashboardLayout pageTitle="State Revenue Analytics">
      <div className="space-y-8">
        {/* Summary Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-surface border border-white/[0.07] p-8 rounded-[32px] shadow-xl">
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-2">Total State BV</p>
              <h3 className="text-3xl font-display font-bold text-white">₹0.00</h3>
              <p className="text-[10px] text-sh font-bold mt-2">▲ 0% from last month</p>
           </div>
           <div className="bg-surface border border-white/[0.07] p-8 rounded-[32px] shadow-xl">
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-2">Leadership Dividends</p>
              <h3 className="text-3xl font-display font-bold text-sh">₹0.00</h3>
              <p className="text-[10px] text-muted font-bold mt-2">2% of state volume</p>
           </div>
           <div className="bg-surface border border-white/[0.07] p-8 rounded-[32px] shadow-xl">
              <p className="text-[10px] text-muted font-bold uppercase tracking-widest mb-2">Cycle Settlement</p>
              <h3 className="text-3xl font-display font-bold text-white">Pending</h3>
              <p className="text-[10px] text-muted font-bold mt-2">Next payout: 05 May</p>
           </div>
        </div>

        {/* Detailed Ledger */}
        <div className="bg-surface border border-white/[0.07] rounded-[32px] overflow-hidden shadow-2xl">
          <div className="px-8 py-6 border-b border-white/[0.07] flex items-center justify-between">
            <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">Revenue Ledger</h3>
            <div className="flex gap-4">
               <select className="bg-bg border border-white/[0.1] rounded-xl px-4 py-2 text-[10px] text-white font-bold outline-none">
                  <option>All Types</option>
                  <option>Direct Commission</option>
                  <option>Leadership Bonus</option>
               </select>
            </div>
          </div>
          
          <div className="divide-y divide-white/[0.04]">
            {ledger.length === 0 ? (
              <div className="px-8 py-20 text-center opacity-30">
                <div className="text-5xl mb-4">📜</div>
                <p className="text-xs font-bold uppercase tracking-widest">No revenue records found</p>
                <p className="text-[10px] mt-1">Transaction history will appear here once sales are processed</p>
              </div>
            ) : (
              ledger.map((entry) => (
                <div key={entry._id} className="px-8 py-5 flex items-center justify-between hover:bg-white/[0.01] transition-all">
                  <div className="flex items-center gap-5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold ${
                      entry.amount > 0 ? 'bg-sh/10 text-sh' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {entry.type === 'withdrawal' ? 'W' : 'C'}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{entry.description}</div>
                      <div className="text-[10px] text-muted font-medium mt-0.5">{new Date(entry.date).toLocaleDateString()} • {entry.cycleMonth}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-black tracking-tight ${entry.amount > 0 ? 'text-sh' : 'text-white'}`}>
                      {entry.amount > 0 ? '+' : ''}₹{(entry.amount / 100).toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-muted font-bold uppercase tracking-widest mt-0.5">{entry.status}</div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {loading && (
            <div className="p-20 text-center">
              <div className="w-8 h-8 border-4 border-sh border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
