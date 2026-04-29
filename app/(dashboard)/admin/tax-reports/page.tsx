'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function AdminTaxReportsPage() {
  const [filter, setFilter] = useState('All Reports');

  const mockReports = [
    { id: 'TX-8820', cycle: 'Apr 2024', type: 'TDS REPORT', amount: '₹ 4,52,290', status: 'FILED', date: '2024-05-05' },
    { id: 'TX-8821', cycle: 'Apr 2024', type: 'GST REPORT', amount: '₹ 8,12,000', status: 'FILED', date: '2024-05-07' },
    { id: 'TX-8822', cycle: 'May 2024', type: 'TDS REPORT', amount: '₹ 5,10,000', status: 'PENDING', date: '2024-06-05' },
    { id: 'TX-8823', cycle: 'May 2024', type: 'GST REPORT', amount: '₹ 9,45,000', status: 'PENDING', date: '2024-06-07' },
  ];

  return (
    <DashboardLayout pageTitle="Reports">
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div className="flex justify-between items-center">
           <div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">CUREBHARAT / ADMIN / TAX REPORTS</p>
              <h1 className="text-3xl font-bold text-[#000000] font-display">Tax & Compliance</h1>
           </div>
           <button className="bg-[#6029F1] px-6 py-3 rounded-xl text-[10px] font-black text-white uppercase tracking-widest shadow-lg shadow-[#6029F1]/20 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Generate Bulk Report
           </button>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           <ReportStat label="TDS COLLECTED" value="₹12.4M" sub="Current fiscal year" icon="tds" color="text-[#60A5FA]" />
           <ReportStat label="GST LIABILITY" value="₹24.8M" sub="Unfiled: ₹8.4M" icon="gst" color="text-[#fbbf24]" />
           <ReportStat label="FILED REPORTS" value="142" sub="Across all cycles" icon="check" color="text-[#34d399]" />
           <ReportStat label="PENDING FILINGS" value="4" sub="Immediate action" icon="alert" color="text-[#f87171]" />
        </div>

        {/* Filter Bar */}
        <div className="bg-[#131241] rounded-[2rem] p-4 text-white shadow-xl border border-white/[0.03] flex flex-col lg:flex-row gap-4 items-center">
           <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input
                type="text"
                placeholder="Search reports by ID, cycle, or type..."
                className="w-full bg-[#1c2030] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none"
              />
           </div>
           <div className="flex gap-3">
              <select className="bg-white border border-[#E1E2EC] rounded-xl px-6 py-3 text-[10px] font-black text-black uppercase tracking-widest outline-none min-w-[150px]">
                 <option>All Types</option>
              </select>
              <select className="bg-white border border-[#E1E2EC] rounded-xl px-6 py-3 text-[10px] font-black text-black uppercase tracking-widest outline-none min-w-[150px]">
                 <option>All Status</option>
              </select>
              <input type="date" className="bg-white border border-[#E1E2EC] rounded-xl px-6 py-3 text-[10px] font-black text-black uppercase outline-none" />
           </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           {mockReports.map((report) => (
              <div key={report.id} className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03] group hover:border-[#6029F1]/30 transition-all">
                 <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#6029F1]/10 transition-colors">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={report.type.includes('TDS') ? '#60A5FA' : '#fbbf24'} strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-[8px] font-black tracking-widest border ${
                       report.status === 'FILED' ? 'bg-[#34d399]/10 text-[#34d399] border-[#34d399]/30' : 'bg-[#f87171]/10 text-[#f87171] border-[#f87171]/30'
                    }`}>
                       {report.status}
                    </span>
                 </div>
                 
                 <h3 className="text-xl font-bold font-display mb-1">{report.cycle}</h3>
                 <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-6">{report.type}</p>
                 
                 <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Amount</span>
                       <span className="text-sm font-bold text-white">{report.amount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Due Date</span>
                       <span className="text-sm font-bold text-white/60">{report.date}</span>
                    </div>
                 </div>

                 <button className="w-full bg-white/5 hover:bg-white/10 rounded-xl py-4 text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all flex items-center justify-center gap-2 group-hover:bg-[#6029F1] group-hover:border-[#6029F1] group-hover:text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                    Download Report
                 </button>
              </div>
           ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

function ReportStat({ label, value, sub, icon, color }: any) {
  return (
    <div className="bg-[#131241] rounded-[1.5rem] p-6 text-white shadow-xl border border-white/[0.03] relative group">
       <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">{label}</p>
       <p className="text-3xl font-bold font-display mb-2">{value}</p>
       <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{sub}</p>
       <div className={`absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center opacity-40 ${color}`}>
          {icon === 'tds' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>}
          {icon === 'gst' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>}
          {icon === 'check' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>}
          {icon === 'alert' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>}
       </div>
    </div>
  );
}
