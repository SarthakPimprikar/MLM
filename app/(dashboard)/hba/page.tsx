'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/ui/StatCard';
import WalletCard from '@/components/ui/WalletCard';
import MiniBarChart from '@/components/ui/MiniBarChart';
import TeamMemberTable from '@/components/ui/TeamMemberTable';
import Link from 'next/link';
import {
  HBA_USER, HBA_WALLET, HBA_LEDGER, HBA_TEAM_MEMBERS,
  HBA_MONTHLY_PERFORMANCE, HBA_RECENT_SALES
} from '@/lib/mockData';

export default function HbaDashboard() {
  const user = HBA_USER;
  const wallet = HBA_WALLET;
  const color = '#3b82f6'; // HBA Blue

  const totalNetworkVolume = HBA_TEAM_MEMBERS.reduce((sum, m) => sum + m.totalRevenue, 0);
  const overrideThisMonth = HBA_LEDGER
    .filter(e => e.type === 'override' && e.cycleMonth === '2026-04')
    .reduce((sum, e) => sum + e.amount, 0);
  const activeHCMs = HBA_TEAM_MEMBERS.filter(m => m.status === 'active').length;

  return (
    <DashboardLayout pageTitle="Business Associate Portal">
      <div className="space-y-8 pb-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold text-black tracking-tight">
              Welcome, {user.name.split(' ')[0]}
            </h2>
            <p className="text-sm text-muted mt-1 font-medium">
              You are an active <span className="text-hba font-bold tracking-tight">Health Business Associate</span> managing {HBA_TEAM_MEMBERS.length} HCMs
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/hba/network" className="px-5 py-2.5 rounded-xl bg-hba/10 border border-hba/20 text-hba text-xs font-bold uppercase tracking-widest hover:bg-hba/20 transition-all">
              View Network
            </Link>
            <Link href="/hba/override-income" className="px-5 py-2.5 rounded-xl bg-hba text-[#0d0f14] text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-hba/10">
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
              <p className="text-[10px] text-red-400/70 mt-0.5">You need minimum 1 personal sale + 1 HCM recruitment this month to remain active</p>
            </div>
          </div>
        )}

        {/* Core Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            label="Override Income (April)"
            value={`₹${(overrideThisMonth / 100).toLocaleString('en-IN')}`}
            change="40% of HCM earnings"
            color={color}
          />
          <StatCard
            label="Active HCMs"
            value={String(activeHCMs).padStart(2, '0')}
            change={`${HBA_TEAM_MEMBERS.length} total network managers`}
            color={color}
          />
          <StatCard
            label="Network Volume"
            value={`₹${(totalNetworkVolume / 100).toLocaleString('en-IN')}`}
            change="All-time team revenue"
            color={color}
          />
          <StatCard
            label="Current Rank"
            value="HBA"
            change="Health Business Associate"
            color={color}
          />
        </div>

        {/* Wallet + Chart + Team */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Wallet */}
          <div className="lg:col-span-5 space-y-8">
            <WalletCard
              provisionalBalance={wallet.provisionalBalance / 100}
              finalBalance={wallet.finalBalance / 100}
              totalEarned={wallet.totalEarned / 100}
              totalWithdrawn={wallet.totalWithdrawn / 100}
              color={color}
              onWithdraw={() => alert('Withdrawal request feature — connect backend!')}
            />

            {/* Recent Override Income */}
            <div className="bg-surface border border-white/[0.07] rounded-2xl overflow-hidden shadow-xl">
              <div className="px-6 py-5 border-b border-white/[0.07] flex items-center justify-between bg-white/[0.01]">
                <h3 className="font-display text-sm font-bold text-black uppercase tracking-wider">Recent Override Income</h3>
                <Link href="/hba/override-income" className="text-[10px] font-bold text-hba uppercase tracking-widest hover:underline">View All</Link>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {HBA_LEDGER.filter(e => e.type === 'override').slice(0, 5).map((entry) => (
                  <div key={entry._id} className="px-6 py-3.5 flex items-center gap-4 hover:bg-white/[0.02] transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-black font-medium truncate">{entry.description}</p>
                      <p className="text-[10px] text-muted mt-0.5">{new Date(entry.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-emerald-400">+₹{(entry.amount / 100).toLocaleString('en-IN')}</span>
                      <div className="mt-0.5">
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${entry.status === 'final' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                          {entry.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Chart + Recent Sales */}
          <div className="lg:col-span-7 space-y-8">
            <MiniBarChart
              data={HBA_MONTHLY_PERFORMANCE}
              color={color}
              title="Monthly Revenue & Override Trend"
            />

            {/* Recent Personal Sales */}
            <div className="bg-surface border border-white/[0.07] rounded-2xl overflow-hidden shadow-xl">
              <div className="px-6 py-5 border-b border-white/[0.07] flex items-center justify-between bg-white/[0.01]">
                <h3 className="font-display text-sm font-bold text-black uppercase tracking-wider">Recent Personal Sales</h3>
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{user.personalSalesThisMonth} this month</span>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {HBA_RECENT_SALES.map((sale) => (
                  <div key={sale._id} className="px-6 py-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-hba/10 border border-hba/20 flex items-center justify-center text-hba">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-black font-bold truncate">{sale.customerName}</div>
                      <div className="text-[10px] text-muted mt-0.5 flex items-center gap-2">
                        <span>{sale.plan.name}</span>
                        <span className="opacity-20">•</span>
                        <span className="font-mono">{sale.policyId}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-black text-hba">₹{(sale.amount / 100).toLocaleString('en-IN')}</div>
                      <div className="text-[10px] text-muted font-medium mt-0.5">
                        {new Date(sale.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Table */}
        <TeamMemberTable
          members={HBA_TEAM_MEMBERS}
          color={color}
          title="HCM Network Overview"
          showTeamSize={true}
        />
      </div>
    </DashboardLayout>
  );
}
