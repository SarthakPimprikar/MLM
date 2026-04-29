'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { usersAPI, salesAPI, walletAPI } from '@/lib/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 172,
    activeUsers: 133,
    inactiveUsers: 39,
    pendingKYC: 49,
    totalSales: 18413699,
    totalPayout: 1133373
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In production, fetch actual data here
  }, []);

  return (
    <DashboardLayout pageTitle="Dashboard">
      <div className="space-y-6 pb-10">
        {/* Header Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <h1 className="text-3xl font-bold text-[#000000] font-display">Welcome Back, Admin</h1>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-borderLight px-3 py-2 rounded-lg shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <select className="bg-transparent text-sm font-bold text-slate focus:outline-none appearance-none pr-4 cursor-pointer">
                <option>Current Month</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-white border border-borderLight px-3 py-2 rounded-lg shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <select className="bg-transparent text-sm font-bold text-slate focus:outline-none appearance-none pr-4 cursor-pointer">
                <option>All States</option>
              </select>
            </div>
            <button className="flex items-center gap-2 bg-white border border-borderLight px-4 py-2 rounded-lg shadow-sm text-sm font-bold text-textDark hover:bg-gray-50 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
              Refresh
            </button>
            <button className="flex items-center gap-2 bg-[#6029F1] px-4 py-2 rounded-lg shadow-md text-sm font-bold text-white hover:brightness-110 transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Export
            </button>
          </div>
        </div>

        {/* Stat Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-4">
            <KPIItem label="Total Users" value={stats.totalUsers} color="text-white" />
            <KPIItem label="Active Users" value={stats.activeUsers} color="text-white" />
            <KPIItem label="Inactive Users" value={stats.inactiveUsers} color="text-white" />
            <KPIItem label="Pending KYC" value={stats.pendingKYC} color="text-white" badge="URGENT" />
          </div>
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <KPIItem label="Total Sales" value={`₹${stats.totalSales.toLocaleString('en-IN')}`} color="text-white" />
            <KPIItem label="Total Payout" value={`₹${stats.totalPayout.toLocaleString('en-IN')}`} color="text-white" />
          </div>
        </div>

        {/* Charts and Side Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Revenue Trends */}
          <div className="lg:col-span-6 bg-[#131241] rounded-[2rem] p-6 text-white overflow-hidden relative shadow-xl border border-white/[0.03]">
             <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                  <h3 className="text-lg font-bold font-display">Revenue Trends</h3>
                </div>
                <div className="w-24 h-4 bg-white/5 rounded-full" />
             </div>
             <div className="h-48 relative flex items-end gap-1">
                {/* Mock Area Chart Bars */}
                {[30, 45, 35, 55, 40, 65].map((h, i) => (
                  <div key={i} className="flex-1 bg-[#60A5FA]/10 relative group h-full flex items-end">
                    <div className="w-full bg-[#60A5FA]/30 group-hover:bg-[#60A5FA]/50 transition-all rounded-t-sm" style={{ height: `${h}%` }} />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#60A5FA]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
             </div>
             <div className="flex justify-between mt-4 text-[9px] font-black text-white/40 uppercase tracking-widest px-1">
                <span>WK 1</span><span>WK 2</span><span>WK 3</span><span>WK 4</span><span>WK 5</span><span>CURRENT</span>
             </div>
          </div>

          {/* Role Distribution */}
          <div className="lg:col-span-3 bg-[#131241] rounded-[2rem] p-6 text-white shadow-xl border border-white/[0.03]">
             <h3 className="text-lg font-bold font-display mb-8">Role Distribution</h3>
             <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-xl border-[6px] border-[#60A5FA] flex flex-col items-center justify-center relative mb-8 shadow-[0_0_40px_-10px_rgba(96,165,250,0.5)]">
                   <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">TOTAL</span>
                   <span className="text-3xl font-bold font-display leading-none">{stats.totalUsers}</span>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3 w-full">
                   <LegendItem label="Elite" color="bg-[#60A5FA]" />
                   <LegendItem label="Ambassador" color="bg-[#8b7cf8]" />
                   <LegendItem label="Partner" color="bg-[#34d399]" />
                   <LegendItem label="Basic" color="bg-[#64748B]" />
                </div>
             </div>
          </div>

          {/* Compliance & Contribution */}
          <div className="lg:col-span-3 space-y-4">
             <div className="bg-[#131241] rounded-[2rem] p-6 text-white shadow-xl border border-white/[0.03]">
                <h3 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-6">Compliance Pulse</h3>
                <div className="space-y-6">
                   <ProgressItem label="HCC (Distributors)" val="85%" color="#60a5fa" />
                   <ProgressItem label="HCM (Managers)" val="12%" color="#f87171" />
                   <ProgressItem label="HBA (Assocs)" val="2%" color="#3b82f6" />
                   <ProgressItem label="SH (State Heads)" val="1%" color="#34d399" />
                </div>
             </div>
             <div className="bg-[#131241] rounded-[2rem] p-6 text-white shadow-xl border border-white/[0.03]">
                <h3 className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-6">State Contribution</h3>
                <div className="space-y-4">
                   <StateRow label="MH" value="₹8.2M" width="80%" />
                   <StateRow label="DL" value="₹4.1M" width="50%" />
                   <StateRow label="KA" value="₹2.8M" width="35%" />
                </div>
             </div>
          </div>
        </div>

        {/* Bottom Section: Tables and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-9 space-y-6">
             {/* Recent Joining List */}
             <div className="bg-[#131241] rounded-[2rem] text-white shadow-xl overflow-hidden border border-white/[0.03]">
                <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center">
                   <h3 className="text-lg font-bold font-display">Recent Joining List</h3>
                   <button className="text-xs font-bold text-[#60A5FA] hover:underline uppercase tracking-widest">View All</button>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] border-b border-white/5">
                            <th className="px-8 py-4">ID</th>
                            <th className="px-4 py-4">Name</th>
                            <th className="px-4 py-4">Role</th>
                            <th className="px-4 py-4">Sponsor</th>
                            <th className="px-4 py-4 text-center">State</th>
                            <th className="px-4 py-4 text-center">Status</th>
                            <th className="px-4 py-4 text-right">Sales</th>
                            <th className="px-8 py-4 text-right">Income</th>
                         </tr>
                      </thead>
                      <tbody className="text-sm font-medium">
                         <RowData id="#99281" name="Arjun Mehra" role="Elite" sponsor="#88212" state="MH" status="ACTIVE" sales="₹12,400" income="₹1,240" />
                         <RowData id="#99275" name="Sara Khan" role="Partner" sponsor="#77610" state="DL" status="INACTIVE" sales="₹0" income="₹0" />
                         <RowData id="#99268" name="Vikram Singh" role="Ambassador" sponsor="#11092" state="KA" status="ACTIVE" sales="₹84,900" income="₹8,490" />
                      </tbody>
                   </table>
                </div>
             </div>

             {/* Pending Withdrawals */}
             <div className="bg-[#131241] rounded-[2rem] text-white shadow-xl overflow-hidden border border-white/[0.03]">
                <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center">
                   <h3 className="text-lg font-bold font-display">Pending Withdrawals</h3>
                   <div className="flex gap-4">
                      <button className="text-[10px] font-black bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/10 uppercase tracking-widest transition-all">Batch Approve</button>
                      <button className="text-[10px] font-black text-[#60A5FA] hover:underline uppercase tracking-widest">View All</button>
                   </div>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] border-b border-white/5">
                            <th className="px-8 py-4">ID</th>
                            <th className="px-4 py-4">Cycle</th>
                            <th className="px-4 py-4">Role</th>
                            <th className="px-4 py-4 text-right">Amount</th>
                            <th className="px-4 py-4 text-right">TDS</th>
                            <th className="px-4 py-4 text-center">Status</th>
                            <th className="px-8 py-4 text-center">Actions</th>
                         </tr>
                      </thead>
                      <tbody className="text-sm font-medium">
                         <WithdrawRow id="#WTH-1022" cycle="JUN-W4" role="Elite" amount="₹45,000" tds="₹2,250" status="REVIEW" />
                         <WithdrawRow id="#WTH-1023" cycle="JUN-W4" role="Partner" amount="₹12,400" tds="₹620" status="REVIEW" />
                      </tbody>
                   </table>
                </div>
             </div>
          </div>

          {/* Operational Alerts */}
          <div className="lg:col-span-3 bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl h-fit border border-white/[0.03]">
             <div className="flex justify-between items-center mb-8">
                <h3 className="text-sm font-bold font-display uppercase tracking-widest">Operational Alerts</h3>
                <span className="bg-[#f87171] text-[9px] font-black px-2 py-0.5 rounded text-black">3 NEW</span>
             </div>
             <div className="space-y-8">
                <AlertItem 
                   icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>} 
                   title="Withdrawals on hold" 
                   desc="Verification pending for #WTH-1022 cycle." 
                />
                <AlertItem 
                   icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>} 
                   title="12 New joins today" 
                   desc="Spike in MH region, check local tax config." 
                />
                <AlertItem 
                   icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>} 
                   title="KYC Queue Cleared" 
                   desc="All premium members verified successfully." 
                />
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function KPIItem({ label, value, color, badge }: any) {
  const isLong = String(value).length > 10;
  const isVeryLong = String(value).length > 14;
  
  return (
    <div className="bg-[#131241] rounded-[1.5rem] p-5 text-white shadow-lg flex flex-col justify-between h-36 border border-white/[0.03]">
      <div className="flex justify-between items-start">
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{label}</span>
        {badge && <span className="bg-[#fbbf24] text-[8px] font-black px-1.5 py-0.5 rounded text-black tracking-tighter">{badge}</span>}
      </div>
      <div className={`${isVeryLong ? 'text-lg' : isLong ? 'text-xl' : 'text-3xl'} font-bold font-display tracking-tighter mt-auto truncate`}>
        {value}
      </div>
    </div>
  );
}

