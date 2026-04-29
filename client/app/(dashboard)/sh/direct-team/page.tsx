'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function DirectTeamPage() {
  const [page, setPage] = useState(1);

  const teamData = [
    { id: 'CB-84920', initials: 'RA', name: 'Rahul Agarwal', role: 'Zonal Director', sponsor: 'Self (Root)', location: 'Maharashtra', totalSales: '₹14,50,000', comm: '₹85,000' },
    { id: 'CB-84921', initials: 'PS', name: 'Priya Sharma', role: 'Area Manager', sponsor: 'CB-84920', location: 'Delhi', totalSales: '₹8,20,000', comm: '₹42,000' },
    { id: 'CB-84925', initials: 'VK', name: 'Vikram Kumar', role: 'Distributor', sponsor: 'Self (Root)', location: 'Karnataka', totalSales: '₹3,40,000', comm: '₹18,000' },
    { id: 'CB-84930', initials: 'SN', name: 'Sneha Nair', role: 'Regional Lead', sponsor: 'CB-84920', location: 'Kerala', totalSales: '₹5,60,000', comm: '₹31,000' },
  ];

  const statusSplit = [
    { name: 'Active', value: 210, color: '#60A5FA' },
    { name: 'Pending KYC', value: 25, color: '#64748B' },
    { name: 'Deactivated', value: 13, color: '#f87171' },
  ];

  return (
    <DashboardLayout pageTitle="Direct Team">
      <div className="space-y-6 pb-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-[#1E293B] tracking-tight">Direct Team</h2>
            <p className="text-sm text-[#64748B] font-medium opacity-70">View team structure, track growth, and monitor network performance in real time.</p>
          </div>
          <div className="flex gap-3">
             <button className="flex items-center gap-2 bg-[#131241] text-white px-5 py-2.5 rounded-xl text-xs font-bold border border-white/5 hover:bg-white/5 transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Export CSV
             </button>
             <button className="flex items-center gap-2 bg-[#60A5FA] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-blue-200 hover:bg-blue-600 transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                Send Reminder
             </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-[#131241] border border-white/5 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4">
           <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-[0.2em]">Filter By:</span>
              <div className="flex gap-2">
                 <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[11px] font-bold text-white outline-none cursor-pointer">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Pending KYC</option>
                 </select>
                 <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[11px] font-bold text-white outline-none cursor-pointer">
                    <option>All States</option>
                    <option>Maharashtra</option>
                    <option>Delhi</option>
                 </select>
              </div>
           </div>
           <div className="text-[11px] font-bold text-[#B5B8BD] uppercase tracking-wider">
              Showing <span className="text-white">1-15</span> of <span className="text-white">248</span> Recruits
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           
           {/* Recruits Table */}
           <div className="lg:col-span-8 bg-[#131241] rounded-[24px] shadow-2xl border border-white/5 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="bg-white/2 border-b border-white/5">
                          <th className="px-6 py-4 text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest">Member ID</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest">Name & Role</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest">Sponsor</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest">Location</th>
                          <th className="px-6 py-4 text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest text-right">Total Sales</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/2">
                       {teamData.map((member, i) => (
                         <tr key={i} className="hover:bg-white/1 transition-colors">
                            <td className="px-6 py-5">
                               <span className="text-xs font-mono font-bold text-[#60A5FA]">{member.id}</span>
                            </td>
                            <td className="px-6 py-5">
                               <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-black text-[#B5B8BD]">{member.initials}</div>
                                  <div>
                                     <p className="text-sm font-bold text-white leading-tight">{member.name}</p>
                                     <p className="text-[10px] text-[#64748B] font-bold mt-1 uppercase tracking-tighter">{member.role}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="px-6 py-5 text-xs font-bold text-[#B5B8BD]">
                               {member.sponsor}
                            </td>
                            <td className="px-6 py-5 text-xs font-bold text-white uppercase">
                               {member.location}
                            </td>
                            <td className="px-6 py-5 text-right">
                               <div className="text-sm font-bold text-white">{member.totalSales}</div>
                               <div className="text-[10px] font-bold text-emerald-400 mt-1">{member.comm}</div>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
              
              {/* Pagination */}
              <div className="px-8 py-5 border-t border-white/5 bg-white/1 flex items-center justify-between">
                 <button className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    Prev
                 </button>
                 <div className="flex gap-2">
                    {[1, 2, 3, '...', 17].map((n, i) => (
                       <button key={i} className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${n === 1 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-white'}`}>
                          {n}
                       </button>
                    ))}
                 </div>
                 <button className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-2">
                    Next
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                 </button>
              </div>
           </div>

           {/* Sidebar Analytics */}
           <div className="lg:col-span-4 space-y-6">
              
              {/* Team Status Split */}
              <div className="bg-[#131241] rounded-[24px] p-8 shadow-2xl border border-white/5">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="w-5 h-5 rounded-full border-2 border-dashed border-[#60A5FA] flex items-center justify-center">
                       <div className="w-1 h-1 rounded-full bg-[#60A5FA]" />
                    </div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Team Status Split</h3>
                 </div>
                 
                 <div className="h-[200px] relative mb-8">
                    <ResponsiveContainer width="100%" height="100%">
                       <PieChart>
                          <Pie
                             data={statusSplit}
                             innerRadius={70}
                             outerRadius={90}
                             paddingAngle={5}
                             dataKey="value"
                             stroke="none"
                          >
                             {statusSplit.map((entry, index) => (
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
                    {statusSplit.map((s, i) => (
                       <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                             <span className="text-xs font-bold text-[#B5B8BD]">{s.name}</span>
                          </div>
                          <span className="text-xs font-bold text-white">{s.value}</span>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Direct Revenue */}
              <div className="bg-[#131241] rounded-[24px] p-8 shadow-2xl border border-white/5">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-8">Direct Revenue</h3>
                 
                 <div className="space-y-8">
                    <div>
                       <p className="text-[9px] font-bold text-[#B5B8BD] uppercase tracking-widest mb-2">This Month</p>
                       <div className="flex items-center justify-between">
                          <h4 className="text-3xl font-bold text-white">₹1,42,000</h4>
                          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-sm">
                             <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                             12%
                          </span>
                       </div>
                    </div>
                    
                    <div className="pt-8 border-t border-white/5">
                       <p className="text-[9px] font-bold text-[#B5B8BD] uppercase tracking-widest mb-2">All Time</p>
                       <h4 className="text-2xl font-bold text-white">₹28,50,000</h4>
                    </div>
                 </div>
              </div>

           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
