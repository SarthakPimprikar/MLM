'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function AdminActivityRulesPage() {
  const [loading, setLoading] = useState(false);

  return (
    <DashboardLayout pageTitle="Activity Rules">
      <div className="space-y-6 pb-10">
        {/* Header Section */}
        <div className="bg-[#131241] rounded-[2rem] p-8 mb-8 border border-white/[0.03] shadow-xl text-white">
           <div className="flex justify-between items-center mb-6">
              <div>
                 <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">CUREBHARAT / ADMIN / ACTIVITY RULES</p>
                 <h1 className="text-3xl font-bold font-display">Activity Rules</h1>
              </div>
              <div className="px-4 py-2 rounded-xl bg-[#34d399]/10 border border-[#34d399]/20 text-[#34d399] text-[9px] font-black uppercase tracking-widest">
                 Live Monitoring
              </div>
           </div>
           <p className="text-sm text-white/50 font-medium max-w-2xl leading-relaxed">Manage monthly activity requirements and compliance triggers for all partner roles.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           {/* Left Column: Rule Matrix */}
           <div className="lg:col-span-8 bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
              <div className="flex justify-between items-start mb-10">
                 <div>
                    <h3 className="text-xl font-bold font-display mb-1">Rule Matrix Configuration</h3>
                    <p className="text-xs text-white/40 font-medium">Define monthly activity requirements for each partner tier.</p>
                 </div>
                 <div className="flex gap-3">
                    <button className="bg-[#6029F1] px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[#6029F1]/20">Save Rule Matrix</button>
                    <button className="bg-white/5 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10">Run Compliance Engine</button>
                 </div>
              </div>

              <div className="space-y-8">
                 <div className="grid grid-cols-12 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] px-4">
                    <div className="col-span-2">ROLE TIER</div>
                    <div className="col-span-6">MONTHLY RULE</div>
                    <div className="col-span-4">IF RULE NOT MET</div>
                 </div>
                 
                 <RuleRow role="HCC" rule="2 personal sales + 5 team activations" action="No Payout This Cycle" color="text-hcc border-hcc/30 bg-hcc/5" />
                 <RuleRow role="HCM" rule="1 personal sale" action="Transfer to Upline" color="text-hcm border-hcm/30 bg-hcm/5" />
                 <RuleRow role="HBA" rule="Minimum 500 CC engagement" action="Alert Only" color="text-hba border-hba/30 bg-hba/5" />
              </div>
           </div>

           {/* Right Column: Compliance Analytics */}
           <div className="lg:col-span-4 space-y-6">
              {/* Compliance Donut */}
              <div className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
                 <h3 className="text-sm font-bold font-display uppercase tracking-widest mb-10">Real-time Compliance</h3>
                 <div className="flex flex-col items-center">
                    <div className="w-48 h-48 relative flex items-center justify-center">
                       <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="42" fill="none" stroke="white" strokeWidth="10" opacity="0.05" />
                          <circle cx="50" cy="50" r="42" fill="none" stroke="#60A5FA" strokeWidth="10" strokeDasharray="264" strokeDashoffset="68.6" strokeLinecap="round" />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-4xl font-bold font-display">74%</span>
                          <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">COMPLIANT</span>
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-10 mt-10 w-full px-4">
                       <div className="text-center">
                          <p className="text-[10px] font-black text-white/20 uppercase mb-1">Target</p>
                          <p className="text-sm font-bold text-white">92.0%</p>
                       </div>
                       <div className="text-center">
                          <p className="text-[10px] font-black text-white/20 uppercase mb-1">Current</p>
                          <p className="text-sm font-bold text-[#60A5FA]">74.2%</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Engine Summary */}
              <div className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
                 <h3 className="text-sm font-bold font-display uppercase tracking-widest mb-8">ENGINE SUMMARY</h3>
                 <div className="space-y-4">
                    <div className="bg-white/5 p-5 rounded-2xl flex justify-between items-center group">
                       <div>
                          <p className="text-[10px] font-black text-white/20 uppercase mb-1">NON-COMPLIANCE</p>
                          <p className="text-2xl font-bold font-display">26%</p>
                       </div>
                       <div className="w-10 h-10 rounded-xl bg-[#f87171]/10 flex items-center justify-center text-[#f87171]">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                       </div>
                    </div>
                    <div className="bg-white/5 p-5 rounded-2xl flex justify-between items-center group">
                       <div>
                          <p className="text-[10px] font-black text-white/20 uppercase mb-1">TRANSFER CANDIDATES</p>
                          <p className="text-2xl font-bold font-display">31</p>
                       </div>
                       <div className="w-10 h-10 rounded-xl bg-[#60A5FA]/10 flex items-center justify-center text-[#60A5FA]">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                       </div>
                    </div>
                 </div>
                 <p className="text-[9px] text-white/20 font-bold uppercase mt-6 text-center italic">Last Engine Sync: 12m ago</p>
              </div>
           </div>
        </div>

        {/* Bottom Section: Non-Compliant Queue */}
        <div className="bg-[#131241] rounded-[2rem] shadow-xl border border-white/[0.03] overflow-hidden">
           <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <div>
                 <h3 className="text-xl font-bold font-display text-white">Non-Compliant Queue</h3>
                 <p className="text-xs text-white/40 mt-1">Individual violations requiring manual review or automated action approval.</p>
              </div>
              <div className="flex bg-black/40 p-1 rounded-xl">
                 <button className="px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest bg-white/10 text-white">All Violations</button>
                 <button className="px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white">Pending Transfer</button>
              </div>
           </div>
           
           <div className="px-8 py-5 flex text-[9px] font-black text-white/20 uppercase tracking-[0.2em] border-b border-white/5">
              <div className="w-[40%] pl-4">VIOLATION REASON</div>
              <div className="w-[60%] pl-4">IMPACT</div>
           </div>
           
           <div className="p-4 space-y-4">
              <ViolationItem reason="No personal sale" impact="Commission Hold" color="text-[#fbbf24]" icon="hold" />
              <ViolationItem reason="Inadequate Team CC" impact="Upline Transfer" color="text-[#60A5FA]" icon="transfer" />
              <ViolationItem reason="Zero engagement (90d)" impact="Account Suspension" color="text-[#f87171]" icon="suspend" />
           </div>

           <div className="px-8 py-5 flex items-center justify-between border-t border-white/5 bg-white/[0.01]">
              <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                 DISPLAYING 3 OF 31 CANDIDATES
              </div>
              <div className="flex gap-2">
                 <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/20 hover:text-white"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                 <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/20 hover:text-white"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function RuleRow({ role, rule, action, color }: any) {
  return (
    <div className="grid grid-cols-12 gap-4 items-center bg-white/[0.02] border border-white/5 rounded-2xl p-4 group hover:bg-white/[0.05] transition-all">
       <div className="col-span-2">
          <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] border ${color}`}>{role}</span>
       </div>
       <div className="col-span-6 text-sm font-bold text-white/80">{rule}</div>
       <div className="col-span-4">
          <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-white/60 outline-none focus:text-white transition-colors">
             <option>{action}</option>
          </select>
       </div>
    </div>
  );
}

function ViolationItem({ reason, impact, color, icon }: any) {
  return (
    <div className="flex items-center hover:bg-white/[0.02] p-4 rounded-2xl transition-colors group">
       <div className="w-[40%]">
          <span className="px-4 py-1.5 rounded-lg bg-white/5 text-[10px] font-black text-white/40 uppercase tracking-widest border border-white/5">{reason}</span>
       </div>
       <div className="w-[60%] flex items-center gap-4">
          <div className={`${color} group-hover:scale-110 transition-transform`}>
             {icon === 'hold' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>}
             {icon === 'transfer' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 2.1l4 4-4 4"></path><path d="M3 12.2v-2a4 4 0 0 1 4-4h12.8"></path><path d="M7 21.9l-4-4 4-4"></path><path d="M21 11.8v2a4 4 0 0 1-4 4H4.2"></path></svg>}
             {icon === 'suspend' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>}
          </div>
          <span className={`text-xs font-black uppercase tracking-widest ${color}`}>{impact}</span>
       </div>
    </div>
  );
}
