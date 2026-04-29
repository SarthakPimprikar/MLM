'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function TeamPerformancePage() {
  const chartData = [
    { name: 'Week 1', value: 50.5 },
    { name: 'Week 2', value: 50.8 },
    { name: 'Week 3', value: 50.4 },
    { name: 'Week 4', value: 51.5 },
    { name: 'Week 5', value: 52.2 },
  ];

  return (
    <DashboardLayout pageTitle="Team Performance">
      <div className="space-y-6 pb-20">
        
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-[#1E293B] tracking-tight">Team Performance</h2>
          <p className="text-sm text-[#64748B] font-medium opacity-70">Real-time metrics and analytics for network performance.</p>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <div className="bg-[#131241] rounded-[20px] p-6 shadow-2xl border border-white/5">
              <p className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest mb-1">Team Revenue</p>
              <h4 className="text-2xl font-bold text-white tracking-tight">₹12,81,965</h4>
              <p className="text-[10px] font-bold text-emerald-400 mt-2 flex items-center gap-1">
                 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                 +12.5% vs last month
              </p>
           </div>
           <div className="bg-[#131241] rounded-[20px] p-6 shadow-2xl border border-white/5">
              <p className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest mb-1">Group Size</p>
              <h4 className="text-2xl font-bold text-white tracking-tight">2</h4>
              <p className="text-[10px] font-bold text-emerald-400 mt-2 flex items-center gap-1">
                 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                 +1.5% vs last month
              </p>
           </div>
           <div className="bg-[#131241] rounded-[20px] p-6 shadow-2xl border border-white/5">
              <p className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest mb-1">Active Ratio</p>
              <h4 className="text-2xl font-bold text-white tracking-tight">50%</h4>
              <p className="text-[10px] font-bold text-emerald-400 mt-2 flex items-center gap-1">
                 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                 +12.5% vs last month
              </p>
           </div>
           <div className="bg-[#131241] rounded-[20px] p-6 shadow-2xl border border-white/5">
              <p className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest mb-1">Top Contributor</p>
              <h4 className="text-2xl font-bold text-white tracking-tight">HBA</h4>
              <div className="flex items-center justify-between mt-2">
                 <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[8px] font-black text-white">R</div>
                    <span className="text-[10px] font-bold text-[#B5B8BD]">Rahul .S</span>
                 </div>
                 <span className="text-[10px] font-bold text-white opacity-40">₹850k</span>
              </div>
           </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           <div className="lg:col-span-8 bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-10">Role-Based Analytics</h3>
              <div className="h-[300px]">
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
                        tick={{ fill: '#64748B', fontSize: 10, fontWeight: 'bold' }} 
                        dy={10}
                       />
                       <YAxis 
                        domain={[46, 58]} 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748B', fontSize: 10, fontWeight: 'bold' }} 
                        dx={-10}
                       />
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

           <div className="lg:col-span-4 space-y-6">
              {/* Rank Distribution */}
              <div className="bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Rank Distribution</h3>
                    <button className="text-slate-500"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></button>
                 </div>
                 <div className="space-y-6">
                    {[
                      { rank: 'Diamond', count: '45 (3.6%)', progress: 40, color: 'blue' },
                      { rank: 'Gold', count: '182 (14.5%)', progress: 30, color: 'indigo' },
                      { rank: 'Silver', count: '420 (33.6%)', progress: 60, color: 'amber' },
                      { rank: 'Bronze', count: '601 (48.1%)', progress: 80, color: 'slate' },
                    ].map((item, i) => (
                      <div key={i} className="space-y-2">
                         <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                            <span className="text-[#B5B8BD]">{item.rank}</span>
                            <span className="text-white">{item.count}</span>
                         </div>
                         <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className={`h-full bg-${item.color === 'blue' ? '[#60A5FA]' : item.color === 'indigo' ? 'indigo-500' : item.color === 'amber' ? 'amber-500' : 'slate-500'} rounded-full`} style={{ width: `${item.progress}%` }} />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Insights */}
              <div className="bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"></path><path d="M10 22h4"></path><path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z"></path></svg>
                    Insights
                 </h3>
                 <div className="space-y-5">
                    {[
                      { text: 'North zone revenue is up 18% compared to last week.', icon: 'check-circle', color: 'emerald' },
                      { text: 'Activation rate in Silver tier has dropped by 2.4%.', icon: 'alert-triangle', color: 'red' },
                      { text: '3 members are close to reaching Diamond status.', icon: 'info', color: 'blue' },
                    ].map((insight, i) => (
                      <div key={i} className="flex gap-3 items-start">
                         <div className={`mt-1 text-${insight.color}-500`}>
                            {insight.icon === 'check-circle' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 12 12 8 8 12"></polyline><line x1="12" y1="16" x2="12" y2="8"></line></svg>}
                            {insight.icon === 'alert-triangle' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>}
                            {insight.icon === 'info' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>}
                         </div>
                         <p className="text-[11px] text-[#B5B8BD] font-medium leading-relaxed">{insight.text}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Top Contributors Table */}
        <div className="bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Top Contributors</h3>
              <div className="flex gap-3">
                 <button className="flex items-center gap-2 bg-white/5 text-[#B5B8BD] px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all border border-white/5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                    Filter
                 </button>
                 <button className="bg-[#60A5FA] text-white px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all">
                    Export Report
                 </button>
              </div>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-white/5 text-[10px] font-bold text-[#B5B8BD] uppercase tracking-[0.2em]">
                       <th className="px-6 py-4">Member Name</th>
                       <th className="px-6 py-4 text-right">Rank / Role</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/2">
                    {[
                      { name: 'Rahul Sharma', id: 'CB-8842', role: 'Diamond Elite', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul' },
                      { name: 'Priya Patel', id: 'CB-9102', role: 'Diamond', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' },
                      { name: 'Amit Kumar', id: 'CB-7731', role: 'Gold Pro', avatar: 'AK', isInitials: true },
                    ].map((member, i) => (
                      <tr key={i} className="hover:bg-white/1 transition-colors">
                         <td className="px-6 py-5">
                            <div className="flex items-center gap-4">
                               {member.isInitials ? (
                                 <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xs font-black text-[#64748B]">{member.avatar}</div>
                               ) : (
                                 <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full bg-slate-800 object-cover" />
                               )}
                               <div>
                                  <p className="text-sm font-bold text-white">{member.name}</p>
                                  <p className="text-[10px] text-[#64748B] font-bold mt-1 uppercase tracking-tighter">ID: #{member.id}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-6 py-5 text-right">
                            <div className="flex items-center justify-end gap-2">
                               <div className="w-2 h-2 rounded-full bg-[#60A5FA]" />
                               <span className="text-xs font-bold text-white">{member.role}</span>
                            </div>
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
