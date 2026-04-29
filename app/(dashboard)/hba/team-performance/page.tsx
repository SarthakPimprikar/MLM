'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import TeamMemberTable from '@/components/ui/TeamMemberTable';
import MiniBarChart from '@/components/ui/MiniBarChart';
import StatCard from '@/components/ui/StatCard';
import { HBA_TEAM_MEMBERS, HBA_MONTHLY_PERFORMANCE } from '@/lib/mockData';

export default function HbaTeamPerformancePage() {
  const color = '#3b82f6';
  const totalRevenue = HBA_TEAM_MEMBERS.reduce((sum, m) => sum + m.totalRevenue, 0);
  const totalSalesThisMonth = HBA_TEAM_MEMBERS.reduce((sum, m) => sum + m.personalSalesThisMonth, 0);
  const activeCount = HBA_TEAM_MEMBERS.filter(m => m.status === 'active').length;

  return (
    <DashboardLayout pageTitle="Team Performance">
      <div className="space-y-8 pb-10">
        <div>
          <h2 className="font-display text-3xl font-bold text-black tracking-tight">Team Performance</h2>
          <p className="text-sm text-muted mt-1 font-medium">Detailed HCM-wise performance breakdown and analytics</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          <StatCard label="Total Team Revenue" value={`₹${(totalRevenue / 100).toLocaleString('en-IN')}`} change="All-time network" color={color} />
          <StatCard label="Active HCMs" value={`${activeCount}/${HBA_TEAM_MEMBERS.length}`} change="Active/Total ratio" color={color} />
          <StatCard label="Team Sales (April)" value={String(totalSalesThisMonth)} change="Current cycle" color={color} />
          <StatCard label="Avg Revenue/HCM" value={`₹${(totalRevenue / HBA_TEAM_MEMBERS.length / 100).toLocaleString('en-IN')}`} change="Per manager" color={color} />
        </div>

        <MiniBarChart data={HBA_MONTHLY_PERFORMANCE} color={color} title="Monthly Team Revenue Trend" />

        {/* Level-wise Distribution */}
        <div className="bg-surface border border-white/[0.07] rounded-2xl p-6 shadow-xl">
          <h3 className="font-display text-sm font-bold text-black uppercase tracking-wider mb-5">Level-wise Distribution</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-[10px] font-black">HBA</div>
                <div>
                  <div className="text-xs font-bold text-black">Level 0 — You</div>
                  <div className="text-[10px] text-muted">Health Business Associate</div>
                </div>
              </div>
              <div className="text-2xl font-display font-bold text-black">1</div>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 text-[10px] font-black">HCM</div>
                <div>
                  <div className="text-xs font-bold text-black">Level 1 — Managers</div>
                  <div className="text-[10px] text-muted">Direct downline</div>
                </div>
              </div>
              <div className="text-2xl font-display font-bold text-black">{HBA_TEAM_MEMBERS.length}</div>
            </div>
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-[10px] font-black">HCC</div>
                <div>
                  <div className="text-xs font-bold text-black">Level 2 — Consultants</div>
                  <div className="text-[10px] text-muted">Indirect downline</div>
                </div>
              </div>
              <div className="text-2xl font-display font-bold text-black">{HBA_TEAM_MEMBERS.reduce((s, m) => s + m.teamSize, 0)}</div>
            </div>
          </div>
        </div>

        <TeamMemberTable members={HBA_TEAM_MEMBERS} color={color} title="HCM Performance Breakdown" showTeamSize={true} />
      </div>
    </DashboardLayout>
  );
}
