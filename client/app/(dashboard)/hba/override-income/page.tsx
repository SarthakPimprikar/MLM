'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import LedgerTable from '@/components/ui/LedgerTable';
import StatCard from '@/components/ui/StatCard';
import { HBA_LEDGER } from '@/lib/mockData';

export default function HbaOverrideIncomePage() {
  const color = '#3b82f6';
  const overrideEntries = HBA_LEDGER.filter(e => e.type === 'override');
  const totalOverride = overrideEntries.reduce((sum, e) => sum + e.amount, 0);
  const thisMonthOverride = overrideEntries.filter(e => e.cycleMonth === '2026-04').reduce((sum, e) => sum + e.amount, 0);
  const pendingSettlement = overrideEntries.filter(e => e.status === 'provisional').reduce((sum, e) => sum + e.amount, 0);

  return (
    <DashboardLayout pageTitle="Override Income">
      <div className="space-y-8 pb-10">
        <div>
          <h2 className="font-display text-3xl font-bold text-white tracking-tight">Override Income</h2>
          <p className="text-sm text-muted mt-1 font-medium">40% override earnings from your HCM network</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard label="Total Override Earned" value={`₹${(totalOverride / 100).toLocaleString('en-IN')}`} change="All-time override income" color={color} />
          <StatCard label="This Month" value={`₹${(thisMonthOverride / 100).toLocaleString('en-IN')}`} change="April 2026 cycle" color={color} />
          <StatCard label="Pending Settlement" value={`₹${(pendingSettlement / 100).toLocaleString('en-IN')}`} change="Settles on cycle end" color={color} />
        </div>

        <LedgerTable entries={overrideEntries} color={color} title="Override Income Ledger" />
      </div>
    </DashboardLayout>
  );
}
