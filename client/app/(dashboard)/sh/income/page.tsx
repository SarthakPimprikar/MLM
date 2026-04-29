'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell 
} from 'recharts';

export default function IncomeBreakdownPage() {
  const chartData = [
    { name: 'Jul', direct: 8000, override: 4000, leadership: 2000 },
    { name: 'Aug', direct: 9000, override: 5000, leadership: 2500 },
    { name: 'Sep', direct: 11000, override: 6000, leadership: 3000 },
    { name: 'Oct', direct: 12500, override: 7500, leadership: 4000 },
    { name: 'Nov', direct: 11500, override: 6500, leadership: 3500 },
    { name: 'Dec', direct: 13000, override: 8000, leadership: 4500 },
    { name: 'Jan', direct: 14000, override: 9000, leadership: 5000 },
  ];

  const mixData = [
    { name: 'Direct', value: 60, color: '#60A5FA', amount: '₹83.6K' },
    { name: 'Override', value: 23, color: '#FDBA74', amount: '₹31.9K' },
    { name: 'Leadership', value: 17, color: '#A78BFA', amount: '₹23.6K' },
  ];

  const partners = [
    { name: 'Priya Sharma', rank: 'Diamond Rank', id: 'CB-8842', amount: '₹18,450', percent: '13.2%', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' },
    { name: 'Rahul Verma', rank: 'Gold Rank', id: 'CB-9102', amount: '₹12,800', percent: '9.1%', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul' },
    { name: 'Amit Kumar', rank: 'Silver Rank', id: 'CB-1045', amount: '₹9,240', percent: '6.6%', avatar: 'AK', isInitials: true },
    { name: 'Sneha Desai', rank: 'Gold Rank', id: 'CB-7721', amount: '₹7,150', percent: '5.1%', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha' },
  ];

  return (
    <DashboardLayout pageTitle="Income Breakdown">
      <div className="space-y-6 pb-20">
        
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-[#1E293B] tracking-tight">Income Breakdown</h2>
          <p className="text-sm text-[#64748B] font-medium opacity-70">Analyse commission distributions, rank shares, and leadership overrides.</p>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { label: 'Total Earnings', value: '₹1,39,289', change: '+12.5%' },
             { label: 'Direct Share', value: '₹83,680', change: '+1.5%' },
             { label: 'Override Share', value: '₹31,924', change: '+12.5%' },
             { label: 'Leadership Share', value: '₹23,685', change: '+12.5%' },
           ].map((stat, i) => (
             <div key={i} className="bg-[#131241] rounded-[20px] p-6 shadow-2xl border border-white/5">
                <p className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest mb-1">{stat.label}</p>
                <h4 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h4>
                <p className="text-[10px] font-bold text-emerald-400 mt-2 flex items-center gap-1">
                   <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                   {stat.change} vs last month
                </p>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           
           {/* Growth Chart Area */}
           <div className="lg:col-span-8 bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider">Monthly Contribution & Growth</h3>
                 <button className="text-slate-500 hover:text-white transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button>
              </div>
              
              <div className="h-[350px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                       <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                       <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748B', fontSize: 10, fontWeight: 'bold' }} 
                        dy={10}
                       />
                       <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748B', fontSize: 10, fontWeight: 'bold' }} 
                        dx={-10}
                        tickFormatter={(val) => `₹${val/1000}K`}
                       />
                       <Tooltip 
                        contentStyle={{ backgroundColor: '#131241', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        itemStyle={{ fontSize: '10px', fontWeight: 'bold' }}
                       />
                       <Area type="monotone" dataKey="direct" stackId="1" stroke="#60A5FA" strokeWidth={3} fill="#60A5FA" fillOpacity={0.2} />
                       <Area type="monotone" dataKey="override" stackId="1" stroke="#FDBA74" strokeWidth={3} fill="#FDBA74" fillOpacity={0.2} />
                       <Area type="monotone" dataKey="leadership" stackId="1" stroke="#A78BFA" strokeWidth={3} fill="#A78BFA" fillOpacity={0.2} />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Income Mix Sidebar */}
           <div className="lg:col-span-4 bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-10">Income Mix</h3>
              
              <div className="h-[240px] relative mb-12">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                       <Pie
                          data={mixData}
                          innerRadius={80}
                          outerRadius={105}
                          paddingAngle={5}
                          dataKey="value"
                          stroke="none"
                       >
                          {mixData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                       </Pie>
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-white">₹1.39L</span>
                    <span className="text-[8px] font-black text-[#B5B8BD] uppercase tracking-widest mt-1">Total</span>
                 </div>
              </div>

              <div className="space-y-5">
                 {mixData.map((item, i) => (
                   <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                         <span className="text-xs font-bold text-[#B5B8BD]">{item.name} ({item.value}%)</span>
                      </div>
                      <span className="text-xs font-bold text-white">{item.amount}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           
           {/* Top Contributing Partners */}
           <div className="lg:col-span-8 bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider">Top Contributing Partners</h3>
                 <button className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-all">View All</button>
              </div>
              
              <div className="space-y-6">
                 {partners.map((partner, i) => (
                   <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-white/2 p-2 -m-2 rounded-xl transition-all">
                      <div className="flex items-center gap-4">
                         {partner.isInitials ? (
                           <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-sm font-black text-[#64748B]">{partner.avatar}</div>
                         ) : (
                           <img src={partner.avatar} alt={partner.name} className="w-12 h-12 rounded-xl bg-slate-800 object-cover" />
                         )}
                         <div>
                            <p className="text-sm font-bold text-white">{partner.name}</p>
                            <p className="text-[10px] text-[#64748B] font-bold mt-1 uppercase tracking-tighter">{partner.rank} • ID: {partner.id}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <p className="text-sm font-bold text-white">{partner.amount}</p>
                         <p className="text-[10px] font-bold text-indigo-400 mt-1 uppercase tracking-tighter">{partner.percent} of Total</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Calculation Logic */}
           <div className="lg:col-span-4 bg-[#131241] rounded-[20px] p-8 shadow-2xl border border-white/5 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-8">
                 <div className="w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                 </div>
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider">Calculation Logic</h3>
              </div>
              
              <p className="text-[11px] text-[#64748B] font-medium leading-relaxed mb-8">
                 Current breakdown rules apply to active Diamond members and upwards.
              </p>

              <div className="space-y-8 flex-1">
                 <div>
                    <div className="flex items-center gap-3 mb-2">
                       <div className="h-4 w-[2px] bg-[#60A5FA]" />
                       <h4 className="text-[11px] font-bold text-white uppercase tracking-widest">Direct Sales (40%)</h4>
                    </div>
                    <p className="text-[10px] text-[#B5B8BD] leading-relaxed pl-3.5">
                       Applied immediately on personal referral conversions. No capping limit per cycle.
                    </p>
                 </div>
                 
                 <div>
                    <div className="flex items-center gap-3 mb-2">
                       <div className="h-4 w-[2px] bg-[#FDBA74]" />
                       <h4 className="text-[11px] font-bold text-white uppercase tracking-widest">Level Override (40%)</h4>
                    </div>
                    <p className="text-[10px] text-[#B5B8BD] leading-relaxed pl-3.5">
                       Distributes 10% across levels 2-5. Requires minimum 2 active direct legs to qualify.
                    </p>
                 </div>

                 <div>
                    <div className="flex items-center gap-3 mb-2">
                       <div className="h-4 w-[2px] bg-[#A78BFA]" />
                       <h4 className="text-[11px] font-bold text-white uppercase tracking-widest">Leadership Pool (20%)</h4>
                    </div>
                    <p className="text-[10px] text-[#B5B8BD] leading-relaxed pl-3.5">
                       Global company turnover divided among Diamond+ ranks proportionally based on monthly volume.
                    </p>
                 </div>
              </div>

              <button className="w-full mt-10 py-3.5 bg-indigo-600/10 text-indigo-400 border border-indigo-600/20 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">
                 <div className="flex items-center justify-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    Config Rules
                 </div>
              </button>
           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
