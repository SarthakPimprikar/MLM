'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const ROLES = [
  {
    id: 'admin', label: 'Admin', color: '#6029F1',
    permissions: ['Full system access', 'KYC approval', 'Payout authorization', 'Commission config', 'E-Pin generation', 'Role management'],
    count: 1,
    description: 'Super admin with unrestricted platform access.',
    icon: 'shield'
  },
  {
    id: 'sh', label: 'State Head', color: '#34d399',
    permissions: ['State dashboard', 'HBA onboarding', 'State revenue report', 'State hierarchy view'],
    count: 3,
    description: 'Manages a specific geographic state and earns 2% leadership bonus.',
    icon: 'map'
  },
  {
    id: 'hba', label: 'Health Business Associate', color: '#fbbf24',
    permissions: ['HBA dashboard', 'HCM onboarding', 'Network overview', 'Override income view'],
    count: 8,
    description: 'Senior network leader. Earns overrides on HCM team.',
    icon: 'briefcase'
  },
  {
    id: 'hcm', label: 'Health Care Manager', color: '#f87171',
    permissions: ['HCM dashboard', 'HCC onboarding', 'Team monitor', 'Override income view'],
    count: 24,
    description: 'Team manager. Earns overrides on HCC direct commissions.',
    icon: 'users'
  },
  {
    id: 'hcc', label: 'Health Care Consultant', color: '#60a5fa',
    permissions: ['HCC dashboard', 'New sale', 'Sales history', 'My wallet', 'Withdraw', 'KYC submission'],
    count: 137,
    description: 'Entry-level distributor. Earns direct policy commissions.',
    icon: 'user'
  },
];

export default function AdminRoleManagerPage() {
  return (
    <DashboardLayout pageTitle="Role Manager">
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div className="flex justify-between items-center">
           <div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">CUREBHARAT / ADMIN / ROLE MANAGER</p>
              <h1 className="text-3xl font-bold text-[#000000] font-display">Role Manager</h1>
           </div>
           <button className="bg-[#6029F1] px-6 py-3 rounded-xl text-[10px] font-black text-white uppercase tracking-widest shadow-lg shadow-[#6029F1]/20 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Create New Role
           </button>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           <RoleStat label="TOTAL ROLES" value="5" sub="Active on platform" icon="roles" color="text-[#6029F1]" />
           <RoleStat label="PERMISSIONS" value="24" sub="Granular rules" icon="lock" color="text-[#fbbf24]" />
           <RoleStat label="ADMIN USERS" value="1" sub="Super hold status" icon="shield" color="text-[#34d399]" />
           <RoleStat label="HIERARCHY DEPTH" value="15" sub="Levels deep" icon="levels" color="text-[#60A5FA]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           {/* Left Column: Roles Grid */}
           <div className="lg:col-span-8 space-y-4">
              {ROLES.map((role) => (
                 <div key={role.id} className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03] group hover:border-[#6029F1]/30 transition-all">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                       <div className="flex items-center gap-5">
                          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#6029F1]/10 transition-colors">
                             <span className="text-xl font-display font-black" style={{ color: role.color }}>{role.label.slice(0, 2)}</span>
                          </div>
                          <div>
                             <h3 className="text-xl font-bold font-display">{role.label}</h3>
                             <p className="text-xs text-white/40 font-medium max-w-sm">{role.description}</p>
                          </div>
                       </div>
                       <div className="text-right flex-shrink-0">
                          <p className="text-2xl font-bold font-display" style={{ color: role.color }}>{role.count}</p>
                          <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Active Members</p>
                       </div>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-white/5">
                       <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-4">Core Permissions</p>
                       <div className="flex flex-wrap gap-2">
                          {role.permissions.map((perm) => (
                             <span key={perm} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] font-black text-white/60 uppercase tracking-widest">
                                {perm}
                             </span>
                          ))}
                       </div>
                    </div>

                    <div className="mt-8 flex gap-3">
                       <button className="flex-1 bg-white/5 hover:bg-white/10 rounded-xl py-3 text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all">Edit Permissions</button>
                       <button className="flex-1 bg-white/5 hover:bg-white/10 rounded-xl py-3 text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all">View Members</button>
                    </div>
                 </div>
              ))}
           </div>

           {/* Right Column: Analytics */}
           <div className="lg:col-span-4 space-y-6">
              {/* Role Distribution */}
              <div className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
                 <h3 className="text-sm font-bold font-display uppercase tracking-widest mb-10">Role Distribution</h3>
                 <div className="flex flex-col items-center">
                    <div className="w-40 h-40 relative flex items-center justify-center bg-white/[0.02] rounded-3xl border border-white/[0.05]">
                       <div className="absolute inset-2 rounded-2xl border-[6px] border-[#6029F1]/40 flex items-center justify-center">
                          <div className="text-center">
                             <p className="text-2xl font-bold font-display">178</p>
                             <p className="text-[9px] font-black text-white/30 uppercase">TOTAL</p>
                          </div>
                       </div>
                    </div>
                    <div className="mt-10 space-y-4 w-full">
                       <LegendRow label="Admin" value="1" color="bg-[#6029F1]" />
                       <LegendRow label="State Head" value="3" color="bg-[#34d399]" />
                       <LegendRow label="HBA" value="8" color="bg-[#fbbf24]" />
                       <LegendRow label="HCM" value="24" color="bg-[#f87171]" />
                       <LegendRow label="HCC" value="137" color="bg-[#60a5fa]" />
                    </div>
                 </div>
              </div>

              {/* Security Insights */}
              <div className="bg-gradient-to-br from-[#6029F1] to-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/10">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    </div>
                    <h3 className="text-sm font-bold font-display uppercase tracking-widest">Permission Audit</h3>
                 </div>
                 <p className="text-xs text-white/60 leading-relaxed mb-6">Last audit was performed <span className="text-white font-bold">2 days ago</span>. No unauthorized permission escalations detected.</p>
                 <button className="w-full bg-white/10 hover:bg-white/20 rounded-xl py-3 text-[10px] font-black uppercase tracking-widest border border-white/20 transition-all">DOWNLOAD AUDIT PDF</button>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function RoleStat({ label, value, sub, icon, color }: any) {
  return (
    <div className="bg-[#131241] rounded-[1.5rem] p-6 text-white shadow-xl border border-white/[0.03] relative group">
       <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">{label}</p>
       <p className="text-3xl font-bold font-display mb-2">{value}</p>
       <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{sub}</p>
       <div className={`absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center opacity-40 ${color}`}>
          {icon === 'roles' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
          {icon === 'lock' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>}
          {icon === 'shield' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>}
          {icon === 'levels' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>}
       </div>
    </div>
  );
}

function LegendRow({ label, value, color }: any) {
  return (
    <div className="flex justify-between items-center">
       <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${color}`} />
          <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{label}</span>
       </div>
       <span className="text-xs font-bold text-white">{value}</span>
    </div>
  );
}
