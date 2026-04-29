'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import LedgerTable from '@/components/ui/LedgerTable';
import StatCard from '@/components/ui/StatCard';
import { HCM_LEDGER, HCM_TEAM_MEMBERS } from '@/lib/mockData';

export default function HcmOverrideLedgerPage() {
  const color = '#f87171';
  const overrideEntries = HCM_LEDGER.filter(e => e.type === 'override');
  const totalOverride = overrideEntries.reduce((sum, e) => sum + e.amount, 0);
  const thisMonthOverride = overrideEntries.filter(e => e.cycleMonth === '2026-04').reduce((sum, e) => sum + e.amount, 0);
  const pendingSettlement = overrideEntries.filter(e => e.status === 'provisional').reduce((sum, e) => sum + e.amount, 0);

  return (
    <DashboardLayout pageTitle="Override Ledger">
      <div className="space-y-8 pb-10">
        <div>
          <h2 className="font-display text-3xl font-bold text-white tracking-tight">Override Income Ledger</h2>
          <p className="text-sm text-muted mt-1 font-medium">40% override earnings from your HCC team&apos;s sales</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard label="Total Override Earned" value={`₹${(totalOverride / 100).toLocaleString('en-IN')}`} change="All-time" color={color} />
          <StatCard label="This Month" value={`₹${(thisMonthOverride / 100).toLocaleString('en-IN')}`} change="April 2026 cycle" color={color} />
          <StatCard label="Pending Settlement" value={`₹${(pendingSettlement / 100).toLocaleString('en-IN')}`} change="Settles on cycle end" color={color} />
        </div>

        {/* Source-wise breakdown */}
        <div className="bg-surface border border-white/[0.07] rounded-2xl p-6 shadow-xl">
          <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-5">Income by HCC Source</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HCM_TEAM_MEMBERS.filter(m => m.status === 'active').slice(0, 6).map((member) => {
              const memberOverride = Math.round(member.totalRevenue * 0.4 * 0.4);
              return (
                <div key={member._id} className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 flex items-center gap-3 hover:border-white/[0.1] transition-colors">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0"
                    style={{ backgroundColor: `${color}15`, color }}
                  >
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-white truncate">{member.name}</div>
                    <div className="text-[10px] text-muted font-mono">{member.memberId}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black" style={{ color }}>₹{(memberOverride / 100).toLocaleString('en-IN')}</div>
                    <div className="text-[9px] text-muted uppercase tracking-wider">Override</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <LedgerTable entries={overrideEntries} color={color} title="Override Transaction History" />
      </div>
    </DashboardLayout>
  );
}
