'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import TreeView from '@/components/ui/TreeView';
import StatCard from '@/components/ui/StatCard';
import { HCM_TREE, HCM_TEAM_MEMBERS } from '@/lib/mockData';

export default function HcmNetworkPage() {
  const color = '#f87171';
  const activeCount = HCM_TEAM_MEMBERS.filter(m => m.status === 'active').length;

  return (
    <DashboardLayout pageTitle="Network Tree">
      <div className="space-y-8 pb-10">
        <div>
          <h2 className="font-display text-3xl font-bold text-white tracking-tight">Network Hierarchy</h2>
          <p className="text-sm text-muted mt-1 font-medium">Visual genealogy of your HCC team</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard label="Total HCCs" value={String(HCM_TEAM_MEMBERS.length)} change="Direct downline" color={color} />
          <StatCard label="Active" value={String(activeCount)} change={`${HCM_TEAM_MEMBERS.length - activeCount} inactive`} color={color} />
          <StatCard label="Network Depth" value="2 Levels" change="HCM → HCC" color={color} />
        </div>

        <div className="bg-surface border border-white/[0.07] rounded-2xl p-6 shadow-xl overflow-x-auto">
          <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-6">Genealogy Tree</h3>
          <div className="min-w-[600px] flex justify-center">
            <TreeView nodes={HCM_TREE} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
