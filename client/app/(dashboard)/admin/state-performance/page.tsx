'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const STATE_DATA = [
  { state: 'Maharashtra', code: 'MH', members: 6842, sales: 1240, revenue: '₹ 8.2Cr', growth: '+12.4%', topSH: 'Ramesh Patil' },
  { state: 'Delhi', code: 'DL', members: 4210, sales: 880, revenue: '₹ 4.1Cr', growth: '+8.1%', topSH: 'Anjali Mehta' },
  { state: 'Karnataka', code: 'KA', members: 3520, sales: 690, revenue: '₹ 2.8Cr', growth: '+15.6%', topSH: 'Suresh Kumar' },
  { state: 'Tamil Nadu', code: 'TN', members: 2150, sales: 415, revenue: '₹ 1.6Cr', growth: '+5.2%', topSH: 'Priya Venkat' },
  { state: 'Gujarat', code: 'GJ', members: 1420, sales: 288, revenue: '₹ 1.1Cr', growth: '+22.3%', topSH: 'Hitesh Shah' },
  { state: 'Rajasthan', code: 'RJ', members: 840, sales: 144, revenue: '₹ 0.5Cr', growth: '-2.1%', topSH: 'Mukesh Jain' },
];

export default function AdminStatePerformancePage() {
  return (
    <DashboardLayout pageTitle="State Performance">
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div className="flex justify-between items-center">
           <div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">CUREBHARAT / ADMIN / STATE PERFORMANCE</p>
              <h1 className="text-3xl font-bold text-[#000000] font-display">Regional Analytics</h1>
           </div>
           <button className="bg-[#6029F1] px-6 py-3 rounded-xl text-[10px] font-black text-white uppercase tracking-widest shadow-lg shadow-[#6029F1]/20 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
              View Map Report
           </button>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           <StateStat label="TOP STATE" value="MH" sub="Maharashtra Lead" icon="trophy" color="text-[#fbbf24]" />
           <StateStat label="TOTAL REVENUE" value="₹18.4Cr" sub="Across all states" icon="revenue" color="text-[#34d399]" />
           <StateStat label="MEMBER GROWTH" value="+15.2%" sub="Last 30 days" icon="growth" color="text-[#60A5FA]" />
           <StateStat label="ACTIVE STATES" value="12" sub="Pan-India Presence" icon="map" color="text-[#6029F1]" />
        </div>

        {/* Leaderboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {STATE_DATA.slice(0, 3).map((s, idx) => (
              <div key={s.code} className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03] relative group overflow-hidden">
                 <div className="absolute top-2 right-4 text-7xl font-display font-black text-white/[0.03] italic">#{idx + 1}</div>
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-display font-black text-[#60A5FA]">{s.code}</div>
                    <div>
                       <h3 className="text-xl font-bold font-display">{s.state}</h3>
                       <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">SH: {s.topSH}</p>
                    </div>
                 </div>
                 <div className="flex justify-between items-end">
                    <div>
                       <p className="text-3xl font-bold font-display text-white">{s.revenue}</p>
                       <p className="text-[10px] font-black text-[#34d399] uppercase tracking-widest">{s.growth} GROWTH</p>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-bold text-white/60">{s.members}</p>
                       <p className="text-[9px] font-black text-white/20 uppercase">Members</p>
                    </div>
                 </div>
              </div>
           ))}
        </div>

        {/* Full Performance Table */}
        <div className="bg-[#131241] rounded-[2rem] shadow-xl border border-white/[0.03] overflow-hidden">
           <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-xl font-bold font-display text-white">Full State Performance</h3>
              <div className="flex bg-black/40 p-1 rounded-xl">
                 <button className="px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest bg-white/10 text-white">REVENUE</button>
                 <button className="px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white">MEMBERS</button>
              </div>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] border-b border-white/5 bg-white/[0.01]">
                       <th className="px-8 py-5">STATE / SH</th>
                       <th className="px-4 py-5 text-center">MEMBERS</th>
                       <th className="px-4 py-5 text-center">SALES</th>
                       <th className="px-4 py-5">REVENUE SHARE</th>
                       <th className="px-8 py-5 text-right">GROWTH</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {STATE_DATA.map((s, idx) => (
                       <tr key={s.code} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-4">
                                <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-white/40">{s.code}</div>
                                <div>
                                   <div className="text-sm font-bold text-white">{s.state}</div>
                                   <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">SH: {s.topSH}</div>
                                </div>
                             </div>
                          </td>
                          <td className="px-4 py-6 text-center text-sm font-bold text-white/60">{s.members}</td>
                          <td className="px-4 py-6 text-center text-sm font-bold text-white/60">{s.sales}</td>
                          <td className="px-4 py-6">
                             <div className="flex items-center gap-4">
                                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                   <div className="h-full bg-[#6029F1] rounded-full" style={{ width: `${100 - idx * 15}%` }} />
                                </div>
                                <span className="text-sm font-black text-white">{s.revenue}</span>
                             </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                             <span className={`text-xs font-black ${s.growth.includes('-') ? 'text-[#f87171]' : 'text-[#34d399]'}`}>{s.growth}</span>
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

function StateStat({ label, value, sub, icon, color }: any) {
  return (
    <div className="bg-[#131241] rounded-[1.5rem] p-6 text-white shadow-xl border border-white/[0.03] relative group">
       <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">{label}</p>
       <p className="text-3xl font-bold font-display mb-2">{value}</p>
       <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{sub}</p>
       <div className={`absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center opacity-40 ${color}`}>
          {icon === 'trophy' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9V2h12v7"></path><path d="M12 2v7"></path><rect x="6" y="9" width="12" height="6" rx="2"></rect><path d="M10 15l-2 7 4-2 4 2-2-7"></path></svg>}
          {icon === 'revenue' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>}
          {icon === 'growth' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>}
          {icon === 'map' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon></svg>}
       </div>
    </div>
  );
}
