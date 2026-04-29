'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function NotificationsPage() {
  const insightData = [
    { name: 'Total', value: 3, color: '#60A5FA' }
  ];

  const feed = [
    { title: 'Payout cycle opening', type: 'Payout', date: '2026-04-20', status: 'New', action: 'Seen' },
    { title: 'KYC pending for 18 members', type: 'KYC', date: '2026-04-22', status: 'New', action: 'Seen' },
    { title: 'Maintenance window scheduled', type: 'System', date: '2026-04-23', status: 'Seen', action: 'Seen' },
  ];

  return (
    <DashboardLayout pageTitle="Notification">
      <div className="space-y-6 pb-20">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-bold text-[#1E293B] tracking-tight">Notification</h2>
          <div className="flex gap-3">
             <button className="bg-[#131241] text-white px-5 py-2.5 rounded-xl text-xs font-bold border border-white/5 hover:bg-white/5 transition-all flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Export Report
             </button>
             <button className="bg-[#60A5FA] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-blue-200 hover:bg-blue-600 transition-all flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                Run Projection
             </button>
          </div>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'Total Notifications', value: '3' },
             { label: 'Unread', value: '2' },
             { label: 'Action Required', value: '2' },
             { label: 'Last Broadcast', value: '2026-04-20' },
           ].map((stat, i) => (
             <div key={i} className="bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5">
                <p className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest mb-10">{stat.label}</p>
                <h4 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h4>
             </div>
           ))}
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
           <div className="md:col-span-3">
              <select className="w-full bg-[#131241] border border-white/5 rounded-xl px-4 py-3 text-xs text-white outline-none appearance-none cursor-pointer">
                 <option>All Notifications</option>
                 <option>Payouts</option>
                 <option>KYC</option>
              </select>
           </div>
           <div className="md:col-span-4 relative">
              <input 
                type="text" 
                placeholder="Search title or date"
                className="w-full bg-[#131241] border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-700 outline-none"
              />
           </div>
           <div className="md:col-span-3">
              <select className="w-full bg-[#131241] border border-white/5 rounded-xl px-4 py-3 text-xs text-white outline-none appearance-none cursor-pointer">
                 <option>All</option>
                 <option>Unread</option>
                 <option>Action Required</option>
              </select>
           </div>
           <div className="md:col-span-2">
              <button className="w-full bg-[#131241] text-white px-4 py-3 rounded-xl text-xs font-bold border border-white/5 hover:bg-white/5 transition-all">Mark All Seen</button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           
           {/* Notification Feed */}
           <div className="lg:col-span-8 bg-[#131241] rounded-[20px] shadow-2xl border border-white/5 overflow-hidden">
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider">Notification Feed</h3>
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-lg">3 Records</span>
              </div>
              <div className="divide-y divide-white/5">
                 {feed.map((item, i) => (
                   <div key={i} className="p-8 hover:bg-white/1 transition-all group flex items-center justify-between">
                      <div className="space-y-1">
                         <h4 className="text-sm font-bold text-white group-hover:text-[#60A5FA] transition-colors">{item.title}</h4>
                         <p className="text-[10px] text-[#64748B] font-bold uppercase tracking-widest">{item.type} • {item.date}</p>
                      </div>
                      <div className="flex gap-2">
                         <span className={`text-[9px] font-black px-3 py-1 rounded-sm uppercase tracking-widest ${item.status === 'New' ? 'bg-amber-400/20 text-amber-400 border border-amber-400/20' : 'bg-white/5 text-slate-500 border border-white/5'}`}>{item.status}</span>
                         <span className="text-[9px] font-black bg-white/5 text-slate-500 px-3 py-1 rounded-sm uppercase tracking-widest border border-white/5">{item.action}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Sidebar Column */}
           <div className="lg:col-span-4 space-y-6">
              
              {/* Notification Insights */}
              <div className="bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-8">Notification Insights</h3>
                 
                 <div className="h-[200px] relative mb-10">
                    <ResponsiveContainer width="100%" height="100%">
                       <PieChart>
                          <Pie
                             data={insightData}
                             innerRadius={70}
                             outerRadius={90}
                             paddingAngle={0}
                             dataKey="value"
                             stroke="none"
                          >
                             <Cell fill="#60A5FA" />
                          </Pie>
                       </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <span className="text-4xl font-bold text-white">3</span>
                       <span className="text-[8px] font-black text-[#B5B8BD] uppercase tracking-widest mt-1">Total</span>
                    </div>
                 </div>

                 <div className="space-y-5 pt-8 border-t border-white/5">
                    <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">Action Summary</h4>
                    {[
                      { label: 'Filtered', value: 3, color: 'slate-500' },
                      { label: 'Unread', value: 2, color: 'blue-400' },
                      { label: 'Action required', value: 2, color: 'amber-400' },
                    ].map((item, i) => (
                       <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                             <div className={`w-2 h-2 rounded-full bg-${item.color}`} />
                             <span className="text-xs font-bold text-[#B5B8BD]">{item.label}</span>
                          </div>
                          <span className="text-xs font-bold text-white">{item.value}</span>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Selected Alert Details */}
              <div className="bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-8">Selected Alert</h3>
                 
                 <div className="bg-white/2 border border-white/5 rounded-2xl p-6 space-y-6">
                    <div className="space-y-4">
                       <h4 className="text-sm font-bold text-white">Payout cycle opening</h4>
                       <div className="space-y-1.5">
                          <div className="flex justify-between text-[10px] font-bold">
                             <span className="text-[#B5B8BD] uppercase tracking-widest">Type:</span>
                             <span className="text-white">Payout</span>
                          </div>
                          <div className="flex justify-between text-[10px] font-bold">
                             <span className="text-[#B5B8BD] uppercase tracking-widest">Date:</span>
                             <span className="text-white">2026-04-20</span>
                          </div>
                          <div className="flex justify-between text-[10px] font-bold">
                             <span className="text-[#B5B8BD] uppercase tracking-widest">Status:</span>
                             <span className="text-amber-400 uppercase tracking-widest">New</span>
                          </div>
                       </div>
                    </div>
                    
                    <div className="pt-6 border-t border-white/5">
                       <p className="text-[10px] text-[#B5B8BD] font-medium leading-relaxed">
                          Suggested action: Review this alert and complete required steps for cycle compliance.
                       </p>
                    </div>

                    <button className="w-full py-3.5 bg-emerald-400/80 text-slate-900 rounded-xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-emerald-500/10 hover:bg-emerald-400 transition-all">
                       Take Action
                    </button>
                 </div>
              </div>

           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
