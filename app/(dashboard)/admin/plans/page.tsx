'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { plansAPI } from '@/lib/api';

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const res = await plansAPI.getAll();
        if (res.data.success) {
           setPlans(res.data.data || []);
        } else {
           // Fallback to mock for design match
           setPlans([
              { _id: '1', name: 'Super Suraksha', price: 199900, description: 'Basic health insurance coverage with primary benefits.', isActive: true },
              { _id: '2', name: 'Premium Shield', price: 499900, description: 'Comprehensive coverage including maternity and dental.', isActive: true },
              { _id: '3', name: 'Family Guard', price: 999900, description: 'Total protection for the entire family of 4 members.', isActive: false },
           ]);
        }
      } catch {
         setPlans([
            { _id: '1', name: 'Super Suraksha', price: 199900, description: 'Basic health insurance coverage with primary benefits.', isActive: true },
            { _id: '2', name: 'Premium Shield', price: 499900, description: 'Comprehensive coverage including maternity and dental.', isActive: true },
            { _id: '3', name: 'Family Guard', price: 999900, description: 'Total protection for the entire family of 4 members.', isActive: false },
         ]);
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);

  return (
    <DashboardLayout pageTitle="Plans & Products">
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div className="flex justify-between items-center">
           <div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">CUREBHARAT / ADMIN / PLANS & PRODUCTS</p>
              <h1 className="text-3xl font-bold text-[#000000] font-display">Plans & Products</h1>
           </div>
           <button className="bg-[#6029F1] px-6 py-3 rounded-xl text-[10px] font-black text-white uppercase tracking-widest shadow-lg shadow-[#6029F1]/20 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Create New Plan
           </button>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           <PlanStat label="ACTIVE PLANS" value={String(plans.filter(p => p.isActive).length)} sub="Live on marketplace" icon="plan" color="text-[#60A5FA]" />
           <PlanStat label="AVG TICKET" value="₹4,200" sub="Per policy sale" icon="ticket" color="text-[#fbbf24]" />
           <PlanStat label="TOTAL E-PINS" value="1,242" sub="Across all plans" icon="key" color="text-[#34d399]" />
           <PlanStat label="SALES VELOCITY" value="14/day" sub="+8% vs last week" icon="bolt" color="text-[#6029F1]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           {/* Left Column: Plans Grid */}
           <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {plans.map((plan) => (
                 <div key={plan._id} className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03] group hover:border-[#6029F1]/30 transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl -mr-16 -mt-16 group-hover:bg-[#6029F1]/10 transition-colors" />
                    
                    <div className="relative z-10">
                       <div className="flex justify-between items-start mb-6">
                          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6029F1" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                          </div>
                          <span className={`px-3 py-1 rounded-lg text-[8px] font-black tracking-widest border ${
                             plan.isActive ? 'bg-[#34d399]/10 text-[#34d399] border-[#34d399]/30' : 'bg-white/5 text-white/20 border-white/10'
                          }`}>
                             {plan.isActive ? 'ACTIVE' : 'INACTIVE'}
                          </span>
                       </div>

                       <h3 className="text-xl font-bold font-display mb-1">{plan.name}</h3>
                       <p className="text-xs text-white/40 font-medium mb-6 leading-relaxed h-10 line-clamp-2">{plan.description}</p>

                       <div className="mb-8">
                          <p className="text-3xl font-bold font-display text-white">₹{(plan.price / 100).toLocaleString('en-IN')}</p>
                          <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mt-1">One-time Premium</p>
                       </div>

                       <div className="flex gap-3">
                          <button className="flex-1 bg-white/5 hover:bg-white/10 rounded-xl py-3 text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all">Edit</button>
                          <button className="flex-1 bg-[#6029F1] hover:brightness-110 rounded-xl py-3 text-[10px] font-black uppercase tracking-widest transition-all">Manage Pins</button>
                       </div>
                    </div>
                 </div>
              ))}
           </div>

           {/* Right Column: Analytics */}
           <div className="lg:col-span-4 space-y-6">
              {/* Revenue by Plan */}
              <div className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
                 <h3 className="text-sm font-bold font-display uppercase tracking-widest mb-10">Revenue by Plan</h3>
                 <div className="flex flex-col items-center">
                    <div className="w-40 h-40 relative">
                       <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="42" fill="none" stroke="#6029F1" strokeWidth="16" strokeDasharray="264" strokeDashoffset="0" />
                          <circle cx="50" cy="50" r="42" fill="none" stroke="#60A5FA" strokeWidth="16" strokeDasharray="264" strokeDashoffset="80" />
                          <circle cx="50" cy="50" r="42" fill="none" stroke="#fbbf24" strokeWidth="16" strokeDasharray="264" strokeDashoffset="180" />
                       </svg>
                       <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xl font-bold font-display tracking-tight text-white/20">₹1.8M</span>
                       </div>
                    </div>
                    <div className="mt-10 space-y-4 w-full">
                       <StatRow label="Super Suraksha" value="₹1.2M" color="bg-[#6029F1]" />
                       <StatRow label="Premium Shield" value="₹0.4M" color="bg-[#60A5FA]" />
                       <StatRow label="Family Guard" value="₹0.2M" color="bg-[#fbbf24]" />
                    </div>
                 </div>
              </div>

              {/* Best Seller Insight */}
              <div className="bg-gradient-to-br from-[#6029F1] to-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/10">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    </div>
                    <h3 className="text-sm font-bold font-display uppercase tracking-widest">Growth Insight</h3>
                 </div>
                 <p className="text-xs text-white/60 leading-relaxed">
                    <span className="text-white font-bold">Super Suraksha</span> is outperforming all other plans with a <span className="text-[#34d399] font-bold">42% higher conversion rate</span> this quarter.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function PlanStat({ label, value, sub, icon, color }: any) {
  return (
    <div className="bg-[#131241] rounded-[1.5rem] p-6 text-white shadow-xl border border-white/[0.03] relative group">
       <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">{label}</p>
       <p className="text-3xl font-bold font-display mb-2">{value}</p>
       <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{sub}</p>
       <div className={`absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center opacity-40 ${color}`}>
          {icon === 'plan' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 12l10 5 10-5M2 17l10 5 10-5"></path></svg>}
          {icon === 'ticket' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line><line x1="7" y1="15" x2="7.01" y2="15"></line><line x1="12" y1="15" x2="12.01" y2="15"></line><line x1="17" y1="15" x2="17.01" y2="15"></line></svg>}
          {icon === 'key' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3-3.5 3.5z"></path></svg>}
          {icon === 'bolt' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>}
       </div>
    </div>
  );
}

function StatRow({ label, value, color }: any) {
  return (
    <div className="flex justify-between items-center">
       <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${color}`} />
          <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{label}</span>
       </div>
       <span className="text-xs font-bold text-white">{value}</span>
    </div>
  );
}
