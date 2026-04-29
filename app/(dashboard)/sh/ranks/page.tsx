'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

export default function PromotionTrackerPage() {
  const projectionData = [
    { name: 'W1', value: 0 },
    { name: 'W2', value: 0 },
    { name: 'W3', value: 85, type: 'actual' },
    { name: 'W4 (P)', value: 65, type: 'projected' },
  ];

  return (
    <DashboardLayout pageTitle="Promotion Tracker">
      <div className="space-y-6 pb-20">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-[#1E293B] tracking-tight">Promotion Tracker</h2>
            <p className="text-sm text-[#64748B] font-medium opacity-70">Monitor rank progression, readiness scores, and team requirements.</p>
          </div>
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

        {/* Top Summary Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'Current Rank', value: 'SH' },
             { label: 'Readiness Score', value: '90%' },
             { label: 'Cycle ETA', value: 'Next Cycle' },
             { label: 'Next Rank', value: 'Leadership' },
           ].map((stat, i) => (
             <div key={i} className="bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5">
                <p className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest mb-10">{stat.label}</p>
                <h4 className="text-3xl font-bold text-white tracking-tight">{stat.value}</h4>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           
           {/* Left Section */}
           <div className="lg:col-span-8 space-y-6">
              {/* Promotion Pathway */}
              <div className="bg-[#131241] rounded-[20px] p-10 shadow-2xl border border-white/5">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-10">Promotion Pathway</h3>
                 <div className="space-y-12">
                    <div className="space-y-4">
                       <div className="flex justify-between items-end">
                          <div>
                             <p className="text-xs font-bold text-white mb-1">HCC <span className="mx-2 opacity-30">→</span> HCM</p>
                             <p className="text-[10px] text-[#64748B] font-bold uppercase tracking-widest">Healthcare Coordinator to Manager</p>
                          </div>
                          <span className="text-xs font-bold text-white">100%</span>
                       </div>
                       <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-white rounded-full" style={{ width: '100%' }} />
                       </div>
                    </div>
                    
                    <div className="space-y-4">
                       <div className="flex justify-between items-end">
                          <div>
                             <p className="text-xs font-bold text-white mb-1">HCM <span className="mx-2 opacity-30">→</span> HBA</p>
                             <p className="text-[10px] text-[#64748B] font-bold uppercase tracking-widest">Healthcare Manager to Brand Admin</p>
                          </div>
                          <span className="text-xs font-bold text-white">85%</span>
                       </div>
                       <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-[#60A5FA] rounded-full shadow-[0_0_15px_rgba(96,165,250,0.5)]" style={{ width: '85%' }} />
                       </div>
                    </div>
                 </div>
              </div>

              {/* Requirement Checklist */}
              <div className="bg-[#131241] rounded-[20px] shadow-2xl border border-white/5 overflow-hidden">
                 <div className="p-8 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Requirement Checklist</h3>
                    <span className="text-[9px] font-black bg-indigo-600/20 text-[#60A5FA] px-3 py-1 rounded-sm uppercase tracking-widest border border-indigo-500/20">Target: HBA</span>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                       <thead>
                          <tr className="bg-white/2 text-[10px] font-bold text-[#B5B8BD] uppercase tracking-[0.2em]">
                             <th className="px-10 py-5">Requirment</th>
                             <th className="px-10 py-5 text-center">Target</th>
                             <th className="px-10 py-5 text-right">Current</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-white/2">
                          {[
                            { label: 'Personal Sales', target: 12, current: 19 },
                            { label: 'Direct Recruits', target: 12, current: 4 },
                            { label: 'Team Size', target: 30, current: 49 },
                          ].map((row, i) => (
                            <tr key={i} className="hover:bg-white/1 transition-colors">
                               <td className="px-10 py-6 text-sm font-bold text-white">{row.label}</td>
                               <td className="px-10 py-6 text-sm font-bold text-white text-center opacity-40">{row.target}</td>
                               <td className="px-10 py-6 text-sm font-bold text-white text-right">{row.current}</td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>

           {/* Sidebar Column */}
           <div className="lg:col-span-4 space-y-6">
              
              {/* Cycle Projection */}
              <div className="bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5">
                 <div className="flex items-center justify-between mb-10">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Cycle Projection</h3>
                    <button className="text-slate-500"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
                 </div>
                 
                 <div className="h-[250px] mb-10">
                    <ResponsiveContainer width="100%" height="100%">
                       <BarChart data={projectionData}>
                          <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748B', fontSize: 9, fontWeight: 'bold' }} 
                            dy={10}
                          />
                          <YAxis hide />
                          <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                             {projectionData.map((entry, index) => (
                               <Cell 
                                key={`cell-${index}`} 
                                fill={entry.type === 'actual' ? '#94a3b8' : entry.type === 'projected' ? 'rgba(52,211,153,0.2)' : 'transparent'} 
                                stroke={entry.type === 'projected' ? '#34d399' : 'none'}
                                strokeDasharray={entry.type === 'projected' ? '4 4' : '0'}
                               />
                             ))}
                          </Bar>
                       </BarChart>
                    </ResponsiveContainer>
                 </div>

                 <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                       <span className="text-[9px] font-bold text-[#B5B8BD] uppercase">Current (Actual)</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-2.5 h-2.5 rounded-full border border-emerald-400 bg-emerald-400/20" />
                       <span className="text-[9px] font-bold text-[#B5B8BD] uppercase">Projected</span>
                    </div>
                 </div>
              </div>

              {/* Next Role Benefits */}
              <div className="bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-8 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    Next Role Benefits
                 </h3>
                 <div className="space-y-4">
                    {[
                      { label: '+2% Override Commission', sub: 'On entire downline volume', icon: 'bank' },
                      { label: 'Car Fund Eligibility', sub: 'Qualify for monthly allowance', icon: 'car' },
                      { label: 'Global Pool Share', sub: '0.5% share of global revenue', icon: 'globe' },
                    ].map((benefit, i) => (
                      <div key={i} className="bg-white/2 border border-white/5 rounded-2xl p-5 group hover:bg-white/5 transition-all">
                         <div className="flex gap-4 items-center">
                            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                               {benefit.icon === 'bank' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><rect x="4" y="8" width="16" height="9"></rect><path d="M6 20V8"></path><path d="M10 20V8"></path><path d="M14 20V8"></path><path d="M18 20V8"></path><path d="M12 3L2 8h20L12 3z"></path></svg>}
                               {benefit.icon === 'car' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="10" width="22" height="8" rx="2"></rect><path d="M7 10l2-6h6l2 6"></path><circle cx="7" cy="18" r="2"></circle><circle cx="17" cy="18" r="2"></circle></svg>}
                               {benefit.icon === 'globe' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>}
                            </div>
                            <div>
                               <p className="text-[11px] font-bold text-white leading-tight">{benefit.label}</p>
                               <p className="text-[8px] text-[#64748B] font-bold mt-1 uppercase tracking-tighter">{benefit.sub}</p>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* AI Advisor Insight */}
              <div className="bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[40px] -mr-16 -mt-16" />
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2 relative z-10">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    AI Advisor Insight
                 </h3>
                 <p className="text-xs text-[#B5B8BD] font-medium leading-relaxed relative z-10">
                    Focus on closing <span className="text-white font-bold">2 pending direct recruits</span> this week. Historical data suggests your GSV will naturally hit the target by cycle end if current momentum holds.
                 </p>
              </div>

           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
