'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function ProfilePage() {
  const [user] = useState({
    name: 'Arjun Sharma',
    memberId: 'CB-MH-20129',
    role: 'State Head (SH)',
    state: 'Maharashtra',
    mobile: '+91 9876543210',
    email: 'rajeev.sharma@curebharat.in',
    joinedDate: 'Oct 14, 2022',
    sponsorId: 'MLM-10292',
    walletBalance: '₹1,39,289',
    kycStatus: 'APPROVED',
    status: 'ACTIVE'
  });

  return (
    <DashboardLayout pageTitle="Profile">
      <div className="space-y-6 pb-12">
        
        {/* 1. Header Profile Card (Full Width) */}
        <div className="bg-[#131241] rounded-[24px] p-8 shadow-2xl border border-white/5">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-[32px] overflow-hidden border-4 border-white/5 shadow-2xl">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-[#131241] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-3xl font-bold text-white tracking-tight">Arjun Sharma</h2>
                <span className="text-xs font-bold text-[#B5B8BD] px-3 py-1 bg-white/5 rounded-full border border-white/5">#USR-99021-X</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="text-[10px] font-black px-3 py-1 bg-[#60A5FA]/20 text-[#60A5FA] rounded-md tracking-widest uppercase border border-[#60A5FA]/20">ACTIVE</span>
                <span className="text-[10px] font-black px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-md tracking-widest uppercase border border-emerald-400/20">KYC APPROVED</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2">
                <div>
                  <p className="text-[10px] text-[#B5B8BD] font-bold uppercase tracking-widest mb-1">Sponsor ID</p>
                  <p className="text-sm font-bold text-white flex items-center gap-1.5 hover:text-[#60A5FA] cursor-pointer transition-colors">MLM-10292 <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></p>
                </div>
                <div>
                  <p className="text-[10px] text-[#B5B8BD] font-bold uppercase tracking-widest mb-1">Contact Details</p>
                  <p className="text-sm font-bold text-white">+91 98XXX XXX21</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#B5B8BD] font-bold uppercase tracking-widest mb-1">Date Joined</p>
                  <p className="text-sm font-bold text-white">Oct 14, 2022</p>
                </div>
                <div className="text-right md:text-left">
                  <p className="text-[10px] text-[#B5B8BD] font-bold uppercase tracking-widest mb-1">State Location</p>
                  <p className="text-sm font-bold text-white uppercase">Maharashtra, IN</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-8 pt-8 border-t border-white/5">
            <button className="flex-1 bg-indigo-600/10 text-indigo-400 border border-indigo-400/20 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 hover:text-white transition-all">Activate</button>
            <button className="flex-1 bg-slate-800/50 text-[#B5B8BD] border border-white/5 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all">Deactivate</button>
            <button className="flex-1 bg-red-500/10 text-red-400 border border-red-400/20 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all">Block</button>
            <button className="w-12 bg-white/5 text-[#B5B8BD] border border-white/5 px-2 py-2.5 rounded-xl flex items-center justify-center hover:bg-white/10 transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
            </button>
          </div>
        </div>

        {/* 2. Main Details & Downline Card (Full Width) */}
        <div className="bg-[#131241] rounded-[24px] p-8 shadow-2xl border border-white/5 space-y-10">
          
          {/* Personal Details Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#60A5FA]/10 flex items-center justify-center text-[#60A5FA]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Personal Details</h3>
              </div>
              <button className="flex items-center gap-2 text-[10px] font-bold text-[#60A5FA] uppercase tracking-widest hover:opacity-80 transition-opacity">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                Edit
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Member ID', value: 'CB-MH-00129' },
                { label: 'Full Name', value: 'Rajeev Sharma' },
                { label: 'Role', value: 'State Head (SH)' },
                { label: 'State Alignment', value: 'Maharashtra' },
                { label: 'Mobile Number', value: '+919876543210' },
                { label: 'Email Address', value: 'rajeev.sharma@curebharat.in' },
              ].map((field, i) => (
                <div key={i} className="space-y-2">
                  <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">{field.label}</label>
                  <div className="bg-white/2 border border-white/5 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-inner">{field.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Inner Quick Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Profile Completion', value: '80%', status: 'Good', color: 'emerald', icon: 'check-circle' },
              { label: 'Security Score', value: '65/100', status: 'Review', color: 'amber', icon: 'shield' },
              { label: 'Primary Wallet', value: '₹1,39,289', status: '', color: 'indigo', icon: 'wallet' },
              { label: 'Last Update', value: 'Today', sub: '10:42 AM IST', color: 'slate', icon: 'clock' },
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-white/2 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-4 h-4 text-[#60A5FA]">
                      {stat.icon === 'check-circle' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="16 12 12 8 8 12"></polyline><line x1="12" y1="16" x2="12" y2="8"></line></svg>}
                      {stat.icon === 'shield' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>}
                      {stat.icon === 'wallet' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"></path><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"></path><path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"></path></svg>}
                      {stat.icon === 'clock' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>}
                   </div>
                   <p className="text-[8px] text-[#B5B8BD] font-bold uppercase tracking-widest">{stat.label}</p>
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-bold text-white">{stat.value}</p>
                  {stat.status && <span className={`text-[7px] px-1.5 py-0.5 rounded-sm bg-${stat.color}-500/10 text-${stat.color}-400 font-bold uppercase`}>{stat.status}</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Downline Network Section */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#60A5FA]/10 flex items-center justify-center text-[#60A5FA]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Downline Network</h3>
              </div>
              <button className="text-slate-500"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
            </div>
            <div className="space-y-3">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-xs font-black text-white shadow-lg">SH</div>
                <div>
                  <p className="text-xs font-bold text-white">Rajeev Sharma (You)</p>
                  <p className="text-[9px] text-[#B5B8BD] font-bold uppercase tracking-widest mt-0.5">STATE HEAD</p>
                </div>
              </div>
              <div className="ml-5 border-l border-white/10 pl-6 space-y-3">
                {[
                  { role: 'HBA', label: 'HBA Partners', count: '12 ACTIVE' },
                  { role: 'HM', label: 'Health Managers', count: '45 ACTIVE' },
                  { role: 'CC', label: 'Consultants', count: '189 ACTIVE' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/2 border border-white/5 rounded-xl p-3 flex items-center justify-between group cursor-pointer hover:bg-white/5 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] font-black text-[#B5B8BD] group-hover:text-white">{item.role}</div>
                      <div>
                        <p className="text-[11px] font-bold text-white">{item.label}</p>
                        <p className="text-[9px] text-[#64748B] font-bold mt-0.5">{item.count}</p>
                      </div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600 group-hover:translate-x-1 transition-transform"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Horizontal Stats Grid (4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Profile Completion', value: '80%' },
            { label: 'Security Score', value: '65/100' },
            { label: 'Primary Wallet', value: '₹1,39,289' },
            { label: 'Last Profile Update', value: '2026-04-27' },
          ].map((stat, i) => (
            <div key={i} className="bg-[#131241] border border-white/5 p-6 rounded-[12px] shadow-xl">
               <p className="text-[9px] text-[#B5B8BD] font-bold uppercase tracking-[0.2em] mb-4">{stat.label}</p>
               <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* 4. Document Vault & Activity Timeline (2 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 bg-[#131241] rounded-[24px] p-8 shadow-2xl border border-white/5 space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#60A5FA]/10 flex items-center justify-center text-[#60A5FA]"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg></div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Document Vault</h3>
              </div>
              <button className="bg-[#60A5FA] text-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blue-500/20"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>Upload</button>
            </div>
            <div className="space-y-4">
               <div className="bg-white/2 rounded-xl overflow-hidden border border-white/5">
                 <table className="w-full text-left text-[10px]">
                   <thead className="bg-white/5 border-b border-white/5">
                     <tr><th className="px-6 py-3 font-bold text-[#B5B8BD] uppercase">ID Number</th><th className="px-6 py-3 font-bold text-[#B5B8BD] uppercase">Upload Date</th></tr>
                   </thead>
                   <tbody className="divide-y divide-white/5 font-medium text-slate-300">
                      <tr><td className="px-6 py-4">XXXX-XXXX-1234</td><td className="px-6 py-4">12 Oct 2023</td></tr>
                      <tr><td className="px-6 py-4">ABCDE1234F</td><td className="px-6 py-4">12 Oct 2023</td></tr>
                      <tr><td className="px-6 py-4">HDFC0001234</td><td className="px-6 py-4">24 Oct 2023</td></tr>
                   </tbody>
                 </table>
               </div>
               <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-2">
                 <p className="text-[11px] text-slate-400 font-bold">Bank: HDFC (XXXXXX5842)</p>
                 <p className="text-[11px] text-slate-400 font-bold">IFSC: HDFC0001234</p>
                 <p className="text-[11px] text-slate-400 font-bold">Nominee: Priya Sharma</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 <button className="w-full py-2.5 bg-white/2 border border-white/5 rounded-lg text-[10px] font-bold text-white uppercase tracking-widest hover:bg-white/5 transition-all">Update Bank</button>
                 <button className="w-full py-2.5 bg-white/2 border border-white/5 rounded-lg text-[10px] font-bold text-white uppercase tracking-widest hover:bg-white/5 transition-all">View Nominee</button>
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#131241] rounded-[24px] p-8 shadow-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-[#60A5FA]/10 flex items-center justify-center text-[#60A5FA]"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Activity Timeline</h3>
            </div>
            <div className="space-y-8 relative ml-2">
              <div className="absolute left-1 top-2 bottom-2 w-[1px] bg-white/10" />
              {[
                { title: 'Profile Updated', desc: "Admin updated 'Email Address' field.", time: 'Today, 10:42 AM', color: 'blue' },
                { title: 'Document Uploaded', desc: 'Bank Cancelled Cheque uploaded for verification.', time: '24 Oct 2023, 14:15 PM', color: 'slate' },
                { title: 'Payout Disbursed', desc: 'Commission payout of ₹45,000 processed.', time: '21 Oct 2023, 09:30 AM', color: 'emerald' },
              ].map((item, i) => (
                <div key={i} className="relative pl-8">
                  <div className={`absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-${item.color === 'blue' ? '[#60A5FA]' : item.color === 'slate' ? 'slate-500' : 'emerald-500'} shadow-[0_0_10px_rgba(var(--accent-rgb),0.3)]`} />
                  <p className="text-xs font-bold text-white leading-none">{item.title}</p>
                  <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
                  <p className="text-[9px] text-[#B5B8BD] font-bold mt-2 uppercase tracking-tight">{item.time}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-3 bg-white/2 border border-white/5 rounded-lg text-[10px] font-bold text-[#64748B] uppercase tracking-widest hover:text-white transition-colors">View Full Audit Trail</button>
          </div>
        </div>

        {/* 5. Footer Alert (Full Width) */}
        <div className="bg-amber-400/5 border border-amber-400/20 rounded-[12px] p-6 flex items-start gap-4">
          <div className="text-amber-400 mt-1"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg></div>
          <div>
            <p className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">Admin Audit Note: Pending KYC Verification</p>
            <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Bank details require manual verification against the uploaded cancelled cheque. Please expedite the process to release next payout cycle.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
