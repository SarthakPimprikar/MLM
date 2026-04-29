'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/ui/StatCard';
import { HCM_TEAM_MEMBERS } from '@/lib/mockData';

export default function HcmTeamMonitorPage() {
  const color = '#f87171';
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filtered = filter === 'all' 
    ? HCM_TEAM_MEMBERS 
    : HCM_TEAM_MEMBERS.filter(m => m.status === filter);

  const activeCount = HCM_TEAM_MEMBERS.filter(m => m.status === 'active').length;
  const inactiveCount = HCM_TEAM_MEMBERS.filter(m => m.status === 'inactive').length;
  const complianceRate = Math.round((HCM_TEAM_MEMBERS.filter(m => m.personalSalesThisMonth >= 1).length / HCM_TEAM_MEMBERS.length) * 100);

  return (
    <DashboardLayout pageTitle="Team Monitor">
      <div className="space-y-8 pb-10">
        <div>
          <h2 className="font-display text-3xl font-bold text-white tracking-tight">HCC Team Monitor</h2>
          <p className="text-sm text-muted mt-1 font-medium">Real-time activity tracking and compliance monitoring</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          <StatCard label="Total Team" value={String(HCM_TEAM_MEMBERS.length)} change="Health Care Consultants" color={color} />
          <StatCard label="Active" value={String(activeCount)} change={`${Math.round(activeCount / HCM_TEAM_MEMBERS.length * 100)}% active rate`} color={color} />
          <StatCard label="Inactive" value={String(inactiveCount)} change="Need attention" color={color} isPositive={false} />
          <StatCard label="Activity Compliance" value={`${complianceRate}%`} change="Min 1 sale/month" color={color} />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2">
          {(['all', 'active', 'inactive'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                filter === f
                  ? 'bg-hcm text-[#0d0f14]'
                  : 'bg-white/[0.03] border border-white/[0.07] text-muted hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              {f} ({f === 'all' ? HCM_TEAM_MEMBERS.length : f === 'active' ? activeCount : inactiveCount})
            </button>
          ))}
        </div>

        {/* Individual HCC Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((member) => {
            const isCompliant = member.personalSalesThisMonth >= 1;
            return (
              <div
                key={member._id}
                className="bg-surface border border-white/[0.07] rounded-2xl p-6 shadow-xl relative overflow-hidden hover:border-white/[0.12] transition-all group"
              >
                {/* Status indicator line */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${member.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{member.name}</div>
                      <div className="text-[10px] text-muted font-mono mt-0.5">{member.memberId}</div>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${
                    member.status === 'active'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-red-500/10 text-red-400 border-red-500/20'
                  }`}>
                    <span className={`w-1 h-1 rounded-full ${member.status === 'active' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                    {member.status}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-3 mb-4">
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-3 text-center">
                    <div className="text-[9px] text-muted font-bold uppercase tracking-widest">This Month</div>
                    <div className={`text-lg font-display font-bold ${member.personalSalesThisMonth > 0 ? 'text-white' : 'text-red-400'}`}>
                      {member.personalSalesThisMonth}
                    </div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-3 text-center">
                    <div className="text-[9px] text-muted font-bold uppercase tracking-widest">Total Sales</div>
                    <div className="text-lg font-display font-bold text-white">{member.personalSalesCount}</div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-3 text-center">
                    <div className="text-[9px] text-muted font-bold uppercase tracking-widest">Revenue</div>
                    <div className="text-sm font-display font-bold" style={{ color }}>₹{(member.totalRevenue / 100 / 1000).toFixed(0)}k</div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-3 text-center">
                    <div className="text-[9px] text-muted font-bold uppercase tracking-widest">Last Active</div>
                    <div className="text-[11px] font-bold text-white">{new Date(member.lastActive).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</div>
                  </div>
                </div>

                {/* Compliance Indicator */}
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                  isCompliant 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}>
                  {isCompliant ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      Monthly activity met
                    </>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      No sales this month — at risk
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
