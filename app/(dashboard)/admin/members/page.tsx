'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { usersAPI } from '@/lib/api';
import { IUser } from '@/types';

export default function AdminMembers() {
  const [members, setMembers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('ALL ROLES');

  useEffect(() => {
    async function fetchMembers() {
      setLoading(true);
      try {
        const res = await usersAPI.getAll({ page, limit: 10, search });
        if (res.data.success) {
          setMembers(res.data.data || []);
          setTotal(res.data.pagination.total);
        }
      } catch (err) {
        console.error('Member fetch failed', err);
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, [page, search]);

  const tabs = ['ALL ROLES', 'STATE HEAD', 'HBA', 'HCM', 'HCC'];

  return (
    <DashboardLayout pageTitle="Member Management">
      <div className="space-y-6 pb-10">
        {/* Top KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="TOTAL MEMBERS" value="124,582" sub="+12.5% vs last month" trend="up" />
          <StatCard label="ACTIVE MEMBERS" value="98,240" sub="78.8% Retention" trend="up" />
          <StatCard label="INACTIVE MEMBERS" value="21,342" sub="Awaiting reactivation" trend="none" />
          <StatCard label="PENDING KYC" value="4,998" sub="Urgent Action Required" trend="warning" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* Filter Tabs & Add User */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex bg-[#131241] p-1 rounded-xl shadow-lg border border-white/[0.03]">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab 
                        ? 'bg-[#6029F1] text-white shadow-lg shadow-[#6029F1]/20' 
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <button className="bg-[#6029F1] px-6 py-3 rounded-xl text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#6029F1]/20 hover:brightness-110 transition-all">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add User
              </button>
            </div>

            {/* Search & Action Bar */}
            <div className="bg-[#131241] p-4 rounded-[1.5rem] shadow-xl border border-white/[0.03] flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input
                  type="text"
                  placeholder="Search by ID, Name or Sponsor..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/[0.05] border border-white/[0.05] rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-[#6029F1] transition-all"
                />
              </div>
              <div className="flex gap-3">
                <select className="bg-white border border-[#E1E2EC] rounded-xl px-4 py-3 text-sm font-bold text-black outline-none focus:ring-1 focus:ring-[#6029F1] min-w-[120px]">
                  <option>All States</option>
                </select>
                <select className="bg-white border border-[#E1E2EC] rounded-xl px-4 py-3 text-sm font-bold text-black outline-none focus:ring-1 focus:ring-[#6029F1] min-w-[150px]">
                  <option>Sort By: Newest</option>
                </select>
                <button className="p-3 rounded-xl bg-white/[0.05] border border-white/[0.05] text-white hover:bg-white/10 transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                </button>
                <button className="p-3 rounded-xl bg-white/[0.05] border border-white/[0.05] text-white hover:bg-white/10 transition-all">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                </button>
              </div>
            </div>

            {/* Table Area */}
            <div className="bg-[#131241] rounded-[2rem] shadow-xl overflow-hidden border border-white/[0.03]">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] border-b border-white/5">
                      <th className="px-8 py-5 w-16">
                         <div className="w-4 h-4 rounded border border-white/20" />
                      </th>
                      <th className="px-4 py-5">ID</th>
                      <th className="px-4 py-5">MEMBER NAME</th>
                      <th className="px-4 py-5">SPONSOR</th>
                      <th className="px-4 py-5">STATE</th>
                      <th className="px-4 py-5">ROLE</th>
                      <th className="px-4 py-5">STATUS</th>
                      <th className="px-8 py-5"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {loading ? (
                      Array(5).fill(0).map((_, i) => (
                        <tr key={i} className="animate-pulse">
                          <td colSpan={8} className="px-8 py-6"><div className="h-4 bg-white/5 rounded w-full" /></td>
                        </tr>
                      ))
                    ) : (
                      members.map((member) => (
                        <tr key={member._id} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                          <td className="px-8 py-5">
                             <div className="w-4 h-4 rounded border border-white/20 group-hover:border-[#6029F1]" />
                          </td>
                          <td className="px-4 py-5 text-[#60A5FA] font-bold text-xs tracking-tight">#{member.memberId}</td>
                          <td className="px-4 py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-surface2 flex items-center justify-center font-bold text-xs text-white border border-white/10 overflow-hidden">
                                {member.name.slice(0, 1)}
                              </div>
                              <div>
                                <div className="text-sm font-bold text-white">{member.name}</div>
                                <div className="text-[10px] text-white/40 font-medium">{member.name.toLowerCase().replace(' ', '.')}@enterprise.com</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-5">
                            <div className="text-xs font-medium text-white/60">Amit Shah (#MLM-102)</div>
                          </td>
                          <td className="px-4 py-5">
                             <div className="text-xs font-medium text-white/80">{member.state || 'Maharashtra'}</div>
                          </td>
                          <td className="px-4 py-5">
                             <span className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border ${
                               member.role === 'hcc' ? 'text-hcc border-hcc/30 bg-hcc/5' :
                               member.role === 'hcm' ? 'text-hcm border-hcm/30 bg-hcm/5' :
                               'text-hba border-hba/30 bg-hba/5'
                             }`}>
                                {member.role}
                             </span>
                          </td>
                          <td className="px-4 py-5">
                             <div className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'active' ? 'bg-[#34d399]' : 'bg-[#fbbf24]'}`} />
                                <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">{member.status}</span>
                             </div>
                          </td>
                          <td className="px-8 py-5 text-right text-white/30 font-bold">1</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-8 py-5 flex items-center justify-between border-t border-white/5">
                <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
                   Page 1 of 15 · {total} records
                </div>
                <div className="flex items-center gap-1">
                   <button className="p-2 text-white/20 hover:text-white transition-colors">
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                   </button>
                   {[1, 2, 3].map(p => (
                     <button key={p} className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all ${p === 1 ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}>
                       {p}
                     </button>
                   ))}
                   <button className="p-2 text-white/20 hover:text-white transition-colors">
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                   </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Role Distribution Chart */}
            <div className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
               <h3 className="text-sm font-bold font-display uppercase tracking-widest mb-10">Role Distribution</h3>
               <div className="flex flex-col items-center">
                  <div className="w-40 h-40 relative flex items-center justify-center">
                     <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="white" strokeWidth="10" opacity="0.05" />
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#60A5FA" strokeWidth="10" strokeDasharray="264" strokeDashoffset="66" strokeLinecap="round" />
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#8b7cf8" strokeWidth="10" strokeDasharray="264" strokeDashoffset="220" strokeLinecap="round" />
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#fbbf24" strokeWidth="10" strokeDasharray="264" strokeDashoffset="250" strokeLinecap="round" />
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold font-display">124k</span>
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">TOTAL</span>
                     </div>
                  </div>
                  <div className="mt-10 space-y-4 w-full">
                     <DistributionItem label="HCC Members" value="75%" color="bg-[#60A5FA]" />
                     <DistributionItem label="HCM Leads" value="15%" color="bg-[#8b7cf8]" />
                     <DistributionItem label="HBA Partners" value="10%" color="bg-[#fbbf24]" />
                  </div>
               </div>
            </div>

            {/* Profile Selection Placeholder */}
            <div className="bg-[#131241] rounded-[2rem] p-10 text-center text-white shadow-xl border border-white/[0.03] min-h-[350px] flex flex-col items-center justify-center">
               <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-30"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>
               </div>
               <h4 className="text-lg font-bold font-display mb-2">No Profile Selected</h4>
               <p className="text-xs text-white/30 leading-relaxed font-medium">Click any row to inspect profile snapshot, activity and hierarchy context</p>
            </div>

            {/* Info Box */}
            <div className="bg-[#F8F9FE] rounded-xl p-6 border border-borderLight shadow-sm">
               <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#131241]/5 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#131241" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-black uppercase tracking-wider mb-1">Bulk Actions Enabled</h5>
                    <p className="text-[10px] text-slate font-medium leading-relaxed">Select multiple rows to perform batch KYC approval or status updates.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ label, value, sub, trend, trendValue }: any) {
  return (
    <div className="bg-[#131241] rounded-2xl p-6 text-white shadow-xl border border-white/[0.03]">
      <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3">{label}</div>
      <div className="text-3xl font-bold font-display mb-3">{value}</div>
      <div className="flex items-center gap-2">
        {trend === 'up' && (
          <div className="flex items-center gap-1 text-[#34d399] text-[10px] font-bold bg-[#34d399]/10 px-2 py-0.5 rounded-full">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
            {sub}
          </div>
        )}
        {trend === 'warning' && (
          <div className="flex items-center gap-1 text-[#f87171] text-[10px] font-bold bg-[#f87171]/10 px-2 py-0.5 rounded-full">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path></svg>
            {sub}
          </div>
        )}
        {trend === 'none' && (
          <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{sub}</div>
        )}
      </div>
    </div>
  );
}

function DistributionItem({ label, value, color }: any) {
  return (
    <div className="flex items-center justify-between">
       <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${color}`} />
          <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{label}</span>
       </div>
       <span className="text-xs font-bold text-white">{value}</span>
    </div>
  );
}
