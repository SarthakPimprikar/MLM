'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/ui/StatCard';
import WalletCard from '@/components/ui/WalletCard';
import MiniBarChart from '@/components/ui/MiniBarChart';
import RankProgressBar from '@/components/ui/RankProgressBar';
import TeamMemberTable from '@/components/ui/TeamMemberTable';
import Link from 'next/link';
import {
  HCM_USER, HCM_WALLET, HCM_LEDGER, HCM_TEAM_MEMBERS,
  HCM_MONTHLY_PERFORMANCE, HCM_TEAM_SALES
} from '@/lib/mockData';

export default function HcmDashboard() {
  const user = HCM_USER;
  const wallet = HCM_WALLET;
  const color = '#f87171'; // HCM Red

  const overrideThisMonth = HCM_LEDGER
    .filter(e => e.type === 'override' && e.cycleMonth === '2026-04')
    .reduce((sum, e) => sum + e.amount, 0);
  const activeHCCs = HCM_TEAM_MEMBERS.filter(m => m.status === 'active').length;
  const teamSalesThisMonth = HCM_TEAM_MEMBERS.reduce((sum, m) => sum + m.personalSalesThisMonth, 0);

  // HCM → HBA promotion: need 5 HCMs recruited + 25 HCCs total
  // Since HCM manages HCCs directly, we track personal sales and recruitment
  const hcmPromotionSalesProgress = Math.min(user.personalSalesCount, 12);
  const hcmPromotionRecruitProgress = Math.min(HCM_TEAM_MEMBERS.length, 12);

  return (
    <DashboardLayout pageTitle="Manager Dashboard">
      <div className="space-y-8 pb-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-black text-slate-900 tracking-tight">
              Welcome, {user.name.split(' ')[0]}
            </h2>
            <p className="text-sm text-muted mt-1 font-medium">
              You are an active <span className="text-hcm font-bold tracking-tight">Health Care Manager</span> managing {HCM_TEAM_MEMBERS.length} HCCs
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/hcm/team-monitor" className="px-5 py-2.5 rounded-xl bg-hcm/10 border border-hcm/20 text-hcm text-xs font-bold uppercase tracking-widest hover:bg-hcm/20 transition-all">
              Monitor Team
            </Link>
            <Link href="/hcm/override-ledger" className="px-5 py-2.5 rounded-xl bg-hcm text-[#0d0f14] text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-hcm/10">
              Override Ledger
            </Link>
          </div>
        </div>

        {/* Activity Compliance Banner */}
        {user.personalSalesThisMonth < 1 && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center text-red-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-red-400 uppercase tracking-wider">Activity Warning</p>
              <p className="text-[10px] text-red-400/70 mt-0.5">You need minimum 1 personal sale + 1 HCC recruitment this month to remain active</p>
            </div>
          </div>
        )}

        {/* Core Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            label="Manager Override (April)"
            value={`₹${(overrideThisMonth / 100).toLocaleString('en-IN')}`}
            change="40% of HCC earnings"
            color={color}
          />
          <StatCard
            label="Active HCCs"
            value={`${activeHCCs}/${HCM_TEAM_MEMBERS.length}`}
            change={`${HCM_TEAM_MEMBERS.length - activeHCCs} inactive`}
            color={color}
          />
          <StatCard
            label="Team Sales (April)"
            value={String(teamSalesThisMonth)}
            change="Current cycle total"
            color={color}
          />
          <StatCard
            label="Goal to HBA"
            value={`${Math.round((hcmPromotionSalesProgress / 12 + hcmPromotionRecruitProgress / 12) / 2 * 100)}%`}
            change={`${12 - hcmPromotionRecruitProgress} more HCCs needed`}
            color={color}
          />
        </div>

        {/* Row 2: Wallet + Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-8">
            <WalletCard
              provisionalBalance={wallet.provisionalBalance / 100}
              finalBalance={wallet.finalBalance / 100}
              totalEarned={wallet.totalEarned / 100}
              totalWithdrawn={wallet.totalWithdrawn / 100}
              color={color}
              onWithdraw={() => alert('Withdrawal request feature — connect backend!')}
            />

            {/* Rank Progress */}
            <RankProgressBar
              currentRank="HCM"
              nextRank="HBA"
              currentSales={user.personalSalesCount}
              targetSales={12}
              currentRecruits={HCM_TEAM_MEMBERS.length}
              targetRecruits={12}
              color={color}
            />
          </div>

          <div className="lg:col-span-7 space-y-8">
            <MiniBarChart
              data={HCM_MONTHLY_PERFORMANCE}
              color={color}
              title="Monthly Revenue & Override Trend"
            />

            {/* HCC Activity Monitor */}
            <div className="bg-surface border border-white/[0.07] rounded-2xl overflow-hidden shadow-xl">
              <div className="px-6 py-5 border-b border-white/[0.07] flex items-center justify-between bg-white/[0.01]">
                <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">HCC Activity Monitor</h3>
                <Link href="/hcm/team-monitor" className="text-[10px] font-bold text-hcm uppercase tracking-widest hover:underline">View All</Link>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {HCM_TEAM_MEMBERS.slice(0, 5).map((member) => (
                  <div key={member._id} className="px-6 py-3.5 flex items-center gap-4 hover:bg-white/[0.02] transition-colors">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-white truncate">{member.name}</div>
                      <div className="text-[10px] text-muted font-mono">{member.memberId}</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-sm font-bold ${member.personalSalesThisMonth > 0 ? 'text-white' : 'text-red-400'}`}>
                        {member.personalSalesThisMonth}
                      </div>
                      <div className="text-[9px] text-muted uppercase tracking-wider">Sales</div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                      member.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      <span className={`w-1 h-1 rounded-full ${member.status === 'active' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                      {member.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Team Sales Feed */}
        <div className="bg-surface border border-white/[0.07] rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-5 border-b border-white/[0.07] flex items-center justify-between bg-white/[0.01]">
            <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">Recent Team Sales</h3>
            <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{teamSalesThisMonth} sales this month</span>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {HCM_TEAM_SALES.slice(0, 6).map((sale) => (
              <div key={sale._id} className="px-6 py-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-hcm/10 border border-hcm/20 flex items-center justify-center text-hcm">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white font-bold truncate">{sale.customerName}</div>
                  <div className="text-[10px] text-muted mt-0.5 flex items-center gap-2">
                    <span className="font-medium">by {sale.seller.name}</span>
                    <span className="opacity-20">•</span>
                    <span>{sale.plan.name}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-hcm">₹{(sale.amount / 100).toLocaleString('en-IN')}</div>
                  <div className="text-[10px] text-muted font-medium mt-0.5">
                    {new Date(sale.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
