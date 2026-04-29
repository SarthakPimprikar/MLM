'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/lib/auth';
import { walletAPI, salesAPI } from '@/lib/api';
import { IWallet, ISale } from '@/types';
import RevenueChart from '@/components/dashboard/sh/RevenueChart';
import IncomeMixGauge from '@/components/dashboard/sh/IncomeMixGauge';
import { ROLE_COLORS } from '@/lib/constants';

export default function StateHeadDashboard() {
  const { user } = useAuth();
  const [wallet, setWallet] = useState<IWallet | null>(null);
  const [stateSales, setStateSales] = useState<ISale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [walletRes, salesRes] = await Promise.all([
          walletAPI.getMyWallet(),
          salesAPI.getAll({ page: 1, limit: 10 }),
        ]);
        
        if (walletRes.data.success) setWallet(walletRes.data.data || null);
        if (salesRes.data.success) setStateSales(salesRes.data.data || []);
      } catch (err) {
        console.error('SH dashboard data fetch failed', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (!user) return null;

  return (
    <DashboardLayout pageTitle="Dashboard">
      <div className="space-y-6 pb-10">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#1E293B] tracking-tight">State Head</h2>
            <p className="text-sm text-[#64748B] mt-1 font-medium opacity-70">Real-time infrastructure and development lifecycle monitoring.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} alt="avatar" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#1E293B] flex items-center justify-center text-[10px] font-bold text-white">
                  +12
                </div>
             </div>
             <div className="h-4 w-[1px] bg-slate-200 mx-2" />
             <button className="bg-[#60A5FA] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-blue-200 hover:bg-blue-600 transition-all">
                Export Data
             </button>
          </div>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
           {[
             { label: 'Logged in Role', value: 'SH', color: 'blue' },
             { label: 'Personal Sales', value: '₹3,70,548', color: 'emerald' },
             { label: 'Team Size', value: user.teamSize || '4', color: 'blue' },
             { label: 'Compliance', value: '99%', color: 'amber' },
           ].map((stat, i) => (
             <div key={i} className="bg-[#131241] border border-white/5 p-6 rounded-[24px] shadow-xl transition-all duration-300">
                <p className="text-[10px] text-[#B5B8BD] font-bold uppercase tracking-widest mb-6">{stat.label}</p>
                <h3 className="text-3xl font-bold text-white tracking-tight">{stat.value}</h3>
             </div>
           ))}
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-9 bg-[#131241] border border-white/5 rounded-[24px] p-8 shadow-2xl">
             <div className="flex items-center justify-between mb-10">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Role-Based Analytics</h3>
             </div>
             <RevenueChart />
          </div>

          <div className="lg:col-span-3 bg-[#131241] border border-white/5 rounded-[24px] p-8 shadow-2xl flex flex-col items-center">
             <h3 className="w-full text-sm font-bold text-white uppercase tracking-wider mb-8 text-left">Income Mix</h3>
             <IncomeMixGauge />
          </div>
        </div>

        {/* Activity & Promotion Pulse */}
        <div className="bg-[#131241] border border-white/5 rounded-[24px] p-8 shadow-2xl">
           <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-10">Activity & Promotion Pulse</h3>
           
           <div className="space-y-8 max-w-4xl">
              <div>
                 <div className="flex justify-between text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest mb-2">
                    <span>Monthly Activity</span>
                    <span className="text-white">85%</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#60A5FA] rounded-full shadow-[0_0_10px_rgba(96,165,250,0.5)]" style={{ width: '85%' }} />
                 </div>
              </div>
              <div>
                 <div className="flex justify-between text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest mb-2">
                    <span>Promotion Readiness</span>
                    <span className="text-white">60%</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(129,140,248,0.5)]" style={{ width: '60%' }} />
                 </div>
              </div>
           </div>

           <div className="mt-10 p-4 bg-white/2 border border-white/5 rounded-[12px] flex items-center gap-4">
              <div className="text-amber-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              </div>
              <p className="text-[11px] font-medium text-[#B5B8BD]">Current cycle activity is on track for payout and promotion review.</p>
           </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-[#131241] border border-white/5 rounded-[24px] shadow-2xl overflow-hidden">
           <div className="px-8 py-6 border-b border-white/5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Transactions</h3>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
                <thead>
                   <tr className="bg-white/1 border-b border-white/5">
                      <th className="px-8 py-4 text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest">TRX ID</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest">Cycle</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest">Type</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest">Amount</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest">Status</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/3">
                   {[
                     { id: '#TRX-9982', cycle: 'Oct W4', type: 'Direct Comm', amount: '$1,250.00', status: 'PAID' },
                     { id: '#TRX-9981', cycle: 'Oct W4', type: 'Rank Bonus', amount: '$500.00', status: 'PAID' },
                     { id: '#TRX-9980', cycle: 'Oct W3', type: 'Team Override', amount: '$3,420.50', status: 'PENDING' },
                     { id: '#TRX-9979', cycle: 'Oct W3', type: 'Direct Comm', amount: '$850.00', status: 'PAID' },
                   ].map((trx, i) => (
                     <tr key={i} className="hover:bg-white/1 transition-colors">
                        <td className="px-8 py-4 text-[11px] font-bold text-white">{trx.id}</td>
                        <td className="px-8 py-4 text-[11px] font-bold text-[#B5B8BD]">{trx.cycle}</td>
                        <td className="px-8 py-4 text-[11px] font-bold text-[#B5B8BD]">{trx.type}</td>
                        <td className="px-8 py-4 text-[11px] font-bold text-white">{trx.amount}</td>
                        <td className="px-8 py-4">
                           <span className={`text-[8px] font-bold px-2 py-0.5 rounded-sm ${
                             trx.status === 'PAID' ? 'bg-[#60A5FA]/20 text-[#60A5FA]' : 'bg-amber-400/20 text-amber-400'
                           }`}>
                             {trx.status}
                           </span>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
