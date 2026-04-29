'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function SupportPage() {
  const [selectedTicket, setSelectedTicket] = useState('#CB-8829');

  const tickets = [
    { id: '#CB-8829', subject: 'Payout failed to bank', category: 'Finance / Payouts', priority: 'HIGH', status: 'OPEN', time: '12h ago' },
    { id: '#CB-8828', subject: 'KYC Document rejected', category: 'Members / KYC', priority: 'MEDIUM', status: 'OPEN', time: '1d ago' },
    { id: '#CB-8825', subject: 'App crashing on login', category: 'Technical / App', priority: 'HIGH', status: 'IN PROGRESS', time: '2d ago' },
  ];

  return (
    <DashboardLayout pageTitle="Support">
      <div className="space-y-6 pb-20">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-bold text-[#1E293B] tracking-tight">Support</h2>
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
             { label: 'Open Tickets', value: '2', change: '+12%', positive: true },
             { label: 'Avg Response', value: '1h 45m', change: '+5%', positive: true },
             { label: 'Resolved', value: '86' },
             { label: 'SLA Score', value: '98.2%', sub: 'Excellent', positive: true },
           ].map((stat, i) => (
             <div key={i} className="bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5">
                <p className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest mb-10">{stat.label}</p>
                <div className="flex items-center justify-between">
                   <h4 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h4>
                   {stat.change && (
                     <span className={`text-[10px] font-bold ${stat.positive ? 'text-emerald-400' : 'text-rose-400'}`}>{stat.change}</span>
                   )}
                   {stat.sub && (
                     <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{stat.sub}</span>
                   )}
                </div>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           
           {/* Tickets Table Area */}
           <div className="lg:col-span-8 bg-[#131241] rounded-[20px] shadow-2xl border border-white/5 flex flex-col overflow-hidden min-h-[600px]">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                 <div className="flex gap-2">
                    <button className="bg-white/5 text-white px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-white/5 flex items-center gap-2">
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                       All Categories
                    </button>
                    <button className="bg-white/5 text-white px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-white/5 flex items-center gap-2">
                       <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M7 12h10"></path><path d="M10 18h4"></path></svg>
                       Newest First
                    </button>
                 </div>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-4">
                    showing 1-10 of 142
                    <span className="flex gap-2">
                       <button className="text-slate-700 hover:text-white transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                       <button className="text-slate-700 hover:text-white transition-colors"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
                    </span>
                 </p>
              </div>
              
              <div className="flex-1 overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="border-b border-white/5 text-[10px] font-bold text-[#B5B8BD] uppercase tracking-[0.2em]">
                          <th className="px-8 py-5">Ticket ID</th>
                          <th className="px-8 py-5">Subject & Category</th>
                          <th className="px-8 py-5 text-center">Priority</th>
                          <th className="px-8 py-5 text-center">Status</th>
                          <th className="px-8 py-5 text-right">Time</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/2">
                       {tickets.map((ticket, i) => (
                         <tr 
                          key={i} 
                          className={`hover:bg-white/1 transition-all cursor-pointer group ${selectedTicket === ticket.id ? 'bg-indigo-600/10 border-l-2 border-indigo-600' : ''}`}
                          onClick={() => setSelectedTicket(ticket.id)}
                         >
                            <td className="px-8 py-6 text-xs font-bold text-white opacity-80">{ticket.id}</td>
                            <td className="px-8 py-6">
                               <p className={`text-sm font-bold ${selectedTicket === ticket.id ? 'text-[#60A5FA]' : 'text-white'} transition-colors`}>{ticket.subject}</p>
                               <p className="text-[10px] text-[#64748B] font-bold mt-1 uppercase tracking-tighter">{ticket.category}</p>
                            </td>
                            <td className="px-8 py-6 text-center">
                               <span className={`text-[9px] font-black px-3 py-1 rounded-sm uppercase tracking-widest border ${
                                 ticket.priority === 'HIGH' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-amber-400/10 text-amber-400 border-amber-400/20'
                               }`}>
                                  {ticket.priority}
                               </span>
                            </td>
                            <td className="px-8 py-6 text-center">
                               <span className={`text-[9px] font-black px-3 py-1 rounded-sm uppercase tracking-widest border ${
                                 ticket.status === 'OPEN' ? 'bg-indigo-600/20 text-[#60A5FA] border-indigo-600/20' : 'bg-amber-400/20 text-amber-400 border-amber-400/20'
                               }`}>
                                  {ticket.status}
                               </span>
                            </td>
                            <td className="px-8 py-6 text-right text-[10px] font-bold text-slate-500 uppercase">{ticket.time}</td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>

           {/* Sidebar Column */}
           <div className="lg:col-span-4 space-y-6">
              
              {/* Ticket Details Inspector */}
              <div className="bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5">
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-base font-bold text-white tracking-tight">{selectedTicket}: Payout failed</h3>
                    <div className="flex gap-4 text-slate-500">
                       <button className="hover:text-white"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg></button>
                       <button className="hover:text-white"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                    </div>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="space-y-1">
                       <p className="text-[10px] text-[#B5B8BD] font-bold uppercase tracking-widest">Requested by:</p>
                       <p className="text-sm font-bold text-white">Rajesh Kumar <span className="text-indigo-400 font-mono text-xs">(ID: M-4921)</span></p>
                    </div>
                    <div className="flex gap-2">
                       <span className="bg-white/5 text-[9px] font-black text-slate-500 px-3 py-1.5 rounded-lg border border-white/5 uppercase tracking-widest">Finance</span>
                       <span className="bg-white/5 text-[9px] font-black text-slate-500 px-3 py-1.5 rounded-lg border border-white/5 uppercase tracking-widest">Bank Transfer</span>
                    </div>
                 </div>
              </div>

              {/* Activity Thread */}
              <div className="bg-[#131241] rounded-[20px] shadow-2xl border border-white/5 overflow-hidden flex flex-col min-h-[400px]">
                 <div className="p-6 border-b border-white/5 bg-white/2">
                    <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Activity Thread</h3>
                 </div>
                 <div className="p-8 flex-1 space-y-8">
                    <div className="flex gap-4">
                       <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center text-xs font-black text-indigo-400">RK</div>
                       <div className="flex-1 space-y-2">
                          <div className="flex justify-between items-center">
                             <p className="text-[11px] font-bold text-white">Rajesh Kumar</p>
                             <span className="text-[9px] font-bold text-slate-600 uppercase">Today, 10:42 AM</span>
                          </div>
                          <div className="bg-white/2 border border-white/5 rounded-2xl p-5">
                             <p className="text-xs text-[#B5B8BD] font-medium leading-relaxed">
                                Hi, my payout request from yesterday (Req ID: P-1029) is showing as failed in the app. The amount was deducted from my wallet but hasn't reached my HDFC account. Please help.
                             </p>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Reply Editor */}
                 <div className="p-6 bg-white/2 border-t border-white/5 space-y-6">
                    <div className="relative">
                       <textarea 
                        placeholder="Type your response..."
                        className="w-full bg-[#131241] border border-white/5 rounded-2xl p-5 text-xs font-medium text-white placeholder:text-slate-700 outline-none h-28 resize-none focus:border-[#60A5FA]/30 transition-all"
                       />
                       <div className="absolute bottom-4 left-4 flex gap-4 text-slate-600">
                          <button className="hover:text-white transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></button>
                          <button className="hover:text-white transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg></button>
                       </div>
                       <button className="absolute bottom-4 right-4 bg-[#60A5FA] text-white px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all flex items-center gap-2">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                          Send
                       </button>
                    </div>
                 </div>
              </div>

           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
