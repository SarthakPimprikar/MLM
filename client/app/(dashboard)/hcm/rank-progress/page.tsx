'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import RankProgressBar from '@/components/ui/RankProgressBar';
import StatCard from '@/components/ui/StatCard';
import { HCM_USER, HCM_TEAM_MEMBERS } from '@/lib/mockData';

export default function HcmRankProgressPage() {
  const color = '#f87171';
  const user = HCM_USER;

  // HCM → HBA promotion criteria
  // - 12 personal sales (lifetime)
  // - recruit 12 HCCs
  // From spec: HCM → HBA: directly recruit 5 HCM (but HCM recruits HCCs, so we use HCC count)
  const salesProgress = Math.min(user.personalSalesCount, 12);
  const recruitProgress = Math.min(HCM_TEAM_MEMBERS.length, 12);
  const salesPercent = Math.round((salesProgress / 12) * 100);
  const recruitPercent = Math.round((recruitProgress / 12) * 100);
  const overallPercent = Math.round((salesPercent + recruitPercent) / 2);

  return (
    <DashboardLayout pageTitle="Rank Progress">
      <div className="space-y-8 pb-10">
        <div>
          <h2 className="font-display text-3xl font-bold text-white tracking-tight">Promotion Tracker</h2>
          <p className="text-sm text-muted mt-1 font-medium">Track your progress towards HBA promotion</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
          <StatCard label="Current Rank" value="HCM" change="Health Care Manager" color={color} />
          <StatCard label="Target Rank" value="HBA" change="Health Business Associate" color="#3b82f6" />
          <StatCard label="Overall Progress" value={`${overallPercent}%`} change="Combined criteria" color={color} />
          <StatCard label="Estimated" value={overallPercent >= 100 ? 'Ready!' : `${Math.ceil((12 - salesProgress + 12 - recruitProgress) / 2)} months`} change={overallPercent >= 100 ? 'Effective next cycle' : 'At current pace'} color={color} />
        </div>

        {/* Main Progress Card */}
        <RankProgressBar
          currentRank="HCM"
          nextRank="HBA"
          currentSales={user.personalSalesCount}
          targetSales={12}
          currentRecruits={HCM_TEAM_MEMBERS.length}
          targetRecruits={12}
          color={color}
        />

        {/* Detailed Criteria */}
        <div className="bg-surface border border-white/[0.07] rounded-2xl p-6 shadow-xl">
          <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-6">Promotion Criteria Breakdown</h3>
          
          <div className="space-y-6">
            {/* Criteria 1: Personal Sales */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${salesProgress >= 12 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                    {salesProgress >= 12 ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">12 Personal Sales (Lifetime)</div>
                    <div className="text-[10px] text-muted mt-0.5">Complete at least 12 policy sales personally</div>
                  </div>
                </div>
                <span className="text-sm font-mono font-bold text-white">{salesProgress} / 12</span>
              </div>
              <div className="h-2 bg-surface2 rounded-full overflow-hidden ml-11">
                <div 
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${salesPercent}%`, backgroundColor: salesProgress >= 12 ? '#10b981' : color }}
                />
              </div>
            </div>

            {/* Criteria 2: HCC Recruitment */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${recruitProgress >= 12 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                    {recruitProgress >= 12 ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Recruit 12 HCCs</div>
                    <div className="text-[10px] text-muted mt-0.5">Build a team of 12 Health Care Consultants</div>
                  </div>
                </div>
                <span className="text-sm font-mono font-bold text-white">{recruitProgress} / 12</span>
              </div>
              <div className="h-2 bg-surface2 rounded-full overflow-hidden ml-11">
                <div 
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${recruitPercent}%`, backgroundColor: recruitProgress >= 12 ? '#10b981' : color }}
                />
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="mt-6 px-4 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl">
            <p className="text-[10px] text-muted italic">
              <strong className="text-white not-italic">Note:</strong> Rank upgrade takes effect from the next payout cycle after criteria are met. 
              Your upline HBA and State Head will be notified automatically.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
