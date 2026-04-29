'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function AdminWalletLedgerPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const mockLedger = [
    { id: 'PO-5000', cycle: '2026-01', role: 'HCC', amount: '₹25,751', tds: '₹5,412', status: 'PAID' },
    { id: 'PO-5001', cycle: '2026-02', role: 'HCC', amount: '₹36,176', tds: '₹432', status: 'HOLD' },
    { id: 'PO-5002', cycle: '2026-03', role: 'HCC', amount: '₹55,311', tds: '₹1,408', status: 'PROVISIONAL' },
    { id: 'PO-5003', cycle: '2026-04', role: 'Zonal Head', amount: '₹1,12,450', tds: '₹11,245', status: 'PAID' },
    { id: 'PO-5004', cycle: '2026-04', role: 'Advisor', amount: '₹8,920', tds: '₹892', status: 'PAID' },
  ];

  return (
    <DashboardLayout pageTitle="Wallet Ledger">
      <div className="space-y-6 pb-10">
        {/* Header */}
        <div>
           <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">CUREBHARAT / ADMIN / WALLET LEDGER</p>
           <h1 className="text-3xl font-bold text-[#000000] font-display">Wallet Ledger</h1>
        </div>

        {/* Filter Section */}
        <div className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
           <h3 className="text-sm font-bold font-display uppercase tracking-widest mb-6">Filter Section</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
              <div>
                 <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">LEDGER TYPE</p>
                 <select className="w-full bg-white border border-[#E1E2EC] rounded-xl px-4 py-3 text-sm font-bold text-black outline-none"><option>All</option></select>
              </div>
              <div>
                 <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">DATE FROM</p>
                 <input type="date" className="w-full bg-white border border-[#E1E2EC] rounded-xl px-4 py-3 text-sm font-bold text-black outline-none" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">DATE TO</p>
                 <input type="date" className="w-full bg-white border border-[#E1E2EC] rounded-xl px-4 py-3 text-sm font-bold text-black outline-none" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-2">VIEW</p>
                 <div className="flex gap-3">
                    <select className="flex-1 bg-white border border-[#E1E2EC] rounded-xl px-4 py-3 text-sm font-bold text-black outline-none"><option>Detailed</option></select>
                    <button className="bg-black/40 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10">Export</button>
                    <button className="bg-[#6029F1] px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#6029F1]/20">Print</button>
                 </div>
              </div>
           </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           <LedgerStat label="DIRECT CREDITS" value="₹3,55,529" trend="+12.5% this month" icon="up" />
           <LedgerStat label="OVERRIDE CREDITS" value="₹5,02,721" trend="From 42 channels" icon="swap" />
           <LedgerStat label="LEADERSHIP CREDITS" value="₹2,75,123" trend="+4.2% achievement" icon="award" />
           <LedgerStat label="TOTAL DEBITS" value="₹69,697" trend="8% tax deducted" icon="down" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           {/* Ledger Entries Table */}
           <div className="lg:col-span-8 bg-[#131241] rounded-[2rem] shadow-xl border border-white/[0.03] overflow-hidden">
              <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center">
                 <h3 className="text-xl font-bold font-display text-white">Ledger Entries</h3>
                 <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Showing 1-10 of 248 entries</span>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] border-b border-white/5">
                          <th className="px-8 py-5">ID</th>
                          <th className="px-4 py-5 text-center">CYCLE</th>
                          <th className="px-4 py-5 text-center">ROLE</th>
                          <th className="px-4 py-5 text-center">AMOUNT</th>
                          <th className="px-4 py-5 text-center">TDS</th>
                          <th className="px-8 py-5 text-right">STATUS</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                       {mockLedger.map((txn) => (
                          <tr key={txn.id} className="hover:bg-white/[0.02] transition-colors group">
                             <td className="px-8 py-6 text-[#60A5FA] font-bold text-xs tracking-tight">{txn.id}</td>
                             <td className="px-4 py-6 text-center text-xs font-bold text-white/40">{txn.cycle}</td>
                             <td className="px-4 py-6 text-center text-xs font-bold text-white/40">{txn.role}</td>
                             <td className="px-4 py-6 text-center text-sm font-black text-white">{txn.amount}</td>
                             <td className="px-4 py-6 text-center text-sm font-bold text-[#f87171]">{txn.tds}</td>
                             <td className="px-8 py-6 text-right">
                                <span className={`px-4 py-1 rounded-full text-[9px] font-black tracking-widest border ${
                                   txn.status === 'PAID' ? 'bg-[#009966]/10 text-[#009966] border-[#009966]/30' :
                                   txn.status === 'HOLD' ? 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30' :
                                   'bg-[#E65C00]/10 text-[#E65C00] border-[#E65C00]/30'
                                }`}>
                                   {txn.status}
                                </span>
                             </td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              <div className="px-8 py-5 flex items-center justify-between border-t border-white/5 bg-white/[0.01]">
                 <button className="text-[10px] font-black text-white/20 uppercase tracking-widest hover:text-white transition-colors">{'< Previous'}</button>
                 <div className="flex gap-2">
                    {[1, 2, 3].map(p => (
                      <button key={p} className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all ${p === 1 ? 'bg-[#3B82F6] text-white' : 'text-white/40 hover:text-white'}`}>
                        {p}
                      </button>
                    ))}
                 </div>
                 <button className="text-[10px] font-black text-white/20 uppercase tracking-widest hover:text-white transition-colors">{'Next >'}</button>
              </div>
           </div>

           {/* Right Column: Trend & Insights */}
           <div className="lg:col-span-4 space-y-6">
              {/* Flow Trend */}
              <div className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
                 <div className="flex justify-between items-center mb-10">
                    <h3 className="text-xl font-bold font-display">Flow Trend</h3>
                    <button className="text-white/20 hover:text-white transition-colors font-black">···</button>
                 </div>
                 <div className="h-56 relative mb-8 flex items-end justify-between px-2">
                    <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#60A5FA]/10 to-transparent rounded-xl" />
                    <svg className="absolute inset-0 w-full h-full text-[#60A5FA]" viewBox="0 0 400 200" preserveAspectRatio="none">
                       <path d="M0,160 C50,150 100,120 150,110 C200,100 250,130 300,80 C350,40 400,60 400,60 L400,200 L0,200 Z" fill="currentColor" opacity="0.1" />
                       <path d="M0,160 C50,150 100,120 150,110 C200,100 250,130 300,80 C350,40 400,60 400,60" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                       <circle cx="280" cy="85" r="5" fill="currentColor" />
                       <circle cx="340" cy="55" r="5" fill="currentColor" />
                    </svg>
                 </div>
                 <div className="flex justify-between text-[8px] font-black text-white/10 uppercase tracking-[0.2em] mb-10">
                    <span>M1</span><span>M2</span><span>M3</span><span>M4</span><span>M5</span>
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center">
                       <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]" />
                          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Total Volume</span>
                       </div>
                       <span className="text-xs font-bold text-white">₹1.2M</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Avg Settlement</span>
                       </div>
                       <span className="text-xs font-bold text-white">₹42.5K</span>
                    </div>
                 </div>
              </div>

              {/* Ledger Insights */}
              <div className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    </div>
                    <h3 className="text-sm font-bold font-display uppercase tracking-widest">Ledger Insights</h3>
                 </div>
                 <div className="space-y-4 mb-10">
                    <p className="text-xs text-white/40 leading-relaxed">
                       Cycle 2026-04 is currently being processed. Expected payout finalization in <span className="text-white font-bold">3 working days</span>.
                    </p>
                    <p className="text-xs text-white/40 leading-relaxed">
                       TDS filings for Q1 are now available for download.
                    </p>
                 </div>
                 <button className="text-[10px] font-black text-[#60A5FA] uppercase tracking-widest hover:underline">VIEW SCHEDULE</button>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function LedgerStat({ label, value, trend, icon }: any) {
  return (
    <div className="bg-[#131241] rounded-[1.5rem] p-6 text-white shadow-xl border border-white/[0.03] relative group">
       <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">{label}</p>
       <p className="text-2xl font-bold font-display mb-2">{value}</p>
       <p className={`text-[10px] font-bold ${trend.includes('+') ? 'text-[#34d399]' : 'text-white/20'}`}>{trend}</p>
       <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center opacity-40">
          {icon === 'up' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>}
          {icon === 'down' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>}
          {icon === 'swap' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 10l5 5 5-5"></path><path d="M7 14l5-5 5 5"></path></svg>}
          {icon === 'award' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9V2h12v7"></path><path d="M12 2v7"></path><rect x="6" y="9" width="12" height="6" rx="2"></rect><path d="M10 15l-2 7 4-2 4 2-2-7"></path></svg>}
       </div>
    </div>
  );
}
