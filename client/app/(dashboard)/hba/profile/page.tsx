'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import ProfileCard from '@/components/ui/ProfileCard';
import StatCard from '@/components/ui/StatCard';
import { HBA_USER, HBA_WALLET } from '@/lib/mockData';

export default function HbaProfilePage() {
  const color = '#3b82f6';

  return (
    <DashboardLayout pageTitle="My Profile">
      <div className="space-y-8 pb-10">
        <div>
          <h2 className="font-display text-3xl font-bold text-black tracking-tight">My Profile</h2>
          <p className="text-sm text-muted mt-1 font-medium">Your account information and performance summary</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <ProfileCard user={HBA_USER} color={color} />
          </div>
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-2 gap-5">
              <StatCard label="Personal Sales" value={String(HBA_USER.personalSalesCount)} change="All-time" color={color} />
              <StatCard label="This Month" value={String(HBA_USER.personalSalesThisMonth)} change="April 2026" color={color} />
              <StatCard label="Team Size" value={String(HBA_USER.teamSize)} change="Direct HCMs" color={color} />
              <StatCard label="Total Earned" value={`₹${(HBA_WALLET.totalEarned / 100).toLocaleString('en-IN')}`} change="Lifetime earnings" color={color} />
            </div>

            {/* Performance Summary */}
            <div className="bg-surface border border-white/[0.07] rounded-2xl p-6 shadow-xl">
              <h3 className="font-display text-sm font-bold text-black uppercase tracking-wider mb-5">Activity Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm text-black font-medium">Monthly Personal Sale</span>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${HBA_USER.personalSalesThisMonth >= 1 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                    {HBA_USER.personalSalesThisMonth >= 1 ? '✓ Completed' : '✗ Required'}
                  </span>
                </div>
                <div className="flex items-center justify-between bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-sm text-black font-medium">Monthly HCM Recruitment</span>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                    ✓ Completed
                  </span>
                </div>
                <div className="flex items-center justify-between bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-sm text-black font-medium">KYC Verification</span>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                    ✓ Approved
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
