'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function AdminPromotionRulesPage() {
  const [loading, setLoading] = useState(false);

  const mockEligible = [
    { id: 'CB-HCM-1017', role: 'HCM', eligibleFor: 'HBA', readiness: 57, growth: '+12% Growth', color: 'bg-[#60A5FA]' },
    { id: 'CB-HCC-2492', role: 'HCC', eligibleFor: 'HCM', readiness: 92, growth: '+45% Growth', color: 'bg-[#34d399]' },
    { id: 'CB-HCM-0982', role: 'HCM', eligibleFor: 'HBA', readiness: 32, growth: '-2% Growth', color: 'bg-[#fbbf24]' },
  ];

  return (
    <DashboardLayout pageTitle="Promotion Rules">
      <div className="space-y-6 pb-10">
        {/* Header Section */}
        <div className="bg-[#131241] rounded-[2rem] p-8 mb-8 border border-white/[0.03] shadow-xl text-white">
           <div className="flex justify-between items-center mb-6">
              <div>
                 <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">CUREBHARAT / ADMIN / PROMOTION RULES</p>
                 <h1 className="text-3xl font-bold font-display">Promotion Rules</h1>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 text-[9px] font-black uppercase tracking-widest">
                 DRAFT V2.4
              </div>
           </div>
           <p className="text-sm text-white/50 font-medium max-w-2xl leading-relaxed">Define algorithmic logic for hierarchical promotions. Adjust thresholds and simulate cycles to ensure organizational stability.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           {/* Left Column: Criteria Builder */}
           <div className="lg:col-span-8 bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
              <div className="flex justify-between items-start mb-10">
                 <div className="flex items-center gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6029F1" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                    <h3 className="text-xl font-bold font-display">Promotion Criteria Builder</h3>
                 </div>
                 <span className="text-[9px] font-black text-white/20 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">DRAFT V2.4</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                 <CriteriaCard label="HCC ➔ HCM Sales" value="12" sub="REQUIRED UNITS" />
                 <CriteriaCard label="HCC ➔ HCM Recruits" value="12" sub="DIRECT REFERRALS" />
                 <CriteriaCard label="HCM ➔ HBA Direct HCM" value="5" sub="PROMOTED DIRECTS" />
                 <CriteriaCard label="HCM ➔ HBA Team Size" value="30" sub="NETWORK DEPTH" />
              </div>

              <div className="flex gap-4">
                 <button className="flex-1 bg-[#F8F9FE] hover:bg-white border border-[#E1E2EC] rounded-xl py-4 text-[10px] font-black text-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                    Save Promotion Logic
                 </button>
                 <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-4 text-[10px] font-black text-white uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                    Simulate Next Cycle
                 </button>
              </div>
           </div>

           {/* Right Column: Funnel Analytics */}
           <div className="lg:col-span-4 bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
              <div className="flex items-center gap-3 mb-10">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2.5"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                 <h3 className="text-xl font-bold font-display">Promotion Funnel</h3>
              </div>
              
              <div className="h-48 relative mb-10">
                 <svg className="w-full h-full text-[#60A5FA]" viewBox="0 0 200 150">
                    <path d="M20,10 L180,10 L140,140 L60,140 Z" fill="currentColor" opacity="0.05" />
                    <path d="M30,30 L170,30 L155,70 L45,70 Z" fill="currentColor" opacity="0.2" />
                    <path d="M50,80 L150,80 L140,110 L60,110 Z" fill="currentColor" opacity="0.4" />
                    <path d="M65,120 L135,120 L130,135 L70,135 Z" fill="currentColor" opacity="1" />
                 </svg>
                 <div className="absolute inset-0 flex flex-col justify-between py-2 text-[8px] font-black text-white/20 uppercase tracking-widest items-center">
                    <span>ELIGIBLE</span>
                    <span>REVIEW</span>
                    <span>APPROVED</span>
                 </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6">
                 <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Conversion Rate</span>
                    <span className="text-sm font-bold text-[#34d399]">21.4%</span>
                 </div>
                 <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#34d399] rounded-full" style={{ width: '21.4%' }} />
                 </div>
              </div>
           </div>
        </div>

        {/* Bottom Section: Eligible Members Table */}
        <div className="bg-[#131241] rounded-[2rem] shadow-xl border border-white/[0.03] overflow-hidden">
           <div className="p-8 border-b border-white/5 flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                 <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                 <input
                   type="text"
                   placeholder="Search eligible members by ID, name, or region..."
                   className="w-full bg-[#1c2030] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none"
                 />
              </div>
              <div className="flex gap-4">
                 <select className="bg-[#1c2030] border border-white/10 rounded-xl px-6 py-3 text-[10px] font-black text-white uppercase tracking-widest outline-none min-w-[150px]">
                    <option>Filter By Role</option>
                 </select>
                 <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                 </button>
              </div>
           </div>
           
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] border-b border-white/5 bg-white/[0.01]">
                       <th className="px-8 py-5">MEMBER ID</th>
                       <th className="px-4 py-5 text-center">CURRENT ROLE</th>
                       <th className="px-4 py-5 text-center">ELIGIBLE FOR</th>
                       <th className="px-4 py-5">READINESS</th>
                       <th className="px-8 py-5">NETWORK PERFORMANCE</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {mockEligible.map((row) => (
                       <tr key={row.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-8 py-6 text-sm font-bold text-white">{row.id}</td>
                          <td className="px-4 py-6 text-center">
                             <span className="px-3 py-1 rounded bg-[#60A5FA]/10 text-[#60A5FA] text-[9px] font-black border border-[#60A5FA]/30">{row.role}</span>
                          </td>
                          <td className="px-4 py-6 text-center">
                             <span className="px-3 py-1 rounded bg-[#34d399]/10 text-[#34d399] text-[9px] font-black border border-[#34d399]/30">{row.eligibleFor}</span>
                          </td>
                          <td className="px-4 py-6">
                             <div className="flex items-center gap-4">
                                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                   <div className={`h-full ${row.color} rounded-full`} style={{ width: `${row.readiness}%` }} />
                                </div>
                                <span className="text-[10px] font-black text-white/60">{row.readiness}%</span>
                             </div>
                          </td>
                          <td className="px-8 py-6">
                             <div className="flex items-center gap-2">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={row.growth.includes('-') ? '#f87171' : '#34d399'} strokeWidth="3"><polyline points={row.growth.includes('-') ? "23 18 13.5 8.5 8.5 13.5 1 6" : "23 6 13.5 15.5 8.5 10.5 1 18"}></polyline></svg>
                                <span className={`text-[10px] font-bold ${row.growth.includes('-') ? 'text-[#f87171]' : 'text-[#34d399]'}`}>{row.growth}</span>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>

           <div className="px-8 py-5 flex items-center justify-between border-t border-white/5 bg-white/[0.01]">
              <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">
                 Showing 3 of 28 eligible candidates
              </div>
              <div className="flex items-center gap-1">
                 <button className="w-8 h-8 rounded-lg text-white/20 hover:text-white transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="15 18 9 12 15 6"></polyline></svg>
                 </button>
                 <button className="w-8 h-8 rounded-lg bg-[#3B82F6] text-white text-[10px] font-black shadow-lg shadow-[#3B82F6]/20">1</button>
                 <button className="w-8 h-8 rounded-lg text-white/40 text-[10px] font-black hover:text-white">2</button>
                 <button className="w-8 h-8 rounded-lg text-white/40 text-[10px] font-black hover:text-white">3</button>
                 <button className="w-8 h-8 rounded-lg text-white/20 hover:text-white transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"></polyline></svg>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function CriteriaCard({ label, value, sub }: any) {
  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/5 group hover:bg-white/[0.08] transition-all relative">
       <div className="flex justify-between items-start mb-4">
          <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">{label}</p>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/20"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
       </div>
       <p className="text-3xl font-bold font-display text-white mb-2">{value}</p>
       <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">{sub}</p>
    </div>
  );
}