function LegendItem({ label, color }: any) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider">{label}</span>
    </div>
  );
}

function ProgressItem({ label, val, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{label}</span>
        <span className="text-xs font-bold text-[#60A5FA]">{val}</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: val, backgroundColor: color }} />
      </div>
    </div>
  );
}

function StateRow({ label, value, width }: any) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-[10px] font-black w-6 text-white/60">{label}</span>
      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-[#3B82F6] opacity-60 rounded-full" style={{ width }} />
      </div>
      <span className="text-[10px] font-bold text-white/40 w-12 text-right">{value}</span>
    </div>
  );
}

function RowData({ id, name, role, sponsor, state, status, sales, income }: any) {
  return (
    <tr className="hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
       <td className="px-8 py-5 text-[#60A5FA] font-bold tracking-tight">{id}</td>
       <td className="px-4 py-5 text-white font-bold">{name}</td>
       <td className="px-4 py-5 text-white/60 text-xs">{role}</td>
       <td className="px-4 py-5 text-white/40 font-mono text-[10px]">{sponsor}</td>
       <td className="px-4 py-5 text-center text-white/80 text-xs font-bold">{state}</td>
       <td className="px-4 py-5 text-center">
          {status === 'INACTIVE' ? (
            <span className="text-[9px] font-black px-2 py-0.5 rounded bg-[#64748B]/20 text-[#64748B] tracking-widest">
               {status}
            </span>
          ) : (
            <div className="w-12 h-1.5 bg-white/5 rounded-full mx-auto" />
          )}
       </td>
       <td className="px-4 py-5 text-right text-white font-bold">{sales}</td>
       <td className="px-8 py-5 text-right text-white font-bold">{income}</td>
    </tr>
  );
}

