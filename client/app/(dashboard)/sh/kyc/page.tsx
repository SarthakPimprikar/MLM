'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function ShKycPage() {
  const [formData, setFormData] = useState({
    pan: 'ABCDE1234F',
    aadhaar: '1234 5678 9012',
    bankName: 'State Bank of India',
    accountNumber: '30124567890',
    ifsc: 'SBIN0001234'
  });

  return (
    <DashboardLayout pageTitle="KYC Submission Desk">
      <div className="space-y-2 mb-8">
        <h2 className="text-2xl font-bold text-[#1E293B] tracking-tight">KYC Submission Desk</h2>
        <p className="text-sm text-[#64748B] font-medium opacity-70">Review and process user identity verification documents.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-20">
        
        {/* Left Column - Main Forms */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Identity Details */}
          <div className="bg-[#131241] rounded-[24px] p-8 shadow-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-[#60A5FA]/10 flex items-center justify-center text-[#60A5FA]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Identity Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">PAN Number</label>
                <input 
                  type="text" 
                  value={formData.pan}
                  readOnly
                  className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-inner focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">Aadhaar Number</label>
                <input 
                  type="text" 
                  value={formData.aadhaar}
                  readOnly
                  className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-inner focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Banking Information */}
          <div className="bg-[#131241] rounded-[24px] p-8 shadow-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-[#60A5FA]/10 flex items-center justify-center text-[#60A5FA]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"></path><rect x="4" y="8" width="16" height="9"></rect><path d="M6 20V8"></path><path d="M10 20V8"></path><path d="M14 20V8"></path><path d="M18 20V8"></path><path d="M12 3L2 8h20L12 3z"></path></svg>
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Banking Information</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">Bank Name</label>
                <input 
                  type="text" 
                  value={formData.bankName}
                  readOnly
                  className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-inner focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">Account Number</label>
                  <input 
                    type="text" 
                    value={formData.accountNumber}
                    readOnly
                    className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-inner focus:outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">IFSC Code</label>
                  <input 
                    type="text" 
                    value={formData.ifsc}
                    readOnly
                    className="w-full bg-white/2 border border-white/5 rounded-xl px-4 py-3 text-sm font-bold text-white shadow-inner focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Document Attachments */}
          <div className="bg-[#131241] rounded-[24px] p-8 shadow-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-[#60A5FA]/10 flex items-center justify-center text-[#60A5FA]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Document Attachments</h3>
            </div>

            <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center space-y-4 hover:border-[#60A5FA]/30 hover:bg-white/1 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto text-[#B5B8BD]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              </div>
              <div>
                <p className="text-xs font-bold text-white">Click to upload or drag and drop</p>
                <p className="text-[10px] text-[#64748B] mt-1 font-medium">Supported formats: JPG, PNG, PDF (Max 5MB per file)</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-8">
              {[
                { name: 'pan_card_front.jpg', size: '1.2 MB' },
                { name: 'aadhaar_back.pdf', size: '2.4 MB' }
              ].map((file, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10 group">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                  <span className="text-[10px] font-bold text-white">{file.name}</span>
                  <button className="text-slate-500 hover:text-red-400 ml-2 transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Verification Progress */}
          <div className="bg-[#131241] rounded-[24px] p-8 shadow-2xl border border-white/5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-8">Verification Progress</h3>
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest">Current Status</span>
              <span className="text-[8px] font-bold px-2 py-0.5 bg-amber-400/10 text-amber-400 rounded-sm uppercase">Pending Review</span>
            </div>
            
            <div className="h-1.5 w-full bg-white/5 rounded-full mb-8">
              <div className="h-full bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.3)]" style={{ width: '66%' }} />
            </div>

            <div className="space-y-6">
              {[
                { label: 'Data Entry', status: 'Completed', color: 'emerald', done: true },
                { label: 'Document Upload', status: 'In Progress', color: 'blue', current: true },
                { label: 'Admin Approval', status: 'Awaiting Submission', color: 'slate' },
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                   <div className="flex flex-col items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                        step.done ? 'bg-emerald-500 border-emerald-500 text-white' : 
                        step.current ? 'bg-indigo-600 border-indigo-600 text-white shadow-[0_0_10px_rgba(79,70,229,0.4)]' : 
                        'border-white/10 text-white/20'
                      }`}>
                        {step.done ? (
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        ) : (
                          <div className={`w-1.5 h-1.5 rounded-full ${step.current ? 'bg-white' : 'bg-white/10'}`} />
                        )}
                      </div>
                      {i < 2 && <div className="w-[2px] h-8 bg-white/5 my-1" />}
                   </div>
                   <div>
                      <p className={`text-[11px] font-bold ${step.current ? 'text-white' : 'text-slate-400'}`}>{step.label}</p>
                      <p className="text-[9px] text-[#64748B] font-bold mt-0.5 uppercase tracking-tighter">{step.status}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submission History */}
          <div className="bg-[#131241] rounded-[24px] p-8 shadow-2xl border border-white/5 flex-1 min-h-[400px]">
             <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-8">Submission History</h3>
             
             <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                   <span className="text-[10px] font-bold text-[#B5B8BD] uppercase">Status</span>
                </div>
                <div className="space-y-3">
                   <div className="flex items-center justify-center py-2 bg-red-500/10 rounded-lg">
                      <span className="text-[8px] font-black text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        Rejected
                      </span>
                   </div>
                   <div className="flex items-center justify-center py-2 bg-emerald-500/10 rounded-lg">
                      <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Verified
                      </span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer Actions */}
      <div className="fixed bottom-0 left-[260px] right-0 h-20 bg-white/80 backdrop-blur-xl border-t border-slate-200 flex items-center justify-end px-10 gap-4 z-40">
         <button className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all">Discard Draft</button>
         <button className="px-8 py-2.5 rounded-xl text-xs font-bold text-white bg-[#60A5FA] shadow-lg shadow-blue-200 hover:bg-blue-600 transition-all">Submit for Review</button>
      </div>
    </DashboardLayout>
  );
}
