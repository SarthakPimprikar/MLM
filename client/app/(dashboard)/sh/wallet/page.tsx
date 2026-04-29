'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState('All Buckets');

  const allocationData = [
    { name: 'Direct', value: 60, color: '#60A5FA' },
    { name: 'Override', value: 23, color: '#3b82f6' },
    { name: 'Leadership', value: 17, color: '#fb923c' },
  ];

  const transactions = [
    { id: 'TX-9824', cycle: 'C42', role: 'SH' },
    { id: 'TX-9823', cycle: 'C42', role: 'MD' },
    { id: 'TX-9822', cycle: 'C42', role: 'SH' },
    { id: 'TX-9821', cycle: 'C41', role: 'SH' },
    { id: 'TX-9820', cycle: 'C41', role: 'MD' },
  ];

  return (
    <DashboardLayout pageTitle="Wallet">
      <div className="space-y-6 pb-20">
        
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-[#1E293B] tracking-tight">Wallet</h2>
          <p className="text-sm text-[#64748B] font-medium opacity-70">Real-time overview of platform liquidity and distributor payouts.</p>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'Direct Income', value: '₹83,680', change: '+12.5%', positive: true },
             { label: 'Override Income', value: '₹31,924', change: '+1.5%', positive: true },
             { label: 'Leadership Income', value: '₹23,685', change: '+12.5%', positive: true },
             { label: 'Pending Payout', value: '₹66,278', sub: 'Rahul .S', amount: '₹850k' },
           ].map((stat, i) => (
             <div key={i} className="bg-[#131241] rounded-[20px] p-6 shadow-2xl border border-white/5">
                <p className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest mb-1">{stat.label}</p>
                <h4 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h4>
                {stat.change ? (
                  <p className="text-[10px] font-bold text-emerald-400 mt-2 flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                    {stat.change} vs last month
                  </p>
                ) : (
                  <div className="flex items-center justify-between mt-2">
                     <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] font-black text-white">R</div>
                        <span className="text-[10px] font-bold text-[#B5B8BD]">{stat.sub}</span>
                     </div>
                     <span className="text-[10px] font-bold text-white opacity-40">{stat.amount}</span>
                  </div>
                )}
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           
           {/* Transaction Table Area */}
           <div className="lg:col-span-8 bg-[#131241] rounded-[20px] shadow-2xl border border-white/5 flex flex-col min-h-[600px]">
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                 <div className="flex gap-1 bg-white/5 p-1 rounded-xl">
                    {['All Buckets', 'Cycle 42', 'Cycle 41'].map((tab) => (
                       <button 
                         key={tab}
                         onClick={() => setActiveTab(tab)}
                         className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white'}`}
                       >
                         {tab}
                       </button>
                    ))}
                 </div>
                 <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Filter ID or Role..."
                      className="bg-white/2 border border-white/5 rounded-xl px-4 py-2 text-[10px] text-white outline-none w-48 placeholder:text-slate-700"
                    />
                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                 </div>
              </div>
              
              <div className="flex-1 overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="border-b border-white/5 text-[10px] font-bold text-[#B5B8BD] uppercase tracking-[0.2em]">
                          <th className="px-10 py-5 w-16 text-center">
                             <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-transparent text-[#60A5FA] focus:ring-0" />
                          </th>
                          <th className="px-6 py-5">TXN ID</th>
                          <th className="px-6 py-5">CYCLE</th>
                          <th className="px-6 py-5">ROLE</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/2">
                       {transactions.map((txn, i) => (
                         <tr key={i} className="hover:bg-white/1 transition-colors">
                            <td className="px-10 py-6 text-center">
                               <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-transparent text-[#60A5FA] focus:ring-0" />
                            </td>
                            <td className="px-6 py-6 text-xs font-bold text-[#60A5FA] font-mono">
                               {txn.id}
                            </td>
                            <td className="px-6 py-6 text-xs font-bold text-white uppercase opacity-60">
                               {txn.cycle}
                            </td>
                            <td className="px-6 py-6 text-xs font-bold text-white uppercase">
                               {txn.role}
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>

              {/* Pagination */}
              <div className="px-10 py-5 border-t border-white/5 flex items-center justify-between">
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Showing <span className="text-white">1-5</span> of 342 entries</p>
                 <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 hover:text-white transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                    <button className="w-8 h-8 rounded-lg bg-[#60A5FA]/20 text-[#60A5FA] text-xs font-black">1</button>
                    <button className="w-8 h-8 rounded-lg text-xs font-bold text-slate-500 hover:text-white">2</button>
                    <button className="w-8 h-8 rounded-lg text-xs font-bold text-slate-500 hover:text-white">3</button>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 hover:text-white transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
                 </div>
              </div>
           </div>

           {/* Sidebar Analytics */}
           <div className="lg:col-span-4 space-y-6">
              
              {/* Allocation */}
              <div className="bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Allocation</h3>
                    <button className="text-slate-500"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                 </div>
                 
                 <div className="h-[220px] relative mb-10">
                    <ResponsiveContainer width="100%" height="100%">
                       <PieChart>
                          <Pie
                             data={allocationData}
                             innerRadius={70}
                             outerRadius={95}
                             paddingAngle={5}
                             dataKey="value"
                             stroke="none"
                          >
                             {allocationData.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={entry.color} />
                             ))}
                          </Pie>
                       </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <span className="text-4xl font-bold text-white">84%</span>
                       <span className="text-[8px] font-black text-[#B5B8BD] uppercase tracking-widest mt-1">Efficiency</span>
                    </div>
                 </div>

                 <div className="space-y-4">
                    {allocationData.map((s, i) => (
                       <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                             <span className="text-xs font-bold text-[#B5B8BD]">{s.name}</span>
                          </div>
                          <span className="text-xs font-bold text-white">{s.value}%</span>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Auto-Sync Logs */}
              <div className="bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-8 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                    Auto-Sync Logs
                 </h3>
                 
                 <div className="space-y-8 relative ml-1">
                    <div className="absolute left-[-1px] top-2 bottom-2 w-[1px] bg-white/5" />
                    
                    {[
                      { title: 'Ledger Correction Applied', time: '10:42 AM', desc: 'Adjusted ID #9928 due to cycle overlap. +₹450 credited to reserve.' },
                      { title: 'Batch Payout Initiated', time: '09:00 AM', desc: 'Cycle 41 payouts dispatched via API. Awaiting bank confirmation.' },
                      { title: 'Daily Snapshot Generated', time: '00:01 AM', desc: 'System automated backup completed for Finance DB.' },
                    ].map((log, i) => (
                      <div key={i} className="relative pl-6">
                         <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-[#60A5FA]/40" />
                         <div className="flex justify-between items-start mb-1">
                            <p className="text-[11px] font-bold text-white">{log.title}</p>
                            <span className="text-[9px] font-bold text-[#64748B]">{log.time}</span>
                         </div>
                         <p className="text-[10px] text-[#64748B] font-medium leading-relaxed">{log.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>

           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
