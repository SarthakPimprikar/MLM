'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function SalesEntryPage() {
  const [formData, setFormData] = useState({
    product: '',
    sponsorId: 'CB-99234',
    customerName: '',
    amount: '',
    paymentMode: 'UPI / Wallet',
    referenceId: '',
    remarks: ''
  });

  return (
    <DashboardLayout pageTitle="Sales Entry">
      <div className="space-y-2 mb-8">
        <h2 className="text-2xl font-bold text-[#1E293B] tracking-tight">Sales Entry</h2>
        <p className="text-sm text-[#64748B] font-medium opacity-70">Record a new product or service sale and preview commission generation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">
        
        {/* Main Entry Form */}
        <div className="lg:col-span-8">
          <div className="bg-[#131241] rounded-[24px] p-10 shadow-2xl border border-white/5 space-y-8 min-h-[600px]">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">Product / Plan Selection</label>
                  <select className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3.5 text-sm font-bold text-[#64748B] outline-none appearance-none cursor-pointer focus:border-[#60A5FA]/30 transition-all">
                     <option>Select a product...</option>
                     <option>Premium Health Plan</option>
                     <option>Basic Wellness Pack</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">Sponsor / Distributor ID</label>
                  <div className="relative">
                     <input 
                       type="text" 
                       value={formData.sponsorId}
                       className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3.5 text-sm font-bold text-white outline-none focus:border-[#60A5FA]/30 transition-all"
                       placeholder="e.g. CB-99234"
                     />
                     <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/5 text-[10px] font-bold text-[#B5B8BD] px-4 py-1.5 rounded-lg border border-white/5 hover:bg-white/10 transition-all">Verify</button>
                  </div>
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">Customer Name</label>
               <input 
                 type="text" 
                 className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3.5 text-sm font-bold text-white placeholder:text-slate-700 outline-none focus:border-[#60A5FA]/30 transition-all"
                 placeholder="Full name of the purchaser"
               />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">Base Amount (₹)</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3.5 text-sm font-bold text-white placeholder:text-slate-700 outline-none focus:border-[#60A5FA]/30 transition-all"
                    placeholder="0.00"
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">Payment Mode</label>
                  <select className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3.5 text-sm font-bold text-white outline-none appearance-none cursor-pointer focus:border-[#60A5FA]/30 transition-all">
                     <option>UPI / Wallet</option>
                     <option>Bank Transfer</option>
                     <option>Cash</option>
                  </select>
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">Transaction Reference ID</label>
               <input 
                 type="text" 
                 className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3.5 text-sm font-bold text-white placeholder:text-slate-700 outline-none focus:border-[#60A5FA]/30 transition-all"
                 placeholder="UTR or Transaction Number"
               />
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">Remarks / Notes</label>
               <textarea 
                 rows={5}
                 className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3.5 text-sm font-bold text-white placeholder:text-slate-700 outline-none focus:border-[#60A5FA]/30 transition-all resize-none"
                 placeholder="Optional internal notes..."
               />
            </div>

          </div>
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-4 space-y-6">
           
           {/* Commission Preview */}
           <div className="bg-[#131241] rounded-[24px] p-8 shadow-2xl border border-white/5">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
                    Commission Preview
                 </h3>
                 <span className="text-[8px] font-black bg-indigo-600/20 text-[#60A5FA] px-2 py-0.5 rounded uppercase tracking-widest">Live</span>
              </div>

              <div className="space-y-5">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest">Business Volume (BV)</span>
                    <span className="text-[11px] font-bold text-white">4,500</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest">Direct Sponsor Bonus</span>
                    <span className="text-[11px] font-bold text-[#60A5FA]">+ ₹450.00</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest">Matching Bonus Est.</span>
                    <span className="text-[11px] font-bold text-[#60A5FA]">+ ₹200.00</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest">TDS Deduction (5%)</span>
                    <span className="text-[11px] font-bold text-red-400">- ₹32.50</span>
                 </div>
                 <div className="pt-5 border-t border-white/5 flex items-center justify-between">
                    <span className="text-sm font-bold text-white">Net Payout Est.</span>
                    <span className="text-xl font-bold text-white">₹617.50</span>
                 </div>
              </div>
           </div>

           {/* Quality Checks */}
           <div className="bg-[#131241] rounded-[24px] p-8 shadow-2xl border border-white/5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-8 flex items-center gap-2">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 8 12 12 16 14"></polyline></svg>
                 Quality Checks
              </h3>
              
              <div className="space-y-6">
                 {[
                   { label: 'Sponsor ID Verified', sub: 'ACTIVE STATUS CONFIRMED', done: true },
                   { label: 'GST Exclusion Check', sub: 'BASE AMOUNT SPLIT CORRECTLY', done: true },
                   { label: 'Duplicate Invoice Scan', sub: 'AWAITING TRANSACTION ID', done: false },
                   { label: 'Payment Proof Attached', sub: 'REQUIRED FOR MANUAL ENTRY', done: false },
                 ].map((check, i) => (
                   <div key={i} className="flex gap-4">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                        check.done ? 'bg-[#60A5FA] border-[#60A5FA] text-white' : 'border-white/10 text-white/20'
                      }`}>
                        {check.done ? (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        ) : (
                          <div className="w-1 h-1 rounded-full bg-white/20" />
                        )}
                      </div>
                      <div>
                         <p className={`text-[11px] font-bold ${check.done ? 'text-white' : 'text-slate-500'}`}>{check.label}</p>
                         <p className="text-[8px] text-[#64748B] font-bold mt-0.5 uppercase tracking-tighter">{check.sub}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
