'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

export default function MySalesPage() {
  const chartData = [
    { name: 'Oct 1', value: 48 },
    { name: 'Oct 5', value: 52 },
    { name: 'Oct 10', value: 50 },
    { name: 'Oct 15', value: 55 },
    { name: 'Oct 20', value: 65 },
    { name: 'Oct 25', value: 75 },
  ];

  const ledger = [
    { id: '#TRX-8924A', date: '24 Oct, 14:30 IST', member: 'Rahul Sharma', avatar: 'RA', color: 'blue' },
    { id: '#TRX-8923B', date: '24 Oct, 11:15 IST', member: 'Amit Kumar', avatar: 'AK', color: 'amber' },
    { id: '#TRX-8922A', date: '23 Oct, 16:45 IST', member: 'Priya Desai', avatar: 'PD', color: 'blue', active: true },
    { id: '#TRX-8921C', date: '23 Oct, 09:20 IST', member: 'Suresh Nair', avatar: 'SN', color: 'red' },
    { id: '#TRX-8920A', date: '22 Oct, 18:05 IST', member: 'Vikram Joshi', avatar: 'VJ', color: 'indigo' },
  ];

  return (
    <DashboardLayout pageTitle="My Sales">
      <div className="space-y-6 pb-20">
        
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-[#1E293B] tracking-tight">My Sales</h2>
          <p className="text-sm text-[#64748B] font-medium opacity-70">Record a new product or service sale and preview commission generation.</p>
        </div>

        {/* Top Summary Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           <div className="lg:col-span-3 space-y-6">
              <div className="bg-[#131241] rounded-[20px] p-6 shadow-2xl border border-white/5">
                 <p className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest mb-1">Total Sales Vol</p>
                 <h4 className="text-2xl font-bold text-white tracking-tight">₹4,25,000</h4>
                 <p className="text-[10px] font-bold text-[#60A5FA] mt-2 flex items-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                    +12.5%
                 </p>
              </div>
              <div className="bg-[#131241] rounded-[20px] p-6 shadow-2xl border border-white/5">
                 <p className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest mb-1">Active Plans</p>
                 <h4 className="text-2xl font-bold text-white tracking-tight">1,842</h4>
                 <p className="text-[10px] font-bold text-[#B5B8BD] mt-2">+45 this week</p>
              </div>
           </div>

           <div className="lg:col-span-9 bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5 relative">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider">Sales Volume Trend</h3>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    <span className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest">Current Period</span>
                 </div>
              </div>
              <div className="h-[220px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                       <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.2}/>
                             <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748B', fontSize: 9, fontWeight: 'bold' }} 
                        dy={10}
                       />
                       <YAxis hide />
                       <Tooltip 
                        contentStyle={{ backgroundColor: '#131241', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        itemStyle={{ fontSize: '10px', fontWeight: 'bold' }}
                       />
                       <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#60A5FA" 
                        strokeWidth={3} 
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                       />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>

        {/* Bottom Ledger Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           
           {/* Sidebar Filters */}
           <div className="lg:col-span-3 bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5 space-y-8 h-max">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Refine Search</h3>
              
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">Date Range</label>
                    <select className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3 text-xs font-bold text-white outline-none appearance-none cursor-pointer">
                       <option>Last 7 Days</option>
                       <option>Last 30 Days</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">Plan Type</label>
                    <select className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3 text-xs font-bold text-white outline-none appearance-none cursor-pointer">
                       <option>All Plans</option>
                       <option>Premium</option>
                       <option>Basic</option>
                    </select>
                 </div>
                 <div className="space-y-4">
                    <p className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">Status</p>
                    <div className="space-y-2">
                       {[
                         { label: 'Completed', checked: true },
                         { label: 'Pending', checked: true },
                         { label: 'Failed', checked: false },
                       ].map((status, i) => (
                         <label key={i} className="flex items-center gap-3 bg-white/2 border border-white/5 rounded-xl px-4 py-2.5 cursor-pointer hover:bg-white/5 transition-all">
                            <input type="checkbox" defaultChecked={status.checked} className="w-4 h-4 rounded border-white/10 bg-transparent text-[#60A5FA] focus:ring-0" />
                            <span className="text-[11px] font-bold text-white">{status.label}</span>
                         </label>
                       ))}
                    </div>
                 </div>
              </div>

              <button className="w-full py-3.5 bg-[#60A5FA]/20 text-[#60A5FA] rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#60A5FA] hover:text-white transition-all shadow-xl shadow-blue-500/5">Apply Filters</button>
           </div>

           {/* Main Ledger Area */}
           <div className="lg:col-span-9 bg-[#131241] rounded-[20px] shadow-2xl border border-white/5 flex flex-col min-h-[500px]">
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider">Transaction Ledger</h3>
                 <div className="flex gap-4">
                    <button className="text-slate-500 hover:text-white"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3z"></path><path d="M9 3v18"></path></svg></button>
                    <button className="text-slate-500 hover:text-white"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                 </div>
              </div>
              
              <div className="flex-1 overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="border-b border-white/5 text-[10px] font-bold text-[#B5B8BD] uppercase tracking-[0.2em]">
                          <th className="px-10 py-5 w-16 text-center">
                             <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-transparent text-[#60A5FA] focus:ring-0" />
                          </th>
                          <th className="px-6 py-5">Sale ID / Date</th>
                          <th className="px-6 py-5">Member</th>
                          <th className="px-6 py-5">Plan Detail</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/2">
                       {ledger.map((item, i) => (
                         <tr key={i} className={`hover:bg-white/1 transition-colors ${item.active ? 'bg-indigo-600/10' : ''}`}>
                            <td className="px-10 py-6 text-center">
                               <input type="checkbox" defaultChecked={item.active} className="w-4 h-4 rounded border-white/10 bg-transparent text-[#60A5FA] focus:ring-0" />
                            </td>
                            <td className="px-6 py-6">
                               <p className="text-xs font-bold text-white">{item.id}</p>
                               <p className="text-[9px] text-[#64748B] font-bold mt-1 uppercase tracking-tighter">{item.date}</p>
                            </td>
                            <td className="px-6 py-6">
                               <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-black text-white ${
                                     item.color === 'blue' ? 'bg-[#60A5FA]' : 
                                     item.color === 'amber' ? 'bg-amber-400' : 
                                     item.color === 'red' ? 'bg-rose-500' : 
                                     'bg-indigo-500'
                                  }`}>
                                     {item.avatar}
                                  </div>
                                  <span className="text-xs font-bold text-[#B5B8BD]">{item.member}</span>
                               </div>
                            </td>
                            <td className="px-6 py-6">
                               <span className="text-[10px] font-bold text-white opacity-50">Select a plan for details...</span>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>

              {/* Pagination */}
              <div className="px-10 py-5 border-t border-white/5 flex items-center justify-between">
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Showing <span className="text-white">1-5</span> of 142 records</p>
                 <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 hover:text-white"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                    <button className="w-8 h-8 rounded-lg bg-[#60A5FA]/20 text-[#60A5FA] text-xs font-black">1</button>
                    <button className="w-8 h-8 rounded-lg text-xs font-bold text-slate-500 hover:text-white">2</button>
                    <button className="w-8 h-8 rounded-lg text-xs font-bold text-slate-500 hover:text-white">3</button>
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 hover:text-white"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
