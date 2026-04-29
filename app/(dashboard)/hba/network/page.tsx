'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import TreeView from '@/components/ui/TreeView';
import StatCard from '@/components/ui/StatCard';
import { HBA_TREE, HBA_TEAM_MEMBERS } from '@/lib/mockData';

export default function HbaNetworkPage() {
  const color = '#3b82f6';
  const totalNetwork = HBA_TEAM_MEMBERS.reduce((sum, m) => sum + m.teamSize, 0) + HBA_TEAM_MEMBERS.length;
  const activeMembers = HBA_TEAM_MEMBERS.filter(m => m.status === 'active').length;

  return (
    <DashboardLayout pageTitle="Network Tree">
      <div className="space-y-8 pb-10">
        <div>
          <h2 className="font-display text-3xl font-bold text-white tracking-tight">Network Hierarchy</h2>
          <p className="text-sm text-muted mt-1 font-medium">Visual genealogy of your HCM and HCC network</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard label="Total Network Size" value={String(totalNetwork)} change="All levels combined" color={color} />
          <StatCard label="Active Members" value={String(activeMembers)} change={`${HBA_TEAM_MEMBERS.length - activeMembers} inactive`} color={color} />
          <StatCard label="Network Depth" value="3 Levels" change="HBA → HCM → HCC" color={color} />
        </div>

        {/* Tree View */}
        <div className="bg-surface border border-white/[0.07] rounded-2xl p-6 shadow-xl overflow-x-auto">
          <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-6">Genealogy Tree</h3>
          <div className="min-w-[600px] flex justify-center">
            <TreeView nodes={HBA_TREE} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
