'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { adminAPI } from '@/lib/api'; 
import { IUser } from '@/types';
import { useToast } from '@/components/ui/Toast';

export default function AdminKYC() {
  const [pendingUsers, setPendingUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { addToast } = useToast();

  useEffect(() => {
    fetchPending();
  }, []);

  async function fetchPending() {
    setLoading(true);
    try {
      const res = await adminAPI.getPendingKYC();
      if (res.data.success) {
        setPendingUsers(res.data.data || []);
      }
    } catch (err) {
      addToast({ message: 'Failed to fetch pending KYC', type: 'error' });
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateStatus(id: string, status: 'approved' | 'rejected') {
    setProcessingId(id);
    try {
      const res = await adminAPI.updateKYCStatus(id, status);
      if (res.data.success) {
        addToast({ message: `KYC ${status} successfully`, type: 'success' });
        setPendingUsers(prev => prev.filter(u => u._id !== id));
        if (selectedUser?._id === id) setSelectedUser(null);
      }
    } catch (err: any) {
      addToast({ message: err.response?.data?.message || 'Update failed', type: 'error' });
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <DashboardLayout pageTitle="KYC Management">
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div className="flex justify-between items-center">
           <div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">CUREBHARAT / ADMIN / KYC MANAGEMENT</p>
              <h1 className="text-3xl font-bold text-[#000000] font-display">KYC Management</h1>
           </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           <KYCStat label="TOTAL PENDING" value={String(pendingUsers.length)} sub="Verification required" icon="clock" color="text-[#fbbf24]" />
           <KYCStat label="APPROVED TODAY" value="142" sub="+12.4% vs yesterday" icon="check" color="text-[#34d399]" />
           <KYCStat label="REJECTION RATE" value="4.2%" sub="Documents invalid" icon="x" color="text-[#f87171]" />
           <KYCStat label="VERIF. SPEED" value="12m" sub="Avg processing time" icon="bolt" color="text-[#60A5FA]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           {/* Left Column: Table */}
           <div className="lg:col-span-8 bg-[#131241] rounded-[2rem] shadow-xl border border-white/[0.03] overflow-hidden">
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                 <h3 className="text-xl font-bold font-display text-white">Pending Verification</h3>
                 <div className="flex bg-black/40 p-1 rounded-xl">
                    <button className="px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest bg-white/10 text-white">ALL PENDING</button>
                    <button className="px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white">URGENT</button>
                 </div>
              </div>
              
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] border-b border-white/5 bg-white/[0.01]">
                          <th className="px-8 py-5">MEMBER</th>
                          <th className="px-4 py-5">JOINED</th>
                          <th className="px-4 py-5 text-center">DOCUMENTS</th>
                          <th className="px-8 py-5 text-right">ACTIONS</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                       {loading ? (
                          Array(3).fill(0).map((_, i) => (
                             <tr key={i} className="animate-pulse">
                                <td colSpan={4} className="px-8 py-8"><div className="h-4 bg-white/5 rounded w-full" /></td>
                             </tr>
                          ))
                       ) : pendingUsers.length === 0 ? (
                          <tr><td colSpan={4} className="px-8 py-20 text-center text-sm text-white/20 font-bold uppercase tracking-widest">No pending KYC requests ✨</td></tr>
                       ) : (
                          pendingUsers.map((u) => (
                             <tr key={u._id} className="hover:bg-white/[0.02] transition-colors group">
                                <td className="px-8 py-6">
                                   <div className="flex items-center gap-3">
                                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-white/40">{u.name[0]}</div>
                                      <div>
                                         <div className="text-sm font-bold text-white">{u.name}</div>
                                         <div className="text-[9px] font-black text-white/20 uppercase tracking-tighter">{u.memberId}</div>
                                      </div>
                                   </div>
                                </td>
                                <td className="px-4 py-6 text-xs font-bold text-white/40 uppercase">{new Date(u.createdAt).toLocaleDateString()}</td>
                                <td className="px-4 py-6 text-center">
                                   <button 
                                      onClick={() => setSelectedUser(u)}
                                      className="text-[10px] font-black text-[#60A5FA] uppercase tracking-widest hover:underline"
                                   >
                                      View Bundle
                                   </button>
                                </td>
                                <td className="px-8 py-6 text-right">
                                   <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button 
                                         disabled={processingId === u._id}
                                         onClick={() => handleUpdateStatus(u._id, 'approved')}
                                         className="px-4 py-2 rounded-lg bg-[#34d399]/10 text-[#34d399] text-[9px] font-black uppercase tracking-widest border border-[#34d399]/20 hover:bg-[#34d399]/20"
                                      >
                                         Approve
                                      </button>
                                      <button 
                                         disabled={processingId === u._id}
                                         onClick={() => handleUpdateStatus(u._id, 'rejected')}
                                         className="px-4 py-2 rounded-lg bg-[#f87171]/10 text-[#f87171] text-[9px] font-black uppercase tracking-widest border border-[#f87171]/20 hover:bg-[#f87171]/20"
                                      >
                                         Reject
                                      </button>
                                   </div>
                                </td>
                             </tr>
                          ))
                       )}
                    </tbody>
                 </table>
              </div>
           </div>

           {/* Right Column: Analytics */}
           <div className="lg:col-span-4 space-y-6">
              {/* Verification Donut */}
              <div className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
                 <h3 className="text-sm font-bold font-display uppercase tracking-widest mb-10">Verification Stats</h3>
                 <div className="flex flex-col items-center">
                    <div className="w-44 h-44 relative flex items-center justify-center">
                       <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="42" fill="none" stroke="white" strokeWidth="10" opacity="0.05" />
                          <circle cx="50" cy="50" r="42" fill="none" stroke="#6029F1" strokeWidth="10" strokeDasharray="264" strokeDashoffset="44" strokeLinecap="round" />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-bold font-display">82%</span>
                          <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">VERIFIED</span>
                       </div>
                    </div>
                    <div className="mt-10 space-y-4 w-full">
                       <StatRow label="Approved" value="12,402" color="bg-[#34d399]" />
                       <StatRow label="Pending" value={String(pendingUsers.length)} color="bg-[#fbbf24]" />
                       <StatRow label="Rejected" value="842" color="bg-[#f87171]" />
                    </div>
                 </div>
              </div>

              {/* Security Alert */}
              <div className="bg-gradient-to-br from-[#6029F1] to-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/10">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    </div>
                    <h3 className="text-sm font-bold font-display uppercase tracking-widest">Identity Audit</h3>
                 </div>
                 <p className="text-xs text-white/60 leading-relaxed mb-6">Automated scans have flagged <span className="text-white font-bold">12 suspicious IDs</span> for manual review. Check for duplicate PAN/Aadhaar entries.</p>
                 <button className="w-full bg-white/10 hover:bg-white/20 rounded-xl py-3 text-[10px] font-black uppercase tracking-widest border border-white/20 transition-all">RUN AUDIT NOW</button>
              </div>
           </div>
        </div>

        {/* Modal for detailed view */}
        {selectedUser && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-6">
             <div className="absolute inset-0 bg-[#0d0f14]/90 backdrop-blur-xl" onClick={() => setSelectedUser(null)} />
             <div className="relative w-full max-w-xl bg-[#131241] border border-white/10 rounded-[32px] p-10 shadow-2xl animate-in zoom-in-95 duration-300 text-white">
                <div className="flex justify-between items-start mb-8">
                   <div>
                      <h3 className="font-display text-2xl font-bold tracking-tight">{selectedUser.name}</h3>
                      <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.2em] mt-1">Identity Bundle · {selectedUser.memberId}</p>
                   </div>
                   <button onClick={() => setSelectedUser(null)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors">✕</button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-10">
                   <DocItem label="AADHAAR NUMBER" val={selectedUser.kycDocuments?.aadhaarNumber || 'Not provided'} />
                   <DocItem label="PAN NUMBER" val={selectedUser.kycDocuments?.panNumber || 'Not provided'} />
                   <DocItem label="BANK NAME" val={selectedUser.kycDocuments?.bankName || 'Not provided'} />
                   <DocItem label="ACCOUNT NUMBER" val={selectedUser.kycDocuments?.accountNumber || 'Not provided'} />
                   <div className="col-span-2">
                      <DocItem label="IFSC CODE" val={selectedUser.kycDocuments?.ifscCode || 'Not provided'} />
                   </div>
                </div>

                <div className="flex gap-4">
                   <button 
                     disabled={processingId === selectedUser._id}
                     onClick={() => handleUpdateStatus(selectedUser._id, 'approved')}
                     className="flex-1 py-5 rounded-2xl bg-[#34d399] text-[#0d0f14] font-black text-[11px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#34d399]/20"
                   >
                     Approve Application
                   </button>
                   <button 
                     disabled={processingId === selectedUser._id}
                     onClick={() => handleUpdateStatus(selectedUser._id, 'rejected')}
                     className="flex-1 py-5 rounded-2xl bg-[#f87171] text-white font-black text-[11px] uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#f87171]/20"
                   >
                     Reject Application
                   </button>
                </div>
             </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function KYCStat({ label, value, sub, icon, color }: any) {
  return (
    <div className="bg-[#131241] rounded-[1.5rem] p-6 text-white shadow-xl border border-white/[0.03] relative group">
       <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">{label}</p>
       <p className="text-3xl font-bold font-display mb-2">{value}</p>
       <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{sub}</p>
       <div className={`absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center opacity-40 ${color}`}>
          {icon === 'clock' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>}
          {icon === 'check' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>}
          {icon === 'x' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>}
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

function DocItem({ label, val }: { label: string; val: string }) {
  return (
    <div className="space-y-1.5 p-5 bg-white/[0.02] border border-white/[0.05] rounded-2xl group hover:bg-white/[0.04] transition-colors">
       <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">{label}</p>
       <p className="text-sm font-bold text-white tracking-tight truncate">{val}</p>
    </div>
  );
}
