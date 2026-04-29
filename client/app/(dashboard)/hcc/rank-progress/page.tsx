'use client';

import { useAuth } from '@/lib/auth';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RankProgressBar from '@/components/ui/RankProgressBar';

export default function RankProgress() {
  const { user } = useAuth();
  
  if (!user) return null;

  const nextRank = user.rank === 'HCC' ? 'HCM' : user.rank === 'HCM' ? 'HBA' : user.rank === 'HBA' ? 'SH' : 'MAX';
  
  // Rules for HCC -> HCM
  const salesNeeded = 12;
  const recruitsNeeded = 12;

  const salesProgress = Math.min((user.personalSalesCount / salesNeeded) * 100, 100);
  const recruitsProgress = Math.min((user.teamSize / recruitsNeeded) * 100, 100);

  return (
    <DashboardLayout pageTitle="Rank Progression Journey">
       <div className="max-w-5xl mx-auto space-y-10 pb-20">
          <div className="text-center space-y-4">
             <div className="inline-block px-4 py-1.5 rounded-full bg-hcc/10 border border-hcc/20 text-hcc text-[10px] font-black uppercase tracking-widest mb-4">
                Current Standing: {user.rank}
             </div>
             <h2 className="font-display text-4xl font-bold text-white tracking-tight">Your Path to {nextRank}</h2>
             <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
                Unlock higher commission overrides and managerial benefits by reaching the next milestone.
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* Sales Requirement */}
             <div className="bg-surface border border-white/[0.07] rounded-[40px] p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sh/5 blur-3xl -mr-16 -mt-16 group-hover:bg-sh/10 transition-colors" />
                <h3 className="font-display text-lg font-bold text-white mb-8 tracking-tight">Personal Sales Volume</h3>
                
                <div className="space-y-6 relative z-10">
                   <div className="flex justify-between items-end mb-2">
                      <span className="text-3xl font-display font-bold text-white">{user.personalSalesCount} <span className="text-sm text-muted font-sans">/ {salesNeeded}</span></span>
                      <span className="text-sm font-black text-sh">{Math.round(salesProgress)}%</span>
                   </div>
                   <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-sh shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all duration-1000" style={{ width: `${salesProgress}%` }} />
                   </div>
                   <p className="text-[10px] text-muted font-bold uppercase tracking-widest">
                      {salesNeeded - user.personalSalesCount > 0 
                        ? `Sell ${salesNeeded - user.personalSalesCount} more policies to qualify` 
                        : 'Requirement satisfied! ✅'}
                   </p>
                </div>
             </div>

             {/* Team Requirement */}
             <div className="bg-surface border border-white/[0.07] rounded-[40px] p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-hcc/5 blur-3xl -mr-16 -mt-16 group-hover:bg-hcc/10 transition-colors" />
                <h3 className="font-display text-lg font-bold text-white mb-8 tracking-tight">Team Recruitment</h3>
                
                <div className="space-y-6 relative z-10">
                   <div className="flex justify-between items-end mb-2">
                      <span className="text-3xl font-display font-bold text-white">{user.teamSize} <span className="text-sm text-muted font-sans">/ {recruitsNeeded}</span></span>
                      <span className="text-sm font-black text-hcc">{Math.round(recruitsProgress)}%</span>
                   </div>
                   <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-hcc shadow-[0_0_20px_rgba(96,165,250,0.3)] transition-all duration-1000" style={{ width: `${recruitsProgress}%` }} />
                   </div>
                   <p className="text-[10px] text-muted font-bold uppercase tracking-widest">
                      {recruitsNeeded - user.teamSize > 0 
                        ? `Onboard ${recruitsNeeded - user.teamSize} more direct HCCs` 
                        : 'Requirement satisfied! ✅'}
                   </p>
                </div>
             </div>
          </div>

          {/* Benefits Comparison */}
          <div className="bg-surface border border-white/[0.07] rounded-[40px] p-10 shadow-2xl">
             <h3 className="font-display text-xl font-bold text-white mb-8 tracking-tight text-center">Rank Benefits Comparison</h3>
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="border-b border-white/10">
                         <th className="py-4 text-[10px] font-black text-muted uppercase tracking-widest">Benefit</th>
                         <th className="py-4 text-[10px] font-black text-hcc uppercase tracking-widest">HCC (Your Current)</th>
                         <th className="py-4 text-[10px] font-black text-hcm uppercase tracking-widest">HCM (Manager)</th>
                         <th className="py-4 text-[10px] font-black text-hba uppercase tracking-widest">HBA (Associate)</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                      <BenefitRow label="Direct Commission" hcc="40% of BV" hcm="40% of BV" hba="40% of BV" />
                      <BenefitRow label="Team Overrides" hcc="None" hcm="40% of HCCs" hba="40% of HCMs" />
                      <BenefitRow label="Leadership Bonus" hcc="None" hcc_off hcm="None" hcm_off hba="Available" />
                      <BenefitRow label="E-Pin Access" hcc="Consumer" hcm="Distributor" hba="Bulk Master" />
                   </tbody>
                </table>
             </div>
          </div>

          <div className="p-8 bg-hcc/5 border border-hcc/20 rounded-[32px] text-center">
             <p className="text-sm font-bold text-white leading-relaxed">
                "Growth is a journey of consistency. Every policy you sell brings you closer to managing your own enterprise."
             </p>
          </div>
       </div>
    </DashboardLayout>
  );
}

function BenefitRow({ label, hcc, hcm, hba, hcc_off, hcm_off }: any) {
  return (
    <tr className="group hover:bg-white/[0.01] transition-colors">
       <td className="py-6 text-[10px] font-black text-muted uppercase tracking-widest">{label}</td>
       <td className={`py-6 text-xs font-bold ${hcc_off ? 'text-white/20 line-through' : 'text-white'}`}>{hcc}</td>
       <td className={`py-6 text-xs font-bold ${hcm_off ? 'text-white/20 line-through' : 'text-hcm'}`}>{hcm}</td>
       <td className="py-6 text-xs font-bold text-hba">{hba}</td>
    </tr>
  );
}
