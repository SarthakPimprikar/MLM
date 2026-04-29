'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

/**
 * PREMIUM COMMISSION CONFIG PAGE (STAGED)
 * This page uses dummy logic but features premium UI and Full Screen capabilities.
 */
export default function CommissionConfig() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [saleAmount, setSaleAmount] = useState('10000');
  
  // Dynamic Simulation Logic
  const hccPercent = 40;
  const hcmPercent = 40;
  const hbaPercent = 40;
  const shPercent = 2;

  const hccPayout = (parseFloat(saleAmount) || 0) * (hccPercent / 100);
  const hcmPayout = hccPayout * (hcmPercent / 100);
  const hbaPayout = hcmPayout * (hbaPercent / 100);
  const shPayout = (parseFloat(saleAmount) || 0) * (shPercent / 100);
  const totalOutflow = hccPayout + hcmPayout + hbaPayout + shPayout;

  return (
    <DashboardLayout 
      pageTitle="Commission Engine" 
      hideSidebar={isFullScreen} 
      hideTopbar={isFullScreen}
    >
      <div className={`space-y-6 pb-10 transition-all duration-700 animate-fade-in ${isFullScreen ? 'max-w-5xl mx-auto pt-10' : ''}`}>
        
        {/* Floating Action Button for Exit Full Screen */}
        {isFullScreen && (
          <button 
            onClick={() => setIsFullScreen(false)}
            className="fixed top-8 right-8 z-50 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-full text-white hover:bg-white/20 transition-all animate-bounce shadow-2xl"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
               <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </button>
        )}

        {/* Header Section */}
        <div className="bg-[#131241] rounded-[2.5rem] p-10 mb-8 border border-white/[0.05] shadow-2xl text-white relative overflow-hidden group animate-scale-in">
          {/* Decorative Gradients */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#6029F1]/20 rounded-full blur-[100px] group-hover:bg-[#6029F1]/30 transition-all duration-1000" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-2 h-2 rounded-full bg-[#6029F1] animate-pulse" />
                 <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">AI-Powered Commission Engine v2.4</p>
              </div>
              <h1 className="text-4xl font-bold font-display tracking-tight mb-2">Commission Engine</h1>
              <p className="text-sm text-white/40 font-medium max-w-xl leading-relaxed">
                Configure algorithmic payout structures, waterfall logic, and hierarchical overrides. All changes are staged for production deployment after validation.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="bg-white/5 backdrop-blur-md px-6 py-4 rounded-2xl text-[11px] font-black text-white uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all flex items-center gap-3 group"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:scale-110 transition-transform">
                   <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
                {isFullScreen ? 'Exit Focus Mode' : 'Focus Mode'}
              </button>
              
              <button 
                onClick={() => alert('Validation Engine Started... System Outflow OK.')}
                className="bg-[#6029F1] px-8 py-4 rounded-2xl text-[11px] font-black text-white uppercase tracking-widest shadow-xl shadow-[#6029F1]/30 hover:brightness-110 active:scale-95 transition-all"
              >
                Deploy Configuration
              </button>
            </div>
          </div>
        </div>

        {/* Real-time KPI Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in [animation-delay:200ms]">
           <KPICard label="Direct Commission (HCC)" value="40%" sub="Sale Value" trend="+0% (Locked)" color="#60A5FA" />
           <KPICard label="Managerial Override (HCM)" value="40%" sub="of HCC Payout" trend="Dynamic" color="#8b7cf8" />
           <KPICard label="Regional Bonus (HBA)" value="40%" sub="of HCM Payout" trend="Cascading" color="#fbbf24" />
           <KPICard label="Executive Pool (SH)" value="2%" sub="Company Profit" trend="Global" color="#34d399" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 animate-fade-in [animation-delay:400ms]">
           {/* Left: Simulator Panel */}
           <div className="lg:col-span-8 space-y-8">
              <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 relative group overflow-hidden">
                 <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path></svg>
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-slate-900">Live Simulation Sandbox</h3>
                       <p className="text-xs text-slate-400 font-medium">Test structural changes before applying them to the live environment</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="space-y-3">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Simulated Sale Amount (₹)</p>
                       <div className="relative group">
                          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                          <input 
                             type="text" 
                             value={saleAmount}
                             onChange={(e) => setSaleAmount(e.target.value)}
                             className="w-full bg-slate-50 border-2 border-transparent focus:border-[#6029F1] focus:bg-white rounded-2xl pl-10 pr-6 py-5 text-lg font-bold text-slate-900 outline-none transition-all shadow-inner"
                          />
                       </div>
                    </div>
                    <div className="space-y-3">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Simulation Context</p>
                       <select className="w-full bg-slate-50 border-2 border-transparent focus:border-[#6029F1] focus:bg-white rounded-2xl px-6 py-5 text-lg font-bold text-slate-900 outline-none transition-all cursor-pointer">
                          <option>Direct Agent Sale (New)</option>
                          <option>Team Leader Referral</option>
                       </select>
                    </div>
                 </div>

                 <div className="bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] bg-white/[0.02]">
                             <th className="px-10 py-6">Commission Tier</th>
                             <th className="px-6 py-6">Waterfall Logic</th>
                             <th className="px-10 py-6 text-right">Projected Payout</th>
                          </tr>
                       </thead>
                       <tbody className="text-sm">
                          <SimRow level="HCC" formula="Direct Sale * 40%" amount={hccPayout} color="text-blue-400" />
                          <SimRow level="HCM" formula="HCC Override * 40%" amount={hcmPayout} color="text-indigo-400" />
                          <SimRow level="HBA" formula="HCM Override * 40%" amount={hbaPayout} color="text-amber-400" />
                          <SimRow level="SH" formula="Profit Share * 2%" amount={shPayout} color="text-emerald-400" last />
                       </tbody>
                    </table>
                    <div className="bg-white/[0.05] px-10 py-8 flex justify-between items-center border-t border-white/5">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black text-white/30 uppercase tracking-widest">Total System Outflow</span>
                          <span className="text-xs text-white/20">Calculated on Net Sale Value</span>
                       </div>
                       <span className="text-3xl font-bold text-blue-400 tracking-tighter">₹{totalOutflow.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Right: Validation Hub */}
           <div className="lg:col-span-4 space-y-8">
              <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-slate-100 h-full">
                 <div className="flex items-center gap-4 mb-10">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Health Check</h3>
                 </div>
                 
                 <div className="space-y-6">
                    <ValidationItem 
                       status="success" 
                       title="Logical Integrity" 
                       desc="Cascading percentages match system threshold of 100% total outflow." 
                    />
                    <ValidationItem 
                       status="warning" 
                       title="Tax Compliance" 
                       desc="TDS calculations for HBA level need manual override for regional states." 
                    />
                    <ValidationItem 
                       status="info" 
                       title="Audit History" 
                       desc="Last structural update was performed by Admin at 14:22 PM." 
                    />
                 </div>

                 <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 text-center">Version Control</p>
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-xs font-bold text-slate-600">Current Branch</span>
                       <span className="bg-blue-100 text-blue-700 text-[9px] font-black px-2 py-0.5 rounded uppercase">Master</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-xs font-bold text-slate-600">Environment</span>
                       <span className="bg-emerald-100 text-emerald-700 text-[9px] font-black px-2 py-0.5 rounded uppercase">Staging</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function KPICard({ label, value, sub, trend, color }: any) {
  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-lg border border-slate-100 group hover:shadow-2xl transition-all duration-500">
       <div className="flex justify-between items-start mb-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-tight">{label}</p>
          <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: color }} />
       </div>
       <div className="flex items-baseline gap-2 mb-1">
          <span className="text-4xl font-bold text-slate-900 tracking-tight">{value}</span>
          <span className="text-[10px] font-bold text-slate-400">{sub}</span>
       </div>
       <p className="text-[10px] font-black uppercase tracking-widest" style={{ color }}>{trend}</p>
    </div>
  );
}

function SimRow({ level, formula, amount, color, last }: any) {
  return (
    <tr className={`border-white/5 hover:bg-white/[0.04] transition-colors group ${last ? '' : 'border-b'}`}>
       <td className="px-10 py-6">
          <div className="flex items-center gap-3">
             <div className={`w-1.5 h-1.5 rounded-full ${color} bg-current`} />
             <span className="font-bold text-white uppercase tracking-wider">{level}</span>
          </div>
       </td>
       <td className="px-6 py-6 text-white/30 font-medium italic">{formula}</td>
       <td className={`px-10 py-6 text-right font-bold text-lg tracking-tight ${color}`}>
          ₹{amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
       </td>
    </tr>
  );
}

function ValidationItem({ status, title, desc }: any) {
  const colors: any = {
    success: 'text-emerald-500 bg-emerald-500',
    warning: 'text-amber-500 bg-amber-500',
    info: 'text-blue-500 bg-blue-500'
  };

  return (
    <div className="flex gap-5 group">
       <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${colors[status]} bg-current shadow-[0_0_10px_current]`} />
       <div>
          <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#6029F1] transition-colors mb-1">{title}</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">{desc}</p>
       </div>
    </div>
  );
}
