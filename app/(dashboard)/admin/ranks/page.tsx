'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { usersAPI } from '@/lib/api';

const RANKS = [
  {
    id: 'hcc',
    label: 'HCC',
    fullName: 'Health Care Consultant',
    color: '#60a5fa',
    requirements: [
      { label: 'E-Pin Activation', value: 'Required' },
      { label: 'Personal Sales', value: '0 required' },
      { label: 'Direct Commission', value: '20% of policy' },
    ],
    description: 'Entry-level distributor. Earns direct commissions on personal policy sales.',
  },
  {
    id: 'hcm',
    label: 'HCM',
    fullName: 'Health Care Manager',
    color: '#8b7cf8',
    requirements: [
      { label: 'Minimum HCCs', value: '3 active HCCs' },
      { label: 'Team Sales', value: '10+ policies/month' },
      { label: 'Override Bonus', value: '40% of HCC' },
    ],
    description: 'Mid-level manager. Earns override on direct HCC team\'s commissions.',
  },
  {
    id: 'hba',
    label: 'HBA',
    fullName: 'Health Business Associate',
    color: '#fbbf24',
    requirements: [
      { label: 'Minimum HCMs', value: '3 active HCMs' },
      { label: 'Network Size', value: '30+ active members' },
      { label: 'Override Bonus', value: '40% of HCM' },
    ],
    description: 'Senior associate. Earns overrides on HCM team network.',
  },
  {
    id: 'sh',
    label: 'SH',
    fullName: 'State Head',
    color: '#34d399',
    requirements: [
      { label: 'Minimum HBAs', value: '3 active HBAs' },
      { label: 'Leadership Bonus', value: '2% of state volume' },
      { label: 'Network Size', value: '100+ members' },
    ],
    description: 'State-level leader. Earns 2% leadership bonus on entire state volume.',
  },
];

export default function AdminRanksPage() {
  const [stats, setStats] = useState<Record<string, number>>({ hcc: 124, hcm: 45, hba: 12, sh: 3 });
  const [loading, setLoading] = useState(false);

  return (
    <DashboardLayout pageTitle="Rank Hierarchy">
      <div className="space-y-6 pb-20">
        {/* Header Section */}
        <div className="bg-[#131241] rounded-[2rem] p-8 mb-8 border border-white/[0.03] shadow-xl text-white">
           <div className="flex justify-between items-center mb-6">
              <div>
                 <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">CUREBHARAT / ADMIN / RANK HIERARCHY</p>
                 <h1 className="text-3xl font-bold font-display">Rank Hierarchy</h1>
              </div>
              <div className="px-4 py-2 rounded-xl bg-[#6029F1]/10 border border-[#6029F1]/20 text-[#6029F1] text-[9px] font-black uppercase tracking-widest">
                 Structure Active
              </div>
           </div>
           <p className="text-sm text-white/50 font-medium max-w-2xl leading-relaxed">Define the hierarchical progression levels, promotion criteria, and management overrides for the entire distribution network.</p>
        </div>

        {/* Distribution Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           <RankStat label="SH LEADERS" value="03" color="text-[#34d399]" />
           <RankStat label="HBA ASSOCIATES" value="12" color="text-[#fbbf24]" />
           <RankStat label="HCM MANAGERS" value="45" color="text-[#8b7cf8]" />
           <RankStat label="HCC CONSULTANTS" value="124" color="text-[#60A5FA]" />
        </div>

        {/* Rank Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           {RANKS.map((rank) => (
              <div key={rank.id} className="bg-[#131241] rounded-[2rem] p-10 text-white shadow-xl border border-white/[0.03] relative overflow-hidden group">
                 <div 
                    className="absolute top-0 right-0 w-64 h-64 blur-[100px] -mr-32 -mt-32 opacity-10 group-hover:opacity-20 transition-opacity"
                    style={{ backgroundColor: rank.color }}
                 />
                 
                 <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                       <div>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-2 block">TIER LEVEL</span>
                          <div className="flex items-center gap-4">
                             <div className="text-4xl font-black font-display" style={{ color: rank.color }}>{rank.label}</div>
                             <div className="h-8 w-px bg-white/10" />
                             <div className="text-lg font-bold text-white/80">{rank.fullName}</div>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-3xl font-black font-display text-white">{stats[rank.id]}</p>
                          <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Members</p>
                       </div>
                    </div>

                    <p className="text-sm text-white/40 font-medium mb-10 leading-relaxed max-w-md">{rank.description}</p>

                    <div className="space-y-4">
                       <p className="text-[10px] font-black text-[#6029F1] uppercase tracking-[0.2em]">Promotion Criteria</p>
                       <div className="grid grid-cols-1 gap-3">
                          {rank.requirements.map((req, i) => (
                             <div key={i} className="flex justify-between items-center bg-white/[0.02] border border-white/5 rounded-xl p-4">
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{req.label}</span>
                                <span className="text-xs font-black text-white">{req.value}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </div>
           ))}
        </div>

        {/* Career Growth Path */}
        <div className="bg-[#131241] rounded-[2rem] p-10 text-white shadow-xl border border-white/[0.03]">
           <div className="flex items-center gap-3 mb-12">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6029F1" strokeWidth="2.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              <h3 className="text-xl font-bold font-display uppercase tracking-widest">Career Growth Path</h3>
           </div>
           
           <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative px-4">
              {/* Connector Line */}
              <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 hidden md:block" />
              
              {RANKS.map((rank, i) => (
                 <div key={rank.id} className="relative z-10 flex flex-col items-center group">
                    <div 
                       className="w-20 h-20 rounded-[2rem] flex items-center justify-center text-xl font-black font-display border-2 transition-all group-hover:scale-110 shadow-2xl"
                       style={{ 
                          backgroundColor: `${rank.color}10`, 
                          borderColor: `${rank.color}40`, 
                          color: rank.color,
                          boxShadow: `0 0 40px -10px ${rank.color}40`
                       }}
                    >
                       {rank.label}
                    </div>
                    <div className="mt-4 text-center">
                       <p className="text-[10px] font-black text-white uppercase tracking-widest">{rank.fullName}</p>
                       <p className="text-[8px] font-bold text-white/20 uppercase tracking-tighter mt-1">LVL {i + 1}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function RankStat({ label, value, color }: any) {
  return (
    <div className="bg-[#131241] rounded-2xl p-6 border border-white/[0.03] shadow-lg flex justify-between items-center">
       <div>
          <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">{label}</p>
          <p className={`text-2xl font-black font-display ${color}`}>{value}</p>
       </div>
       <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/20">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
       </div>
    </div>
  );
}
