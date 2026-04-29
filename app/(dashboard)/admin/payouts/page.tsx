'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { adminAPI } from '@/lib/api';

export default function AdminPayouts() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');

  useEffect(() => {
    // Simulation of loading
    setTimeout(() => setLoading(false), 500);
  }, []);

  const mockPayouts = [
    { id: '#PAY-82910', cycle: 'Aug 2024', role: 'Consultant', amount: '₹ 1,28,400', tds: '₹ 12,840', status: 'PAID' },
    { id: '#PAY-82911', cycle: 'Aug 2024', role: 'Distributor', amount: '₹ 45,000', tds: '₹ 4,500', status: 'HOLD' },
    { id: '#PAY-82912', cycle: 'Aug 2024', role: 'Agent', amount: '₹ 22,150', tds: '₹ 2,215', status: 'PROVISIONAL' },
    { id: '#PAY-82913', cycle: 'Aug 2024', role: 'Consultant', amount: '₹ 89,000', tds: '₹ 8,900', status: 'PAID' },
  ];

  return (
    <DashboardLayout pageTitle="Payout Management">
      <div className="space-y-6 pb-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">CUREBHARAT / ADMIN / PAYOUT MANAGEMENT</p>
              <h1 className="text-3xl font-bold text-[#000000] font-display">Payout Management</h1>
           </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex flex-wrap gap-4">
           <button className="bg-[#60A5FA] px-6 py-3 rounded-xl text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#60A5FA]/20">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              Open Monthly Cycle
           </button>
           <button className="bg-[#E65C00] px-6 py-3 rounded-xl text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#E65C00]/20">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
              Run T+3 Processor
           </button>
           <button className="bg-[#009966] px-6 py-3 rounded-xl text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#009966]/20">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              Run T+5 Disbursement
           </button>
           <button className="bg-[#1c2030] px-6 py-3 rounded-xl text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-black/20">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download Payout Sheet
           </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           {/* Cycle Board */}
           <div className="lg:col-span-8 bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03] min-h-[300px] flex flex-col">
              <div className="flex justify-between items-center mb-12">
                 <h3 className="text-xl font-bold font-display">Cycle Board</h3>
                 <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Current Cycle: Aug 2024</span>
              </div>
              <div className="mt-auto">
                 <div className="flex w-full h-2 rounded-full overflow-hidden mb-4">
                    <div className="w-[30%] bg-[#60A5FA]" />
                    <div className="w-[20%] bg-[#009966]" />
                    <div className="w-[20%] bg-[#E65C00]" />
                    <div className="w-[30%] bg-[#3B82F6]" />
                 </div>
                 <div className="flex justify-between text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">
                    <span>PROVISIONAL</span>
                    <span>FINALIZED</span>
                    <span>HOLD</span>
                    <span>PAID</span>
                 </div>
              </div>
           </div>

           {/* Deduction Summary */}
           <div className="lg:col-span-4 bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
              <h3 className="text-xl font-bold font-display mb-8">Deduction Summary</h3>
              <div className="space-y-4">
                 <DeductionRow icon="%" label="TDS" value="₹ 4,52,290" />
                 <DeductionRow icon="reserve" label="Chargeback Reserve" value="₹ 1,20,000" />
                 <DeductionRow icon="edit" label="Manual Corrections" value="- ₹ 42,500" color="text-[#f87171]" />
              </div>
           </div>
        </div>

        {/* Search & Filter & Table Container */}
        <div className="bg-[#131241] rounded-[2rem] shadow-xl border border-white/[0.03] overflow-hidden">
           <div className="p-8 border-b border-white/5 flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                 <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                 <input
                   type="text"
                   placeholder="Search payout by ID/role/status"
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                   className="w-full bg-white border border-[#E1E2EC] rounded-xl pl-12 pr-4 py-3 text-sm text-black focus:outline-none"
                 />
              </div>
              <div className="flex gap-4">
                 <select 
                   value={statusFilter}
                   onChange={(e) => setStatusFilter(e.target.value)}
                   className="bg-white border border-[#E1E2EC] rounded-xl px-6 py-3 text-sm font-bold text-black outline-none min-w-[150px]"
                 >
                    <option>All Status</option>
                 </select>
                 <button className="bg-[#6029F1] px-6 py-3 rounded-xl text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#6029F1]/20">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Finalize Visible
                 </button>
              </div>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] border-b border-white/5 bg-white/[0.01]">
                       <th className="px-8 py-5">ID</th>
                       <th className="px-4 py-5">CYCLE</th>
                       <th className="px-4 py-5">ROLE</th>
                       <th className="px-4 py-5">AMOUNT</th>
                       <th className="px-4 py-5">TDS</th>
                       <th className="px-8 py-5">STATUS</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {mockPayouts.map((row) => (
                       <tr key={row.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-8 py-6 text-sm font-bold text-white/80">{row.id}</td>
                          <td className="px-4 py-6 text-xs font-bold text-white/40">{row.cycle}</td>
                          <td className="px-4 py-6 text-xs font-bold text-white/40">{row.role}</td>
                          <td className="px-4 py-6 text-sm font-black text-white">{row.amount}</td>
                          <td className="px-4 py-6 text-sm font-bold text-white/60">{row.tds}</td>
                          <td className="px-8 py-6">
                             <span className={`px-4 py-1 rounded-full text-[9px] font-black tracking-widest border ${
                                row.status === 'PAID' ? 'bg-[#009966]/10 text-[#009966] border-[#009966]/30' :
                                row.status === 'HOLD' ? 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30' :
                                'bg-[#E65C00]/10 text-[#E65C00] border-[#E65C00]/30'
                             }`}>
                                {row.status}
                             </span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>

           <div className="px-8 py-5 flex items-center justify-between border-t border-white/5 bg-white/[0.01]">
              <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                 Showing 1-10 of 26 records
              </div>
              <div className="flex items-center gap-1">
                 <button className="p-2 text-white/20 hover:text-white transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                 </button>
                 {[1, 2, 3].map(p => (
                   <button key={p} className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all ${p === 1 ? 'bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/20' : 'text-white/40 hover:text-white'}`}>
                     {p}
                   </button>
                 ))}
                 <button className="p-2 text-white/20 hover:text-white transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function DeductionRow({ icon, label, value, color = 'text-white' }: any) {
  return (
    <div className="bg-white/5 rounded-xl p-5 flex justify-between items-center border border-white/5 group hover:bg-white/[0.08] transition-all">
       <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-white/30 group-hover:text-white transition-colors">
             {icon === '%' && <span className="text-xl font-bold">%</span>}
             {icon === 'reserve' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>}
             {icon === 'edit' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>}
          </div>
          <span className="text-sm font-bold text-white/60">{label}</span>
       </div>
       <span className={`text-sm font-black ${color}`}>{value}</span>
    </div>
  );
}
