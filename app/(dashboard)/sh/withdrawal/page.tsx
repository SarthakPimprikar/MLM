'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function WithdrawalPage() {
  const [requestAmount, setRequestAmount] = useState('50000');

  const history = [
    { role: 'Distributor', amount: '₹24,500.00', deduction: '-₹1,225', net: '₹23,275' },
    { role: 'Distributor', amount: '₹18,200.00', deduction: '-₹910', net: '₹17,290' },
    { role: 'Super Dist.', amount: '₹65,000.00', deduction: '-₹3,250', net: '₹61,750' },
    { role: 'Distributor', amount: '₹12,400.00', deduction: '-₹620', net: '₹11,780' },
  ];

  return (
    <DashboardLayout pageTitle="Withdrawal">
      <div className="space-y-6 pb-20">
        
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-[#1E293B] tracking-tight">Withdrawal</h2>
          <p className="text-sm text-[#64748B] font-medium opacity-70">Manage and track your earning payouts and requested disbursements.</p>
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
           
           {/* Request Desk */}
           <div className="lg:col-span-8 bg-[#131241] rounded-[20px] shadow-2xl border border-white/5 flex flex-col">
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    Withdrawal Request Desk
                 </h3>
                 <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] bg-white/5 px-3 py-1 rounded-lg border border-white/5">ID: REQ-8992</span>
              </div>
              
              <div className="p-10 space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">Eligible Amount</label>
                       <div className="relative">
                          <input type="text" readOnly value="₹1,36,789.00" className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3.5 text-sm font-bold text-[#64748B] outline-none" />
                          <svg className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">Request Amount *</label>
                       <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold">₹</span>
                          <input 
                            type="text" 
                            value={requestAmount}
                            onChange={(e) => setRequestAmount(e.target.value)}
                            className="w-full bg-white/2 border border-white/10 rounded-xl pl-8 pr-4 py-3.5 text-sm font-bold text-white outline-none focus:border-[#60A5FA]/30 transition-all" 
                          />
                       </div>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">Payout Method *</label>
                       <select className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3.5 text-sm font-bold text-white outline-none appearance-none cursor-pointer">
                          <option>NEFT Transfer</option>
                          <option>IMPS Instant</option>
                          <option>Wallet Refund</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">Expected Cycle</label>
                       <input type="text" readOnly value="Standard (T+3)" className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3.5 text-sm font-bold text-[#64748B] outline-none" />
                    </div>
                 </div>

                 {/* Bank Account Selection */}
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">Destination Account</label>
                    <div className="bg-white/2 border border-white/5 rounded-2xl p-6 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-all">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><rect x="4" y="8" width="16" height="9"></rect><path d="M6 20V8"></path><path d="M10 20V8"></path><path d="M14 20V8"></path><path d="M18 20V8"></path><path d="M12 3L2 8h20L12 3z"></path></svg>
                          </div>
                          <div>
                             <p className="text-sm font-bold text-white">HDFC Bank **** 4598</p>
                             <p className="text-[10px] text-[#64748B] font-bold mt-1 uppercase tracking-tighter">IFSC: HDFC0001234</p>
                          </div>
                       </div>
                       <button className="text-[10px] font-bold text-[#60A5FA] uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">Change</button>
                    </div>
                 </div>

                 {/* Financial Summary */}
                 <div className="bg-white/2 border border-white/5 rounded-2xl p-8 space-y-4">
                    <div className="flex justify-between items-center text-xs font-bold">
                       <span className="text-[#B5B8BD] uppercase tracking-wider">Gross Request</span>
                       <span className="text-white">₹50,000.00</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold">
                       <span className="text-[#B5B8BD] uppercase tracking-wider flex items-center gap-2">TDS Deduction (5%) <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>
                       <span className="text-red-400">- ₹2,500.00</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-bold">
                       <span className="text-[#B5B8BD] uppercase tracking-wider">Admin Fee (0%)</span>
                       <span className="text-white">₹0.00</span>
                    </div>
                    <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                       <span className="text-sm font-bold text-white uppercase tracking-widest">Net Payable</span>
                       <span className="text-2xl font-bold text-[#60A5FA]">₹47,500.00</span>
                    </div>
                 </div>

                 {/* Remarks */}
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">Remarks (Optional)</label>
                    <textarea 
                      placeholder="Add any specific notes for the finance team..."
                      className="w-full bg-white/2 border border-white/5 rounded-2xl px-5 py-4 text-xs font-bold text-white placeholder:text-slate-700 outline-none h-24 resize-none"
                    />
                 </div>

                 <div className="flex gap-4 pt-4">
                    <button className="flex-1 py-4 rounded-xl text-[11px] font-bold text-[#B5B8BD] border border-white/5 hover:bg-white/5 transition-all uppercase tracking-[0.2em]">Cancel</button>
                    <button className="flex-[2] py-4 rounded-xl text-[11px] font-bold text-slate-900 bg-[#60A5FA] shadow-xl shadow-blue-500/20 hover:bg-blue-600 transition-all uppercase tracking-[0.2em]">Submit Request</button>
                 </div>
              </div>
           </div>

           {/* Sidebar Section */}
           <div className="lg:col-span-4 space-y-6">
              
              {/* Cycle Status */}
              <div className="bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-10 flex items-center gap-3">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    Current Cycle Status
                 </h3>
                 <div className="space-y-8 relative ml-1">
                    <div className="absolute left-[-1px] top-2 bottom-2 w-[1px] bg-white/5" />
                    
                    {[
                      { title: 'Requested', time: 'Oct 24, 2023 • 10:45 AM', done: true },
                      { title: 'T+3 Processing', time: 'In Progress (Due Oct 27)', current: true },
                      { title: 'T+5 Disbursement', time: 'Pending Bank Clearance', pending: true },
                    ].map((step, i) => (
                      <div key={i} className="relative pl-8">
                         <div className={`absolute left-[-6px] top-1 w-3 h-3 rounded-full border-2 ${
                            step.done ? 'bg-indigo-600 border-indigo-600' : 
                            step.current ? 'bg-transparent border-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]' : 
                            'bg-transparent border-white/10'
                         }`} />
                         <p className={`text-[11px] font-bold ${step.pending ? 'text-slate-500' : 'text-white'}`}>{step.title}</p>
                         <p className="text-[9px] text-[#64748B] font-bold mt-1 uppercase tracking-tighter">{step.time}</p>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Policy Snapshot */}
              <div className="bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-8">Policy Snapshot</h3>
                 <div className="space-y-6">
                    {[
                      { label: 'Minimum Withdrawal', desc: '₹500.00 per transaction.', icon: 'info' },
                      { label: 'Processing Timelines', desc: 'Requests made before 2PM IST are processed.', icon: 'clock' },
                      { label: 'Statutory Deductions', desc: '5% TDS is mandatory as per section 194H.', icon: 'bank' },
                    ].map((policy, i) => (
                      <div key={i} className="flex gap-4">
                         <div className="mt-1 text-amber-400">
                            {policy.icon === 'info' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>}
                            {policy.icon === 'clock' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>}
                            {policy.icon === 'bank' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><rect x="4" y="8" width="16" height="9"></rect><path d="M6 20V8"></path><path d="M10 20V8"></path><path d="M14 20V8"></path><path d="M18 20V8"></path><path d="M12 3L2 8h20L12 3z"></path></svg>}
                         </div>
                         <div>
                            <p className="text-[11px] font-bold text-white">{policy.label}</p>
                            <p className="text-[9px] text-[#64748B] font-medium leading-relaxed mt-0.5">{policy.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

           </div>
        </div>

        {/* Recent History */}
        <div className="bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent History</h3>
              <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all">
                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                 All Statuses
              </button>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-white/5 text-[10px] font-bold text-[#B5B8BD] uppercase tracking-[0.2em]">
                       <th className="px-6 py-4">Role (SH)</th>
                       <th className="px-6 py-4 text-right">Amount</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/2">
                    {history.map((item, i) => (
                      <tr key={i} className="hover:bg-white/1 transition-colors">
                         <td className="px-6 py-6 text-xs font-bold text-[#B5B8BD]">{item.role}</td>
                         <td className="px-6 py-6 text-right">
                            <p className="text-sm font-bold text-white">{item.amount}</p>
                            <p className="text-[10px] text-red-400 font-bold mt-1 opacity-60">{item.deduction}</p>
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
