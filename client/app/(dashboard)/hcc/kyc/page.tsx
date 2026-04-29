'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/lib/auth';
import { usersAPI } from '@/lib/api';

export default function HCCKyc() {
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    aadhaarNumber: '',
    panNumber: '',
    bankName: '',
    accountNumber: '',
    ifscCode: ''
  });

  useEffect(() => {
    if (user?.kycDocuments) {
      setFormData({
        aadhaarNumber: user.kycDocuments.aadhaarNumber || '',
        panNumber: user.kycDocuments.panNumber || '',
        bankName: user.kycDocuments.bankName || '',
        accountNumber: user.kycDocuments.accountNumber || '',
        ifscCode: user.kycDocuments.ifscCode || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await usersAPI.updateKYC(user!._id, formData);
      if (res.data.success) {
        setSuccess('KYC documents submitted successfully. Status set to pending.');
        await refreshUser();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update KYC');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const statusColors: any = {
    not_submitted: 'text-muted bg-white/[0.05] border-white/[0.1]',
    pending: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    approved: 'text-sh bg-sh/10 border-sh/20',
    rejected: 'text-hcm bg-hcm/10 border-hcm/20'
  };

  return (
    <DashboardLayout pageTitle="Identity & KYC">
      <div className="max-w-4xl mx-auto space-y-8 pb-20">
        {/* Status Banner */}
        <div className={`p-8 rounded-[32px] border flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden ${statusColors[user.kycStatus]}`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full -mr-16 -mt-16" />
          <div className="flex items-center gap-6 z-10 text-center md:text-left flex-col md:flex-row">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl shadow-xl">
              {user.kycStatus === 'approved' ? '🎖️' : '🛡️'}
            </div>
            <div>
              <h3 className="font-display text-xl font-bold uppercase tracking-tight">KYC Verification Status</h3>
              <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-70 mt-1">{user.kycStatus.replace('_', ' ')}</p>
            </div>
          </div>
          <div className="z-10 bg-white/10 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-md">
            <p className="text-[10px] font-black uppercase tracking-widest leading-none">KYC ID</p>
            <p className="text-sm font-mono font-bold mt-1">{user.memberId}</p>
          </div>
        </div>

        {/* KYC Form */}
        <div className="bg-surface border border-white/[0.07] rounded-[32px] p-8 md:p-10 shadow-2xl relative">
          <div className="mb-10">
            <h3 className="font-display text-xl font-bold text-white mb-1">Update Documents</h3>
            <p className="text-xs text-muted font-medium uppercase tracking-widest">Submit your details for verification and payout activation</p>
          </div>

          {error && <div className="bg-hcm/10 border border-hcm/20 text-hcm text-xs font-bold px-6 py-4 rounded-2xl mb-8">⚠️ {error}</div>}
          {success && <div className="bg-sh/10 border border-sh/20 text-sh text-xs font-bold px-6 py-4 rounded-2xl mb-8">✅ {success}</div>}

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Identity Group */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 bg-hcc h-4 rounded-full" />
                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Identity Information</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">Aadhaar Number</label>
                  <input
                    type="text"
                    maxLength={12}
                    disabled={user.kycStatus === 'approved'}
                    value={formData.aadhaarNumber}
                    onChange={(e) => setFormData({...formData, aadhaarNumber: e.target.value.replace(/\D/g, '')})}
                    placeholder="12-digit number"
                    className="w-full bg-surface2 border border-white/[0.07] rounded-2xl px-5 py-4 text-sm font-bold text-white focus:border-hcc/50 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">PAN Number</label>
                  <input
                    type="text"
                    maxLength={10}
                    disabled={user.kycStatus === 'approved'}
                    value={formData.panNumber}
                    onChange={(e) => setFormData({...formData, panNumber: e.target.value.toUpperCase()})}
                    placeholder="ABCDE1234F"
                    className="w-full bg-surface2 border border-white/[0.07] rounded-2xl px-5 py-4 text-sm font-bold text-white focus:border-hcc/50 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                  />
                </div>
              </div>
            </div>

            {/* Banking Group */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 bg-sh h-4 rounded-full" />
                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Payout Banking Details</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">Bank Name</label>
                  <input
                    type="text"
                    disabled={user.kycStatus === 'approved'}
                    value={formData.bankName}
                    onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                    placeholder="e.g. HDFC Bank"
                    className="w-full bg-surface2 border border-white/[0.07] rounded-2xl px-5 py-4 text-sm font-bold text-white focus:border-hcc/50 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">Account Number</label>
                  <input
                    type="text"
                    disabled={user.kycStatus === 'approved'}
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({...formData, accountNumber: e.target.value.replace(/\D/g, '')})}
                    placeholder="Bank account number"
                    className="w-full bg-surface2 border border-white/[0.07] rounded-2xl px-5 py-4 text-sm font-bold text-white focus:border-hcc/50 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">IFSC Code</label>
                  <input
                    type="text"
                    disabled={user.kycStatus === 'approved'}
                    value={formData.ifscCode}
                    onChange={(e) => setFormData({...formData, ifscCode: e.target.value.toUpperCase()})}
                    placeholder="HDFC0001234"
                    className="w-full bg-surface2 border border-white/[0.07] rounded-2xl px-5 py-4 text-sm font-bold text-white focus:border-hcc/50 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                  />
                </div>
              </div>
            </div>

            {/* Submission Section */}
            {user.kycStatus !== 'approved' && (
              <div className="pt-6 border-t border-white/[0.04]">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 rounded-[24px] bg-white text-[#0d0f14] font-black text-sm uppercase tracking-[0.2em] hover:bg-hcc hover:text-[#0d0f14] transition-all disabled:opacity-20 active:scale-[0.98] shadow-2xl shadow-white/5"
                >
                  {loading ? 'Processing Submission...' : 'Submit Documents for Verification'}
                </button>
                <p className="text-center text-[9px] text-muted font-bold uppercase tracking-widest mt-6 opacity-40">
                  By submitting, you consent to the verification of these documents for taxation and payout purposes.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
