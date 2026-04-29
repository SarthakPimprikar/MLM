'use client';

import { IUser } from '@/types';

interface KYCStatusCardProps {
  user: IUser;
  color: string;
}

const KYC_STATUS_STYLES: Record<string, { bg: string; text: string; border: string; label: string }> = {
  approved:      { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', label: 'Verified' },
  pending:       { bg: 'bg-amber-500/10',   text: 'text-amber-400',   border: 'border-amber-500/20',   label: 'Pending Review' },
  rejected:      { bg: 'bg-red-500/10',     text: 'text-red-400',     border: 'border-red-500/20',     label: 'Rejected' },
  not_submitted: { bg: 'bg-slate-500/10',   text: 'text-slate-400',   border: 'border-slate-500/20',   label: 'Not Submitted' },
};

export default function KYCStatusCard({ user, color }: KYCStatusCardProps) {
  const status = KYC_STATUS_STYLES[user.kycStatus] || KYC_STATUS_STYLES.not_submitted;
  const docs = user.kycDocuments;

  return (
    <div className="bg-[#0c1033] border border-indigo-500/[0.1] rounded-2xl overflow-hidden"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.25)' }}
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-indigo-500/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-500/10 border border-indigo-500/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </div>
          <div>
            <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">KYC Verification</h3>
            <p className="text-[10px] text-[#7c82a6] mt-0.5">Know Your Customer documents</p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${status.bg} ${status.text} ${status.border}`}>
          {user.kycStatus === 'approved' && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          )}
          {status.label}
        </span>
      </div>

      {/* Documents */}
      {docs ? (
        <div className="p-6 space-y-4">
          {/* Aadhaar */}
          <div className="bg-[#0a0e2d] border border-indigo-500/[0.08] rounded-xl p-4 flex items-center justify-between hover:border-indigo-500/[0.15] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="7" y1="9" x2="17" y2="9"/><line x1="7" y1="13" x2="12" y2="13"/></svg>
              </div>
              <div>
                <div className="text-xs font-bold text-white">Aadhaar Card</div>
                <div className="text-[10px] text-[#7c82a6] font-mono mt-0.5">{docs.aadhaarNumber || '—'}</div>
              </div>
            </div>
            <span className="text-emerald-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </span>
          </div>

          {/* PAN */}
          <div className="bg-[#0a0e2d] border border-indigo-500/[0.08] rounded-xl p-4 flex items-center justify-between hover:border-indigo-500/[0.15] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="7" y1="9" x2="17" y2="9"/><line x1="7" y1="13" x2="12" y2="13"/></svg>
              </div>
              <div>
                <div className="text-xs font-bold text-white">PAN Card</div>
                <div className="text-[10px] text-[#7c82a6] font-mono mt-0.5">{docs.panNumber || '—'}</div>
              </div>
            </div>
            <span className="text-emerald-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </span>
          </div>

          {/* Bank Details */}
          <div className="bg-[#0a0e2d] border border-indigo-500/[0.08] rounded-xl p-4 hover:border-indigo-500/[0.15] transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
                </div>
                <div className="text-xs font-bold text-white">Bank Account</div>
              </div>
              <span className="text-emerald-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 ml-[52px]">
              <div>
                <div className="text-[9px] text-[#7c82a6] font-bold uppercase tracking-widest">Bank</div>
                <div className="text-[11px] text-white font-medium mt-0.5">{docs.bankName || '—'}</div>
              </div>
              <div>
                <div className="text-[9px] text-[#7c82a6] font-bold uppercase tracking-widest">Account</div>
                <div className="text-[11px] text-white font-mono mt-0.5">{docs.accountNumber || '—'}</div>
              </div>
              <div>
                <div className="text-[9px] text-[#7c82a6] font-bold uppercase tracking-widest">IFSC</div>
                <div className="text-[11px] text-white font-mono mt-0.5">{docs.ifscCode || '—'}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="border border-dashed border-indigo-500/10 rounded-2xl p-10 text-center">
            <div className="text-4xl mb-4 opacity-20">📋</div>
            <p className="text-xs text-[#7c82a6] font-bold uppercase tracking-widest">No KYC documents submitted yet</p>
          </div>
        </div>
      )}
    </div>
  );
}