function WithdrawRow({ id, cycle, role, amount, tds, status }: any) {
  return (
    <tr className="hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
       <td className="px-8 py-4 text-[#60A5FA] font-bold">{id}</td>
       <td className="px-4 py-4 text-white/60 font-mono text-[10px]">{cycle}</td>
       <td className="px-4 py-4 text-white/60">{role}</td>
       <td className="px-4 py-4 text-right text-white font-bold">{amount}</td>
       <td className="px-4 py-4 text-right text-white/60">{tds}</td>
       <td className="px-4 py-4 text-center">
          <span className="text-[9px] font-black px-2 py-0.5 rounded bg-[#fbbf24]/10 text-[#fbbf24]">{status}</span>
       </td>
       <td className="px-8 py-4 text-center">
          <button className="p-1 hover:text-[#60A5FA] transition-colors">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </button>
       </td>
    </tr>
  );
}

function AlertItem({ icon, title, desc }: any) {
  return (
    <div className="flex gap-4 group cursor-pointer">
       <div className="flex-shrink-0 mt-1">{icon}</div>
       <div>
          <h4 className="text-sm font-bold text-white group-hover:text-[#60A5FA] transition-colors">{title}</h4>
          <p className="text-xs text-white/40 mt-1 leading-relaxed">{desc}</p>
       </div>
    </div>
  );
}
