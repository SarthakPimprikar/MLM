'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { usersAPI } from '@/lib/api';
import { IUser } from '@/types';

export default function AdminUserDetailsPage() {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Mock data for initial "wow" effect as per Figma screenshot
  const mockUser = {
    name: 'Arjun Sharma',
    memberId: 'USR-89021-X',
    role: 'SH',
    roleLabel: 'Super Holder',
    status: 'ACTIVE',
    kycStatus: 'KYC APPROVED',
    location: 'Maharashtra, IN',
    sponsorId: 'MLM-10292',
    contact: '+91 98XXX XXX21',
    joined: 'Oct 14, 2022',
    sales: '₹ 8,42,100',
    salesTrend: '+12.4% vs prev',
    income: '₹ 42.85 L',
    risk: 'LOW',
    riskDate: 'Jan 12, 2024',
    network: {
      directSH: 14,
      hba: 82,
      hcm: 342,
      hcc: 1029
    }
  };

  useEffect(() => {
    // Default to mock user for demonstration if no search
    if (!search) {
      setSelectedUser(mockUser);
    }
  }, [search]);

  const [activeTab, setActiveTab] = useState('NETWORK');

  return (
    <DashboardLayout pageTitle="User Details">
      <div className="space-y-6 pb-10">
        {/* Top Search / Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
           <div className="relative w-full max-w-md">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input
                type="text"
                placeholder="Global search by ID or name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#131241] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:ring-2 focus:ring-[#6029F1] transition-all"
              />
           </div>
           <div className="flex items-center gap-4">
              <button className="text-white/40 hover:text-white transition-colors">
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              </button>
              <div className="w-10 h-10 rounded-full bg-[#131241] border border-white/10 flex items-center justify-center font-bold text-white">
                 {selectedUser?.name?.slice(0, 1)}
              </div>
           </div>
        </div>

        {selectedUser && (
          <>
            {/* Top Stat Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <DetailStat label="CURRENT ROLE" value={selectedUser.role} sub={selectedUser.roleLabel} icon="award" />
              <DetailStat label="MONTHLY SALES" value={selectedUser.sales} sub={selectedUser.salesTrend} icon="sales" trend="up" />
              <DetailStat label="TOTAL INCOME" value={selectedUser.income} sub="Net Earnings After TDS" icon="wallet" />
              <DetailStat label="COMPLIANCE RISK" value={selectedUser.risk} sub={`Verified: ${selectedUser.riskDate}`} icon="shield" status="LOW" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Profile & Details */}
              <div className="lg:col-span-8 space-y-6">
                {/* Profile Card */}
                <div className="bg-[#131241] rounded-[2.5rem] p-8 text-white shadow-xl border border-white/[0.03] relative overflow-hidden">
                   <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                      <div className="relative">
                         <div className="w-32 h-32 rounded-[2rem] overflow-hidden border-2 border-[#6029F1]/30">
                            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun" alt="avatar" className="w-full h-full object-cover bg-[#1c2030]" />
                         </div>
                         <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#34d399] rounded-xl border-4 border-[#131241] flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
                         </div>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                         <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                            <h2 className="text-3xl font-bold font-display">{selectedUser.name}</h2>
                            <span className="text-white/40 font-mono text-sm">#{selectedUser.memberId}</span>
                         </div>
                         <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-8">
                            <span className="px-4 py-1 rounded-lg bg-[#6029F1]/10 border border-[#6029F1]/20 text-[10px] font-black text-[#6029F1] tracking-widest uppercase">{selectedUser.status}</span>
                            <span className="px-4 py-1 rounded-lg bg-[#34d399]/10 border border-[#34d399]/20 text-[10px] font-black text-[#34d399] tracking-widest uppercase">{selectedUser.kycStatus}</span>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                               <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">SPONSOR ID</p>
                               <div className="flex items-center gap-2 text-[#60A5FA] font-bold text-sm">
                                  {selectedUser.sponsorId}
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                               </div>
                            </div>
                            <div>
                               <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">CONTACT DETAILS</p>
                               <p className="text-white font-bold text-sm">{selectedUser.contact}</p>
                            </div>
                            <div>
                               <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">DATE JOINED</p>
                               <p className="text-white font-bold text-sm">{selectedUser.joined}</p>
                            </div>
                         </div>
                      </div>
                      <div className="text-center md:text-right">
                         <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">STATE LOCATION</p>
                         <p className="text-white font-bold">{selectedUser.location}</p>
                      </div>
                   </div>
                   <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-white/5">
                      <button className="flex-1 bg-[#1c2030] hover:bg-white/5 border border-white/10 rounded-xl py-4 text-[11px] font-black text-[#34d399] uppercase tracking-[0.2em] transition-all">ACTIVATE</button>
                      <button className="flex-1 bg-[#1c2030] hover:bg-white/5 border border-white/10 rounded-xl py-4 text-[11px] font-black text-white/30 uppercase tracking-[0.2em] transition-all">DEACTIVATE</button>
                   </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/5">
                   {['NETWORK', 'FINANCE', 'COMPLIANCE', 'TIMELINE'].map(tab => (
                     <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-8 py-4 text-[11px] font-black uppercase tracking-[0.2em] relative transition-all ${
                          activeTab === tab ? 'text-[#6029F1]' : 'text-white/30 hover:text-white/60'
                        }`}
                     >
                        {tab}
                        {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6029F1]" />}
                     </button>
                   ))}
                </div>

                {/* Tab Content: Network */}
                {activeTab === 'NETWORK' && (
                  <div className="space-y-6 animate-in fade-in duration-500">
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <SmallStat label="DIRECT SH" value={selectedUser.network.directSH} />
                        <SmallStat label="HBA" value={selectedUser.network.hba} />
                        <SmallStat label="HCM" value={selectedUser.network.hcm} />
                        <SmallStat label="HCC" value={selectedUser.network.hcc} />
                     </div>

                     {/* Sponsor Chain */}
                     <div className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
                        <div className="flex justify-between items-center mb-8">
                           <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">SPONSOR CHAIN (LINEAGE)</h3>
                           <button className="text-[10px] font-bold text-[#60A5FA] uppercase tracking-widest hover:underline">VISUAL TREE</button>
                        </div>
                        <div className="space-y-8 relative">
                           <div className="absolute left-3 top-2 bottom-2 w-px bg-white/5" />
                           <LineageItem level="L4" name="Pooja Mehra" sub="Direct Sponsor" active />
                           <LineageItem level="L3" name="Sanjay Gupta" />
                           <LineageItem level="L2" name="System Root Node" />
                        </div>
                     </div>

                     {/* Top Direct Downlines */}
                     <div className="bg-[#131241] rounded-[2rem] text-white shadow-xl border border-white/[0.03] overflow-hidden">
                        <div className="px-8 py-6 border-b border-white/5">
                           <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">TOP DIRECT DOWNLINES</h3>
                        </div>
                        <table className="w-full">
                           <thead>
                              <tr className="text-[9px] font-black text-white/20 uppercase tracking-widest border-b border-white/5">
                                 <th className="px-8 py-4 text-left">ROLE</th>
                                 <th className="px-4 py-4 text-center">VOL (₹)</th>
                                 <th className="px-8 py-4 text-right">STATUS</th>
                              </tr>
                           </thead>
                           <tbody className="text-xs font-bold">
                              <tr className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                                 <td className="px-8 py-4 text-white/60">HBA</td>
                                 <td className="px-4 py-4 text-center">12,400</td>
                                 <td className="px-8 py-4 text-right"><span className="text-[9px] font-black px-2 py-0.5 rounded bg-[#34d399]/10 text-[#34d399]">ACTIVE</span></td>
                              </tr>
                              <tr className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                                 <td className="px-8 py-4 text-white/60">HCM</td>
                                 <td className="px-4 py-4 text-center">4,120</td>
                                 <td className="px-8 py-4 text-right"><span className="text-[9px] font-black px-2 py-0.5 rounded bg-[#fbbf24]/10 text-[#fbbf24]">PENDING</span></td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
                )}
              </div>

              {/* Right Column: Actions & Logs */}
              <div className="lg:col-span-4 space-y-6">
                 {/* Decision Box */}
                 <div className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
                    <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-6">ADMIN DECISION BOX</h3>
                    <p className="text-[9px] font-black text-white/20 uppercase mb-3">DECISION NARRATIVE / REMARKS</p>
                    <textarea 
                       placeholder="State the reason for status change or manual adjustment..."
                       className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-xs text-white placeholder:text-white/20 min-h-[120px] focus:outline-none focus:ring-1 focus:ring-[#6029F1] transition-all mb-6"
                    />
                    <div className="flex gap-3">
                       <button className="flex-1 bg-[#6029F1] rounded-xl py-3 text-[10px] font-black text-white uppercase tracking-widest shadow-lg shadow-[#6029F1]/20 hover:brightness-110 transition-all">SAVE CHANGES</button>
                       <button className="w-12 h-12 bg-white/[0.05] rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-colors">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                       </button>
                    </div>
                 </div>

                 {/* Payout Advisory */}
                 <div className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
                    <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">PAYOUT ADVISORY</h3>
                    <p className="text-[9px] font-bold text-white/20 mb-8">Status of pending ₹ 18,400 withdrawal</p>
                    
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[9px] font-black text-white/40 tracking-widest">RISK LEVEL</span>
                       <span className="text-[9px] font-black text-[#34d399] tracking-widest uppercase">CLEAR</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-8">
                       <div className="h-full bg-[#34d399] rounded-full" style={{ width: '85%' }} />
                    </div>

                    <button className="w-full bg-[#34d399] rounded-xl py-4 text-[10px] font-black text-[#0d0f14] uppercase tracking-widest mb-4 flex items-center justify-center gap-2">
                       ALLOW PAYOUT
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </button>
                    <div className="flex gap-4">
                       <button className="flex-1 bg-white/[0.03] rounded-xl py-3 text-[9px] font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors">HOLD</button>
                       <button className="flex-1 bg-white/[0.03] rounded-xl py-3 text-[9px] font-bold text-white/40 uppercase tracking-widest hover:text-white transition-colors">SKIP</button>
                    </div>
                 </div>

                 {/* Audit Trail */}
                 <div className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
                    <div className="flex justify-between items-center mb-8">
                       <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">AUDIT TRAIL</h3>
                       <svg className="text-white/20" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    <div className="space-y-6 mb-8">
                       <AuditItem dot="bg-[#60A5FA]" title="KYC Approved" by="by Admin #8821 • 2d ago" />
                       <AuditItem dot="bg-white/20" title="Rank Promo: SH" by="System Auto • 1w ago" />
                    </div>
                    <button className="w-full text-center text-[9px] font-black text-white/30 uppercase tracking-widest hover:text-white transition-colors">VIEW FULL AUDIT LOG</button>
                 </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

function DetailStat({ label, value, sub, icon, trend, status }: any) {
  return (
    <div className="bg-[#131241] rounded-2xl p-6 text-white shadow-xl border border-white/[0.03] relative group">
      <div className="flex justify-between items-start mb-3">
         <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{label}</span>
         <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
            {icon === 'award' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>}
            {icon === 'sales' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>}
            {icon === 'wallet' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>}
            {icon === 'shield' && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>}
         </div>
      </div>
      <div className="flex items-center gap-3">
         <div className="text-xl font-bold font-display">{value}</div>
         {status === 'LOW' && <div className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />}
      </div>
      <div className={`text-[10px] mt-1 font-bold ${trend === 'up' ? 'text-[#34d399]' : 'text-white/40'}`}>{sub}</div>
    </div>
  );
}

function SmallStat({ label, value }: any) {
  return (
    <div className="bg-[#131241] rounded-2xl p-5 border border-white/[0.03]">
       <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">{label}</p>
       <p className="text-2xl font-bold font-display text-white">{value}</p>
    </div>
  );
}

function LineageItem({ level, name, sub, active }: any) {
  return (
    <div className="flex items-center gap-6 group">
       <div className={`w-7 h-7 rounded-lg border flex items-center justify-center text-[10px] font-black z-10 transition-all ${active ? 'bg-[#6029F1] border-[#6029F1] text-white' : 'bg-[#1c2030] border-white/10 text-white/40'}`}>
          {level}
       </div>
       <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${active ? 'bg-[#60A5FA]' : 'bg-white/10'}`} />
          <div>
             <span className={`text-xs font-bold ${active ? 'text-white' : 'text-white/40'}`}>{name}</span>
             {sub && <span className="text-[10px] text-white/20 font-bold ml-2">({sub})</span>}
          </div>
       </div>
    </div>
  );
}

function AuditItem({ dot, title, by }: any) {
  return (
    <div className="flex items-center gap-4">
       <div className={`w-2 h-2 rounded-full ${dot}`} />
       <div>
          <p className="text-xs font-bold text-white">{title}</p>
          <p className="text-[10px] text-white/30 font-medium">{by}</p>
       </div>
    </div>
  );
}
