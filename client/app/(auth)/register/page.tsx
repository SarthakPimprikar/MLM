'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    referrerId: '',
    ePinCode: '',
    state: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.mobile || !formData.state) {
      setError('Name, mobile, and state are required');
      return;
    }

    setLoading(true);
    try {
      const res = await authAPI.register(formData);
      if (res.data.success) {
        setSuccess(true);
        setTimeout(() => router.push('/login'), 3000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Check your E-Pin or Referrer ID.');
    } finally {
      setLoading(false);
    }
  };

  const states = ['Maharashtra', 'Delhi', 'Karnataka', 'Gujarat', 'Uttar Pradesh', 'West Bengal', 'Tamil Nadu', 'Rajasthan', 'Madhya Pradesh', 'Bihar'];

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-hcc/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[500px] relative z-10">
        <div className="text-center mb-8">
          <div className="font-display text-3xl font-extrabold text-white tracking-tighter mb-1">
            Cure<span className="text-hcc">Bharat</span>
          </div>
          <div className="text-[10px] text-muted font-bold uppercase tracking-[0.3em] opacity-60">
            Membership Application
          </div>
        </div>

        <div className="bg-surface border border-white/[0.07] rounded-[32px] p-8 md:p-10 shadow-2xl">
          {success ? (
            <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-sh/10 border border-sh/20 rounded-full flex items-center justify-center text-sh text-4xl mx-auto mb-6 shadow-xl shadow-sh/5">✓</div>
              <h2 className="font-display text-2xl font-bold text-white mb-2">Application Received!</h2>
              <p className="text-sm text-muted font-medium mb-8">Your account has been created. Please log in using your mobile number to complete KYC.</p>
              <button 
                onClick={() => router.push('/login')}
                className="w-full py-4 rounded-2xl bg-hcc text-[#0d0f14] font-black text-sm uppercase tracking-widest hover:brightness-110 transition-all"
              >
                Go to Login
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="font-display text-2xl font-bold text-white mb-2">Create Account</h2>
                <p className="text-sm text-muted font-medium">Join our network and start your wellness business</p>
              </div>

              {error && (
                <div className="bg-hcm/10 border border-hcm/20 text-hcm text-[11px] font-bold px-4 py-3 rounded-2xl mb-8 animate-shake">
                  ⚠️ {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">Full Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. John Doe"
                      className="w-full bg-surface2 border border-white/[0.07] rounded-2xl px-5 py-4 text-sm font-bold text-white outline-none focus:border-hcc/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">Mobile Number</label>
                    <input
                      required
                      type="tel"
                      maxLength={10}
                      value={formData.mobile}
                      onChange={(e) => setFormData({...formData, mobile: e.target.value.replace(/\D/g, '')})}
                      placeholder="9876543210"
                      className="w-full bg-surface2 border border-white/[0.07] rounded-2xl px-5 py-4 text-sm font-bold text-white outline-none focus:border-hcc/50 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">Email (Optional)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com"
                    className="w-full bg-surface2 border border-white/[0.07] rounded-2xl px-5 py-4 text-sm font-bold text-white outline-none focus:border-hcc/50 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">Referrer ID</label>
                    <input
                      type="text"
                      value={formData.referrerId}
                      onChange={(e) => setFormData({...formData, referrerId: e.target.value.toUpperCase()})}
                      placeholder="CB-HCC-XXXX"
                      className="w-full bg-surface2 border border-white/[0.07] rounded-2xl px-5 py-4 text-sm font-bold text-hcc outline-none focus:border-hcc/50 transition-all uppercase"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted uppercase tracking-widest ml-1">State</label>
                    <select
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      className="w-full bg-surface2 border border-white/[0.07] rounded-2xl px-5 py-4 text-sm font-bold text-white outline-none focus:border-hcc/50 transition-all appearance-none"
                    >
                      <option value="">Select State</option>
                      {states.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-2 p-6 bg-amber-500/5 border border-amber-500/10 rounded-3xl group">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xl">🔑</span>
                    <h4 className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Activation E-Pin (Optional)</h4>
                  </div>
                  <input
                    type="text"
                    value={formData.ePinCode}
                    onChange={(e) => setFormData({...formData, ePinCode: e.target.value.toUpperCase()})}
                    placeholder="CB-PIN-XXXXXX"
                    className="w-full bg-surface2 border border-white/[0.07] rounded-xl px-4 py-3 text-sm font-mono font-bold text-amber-500 outline-none focus:border-amber-500/50 transition-all uppercase placeholder:opacity-20"
                  />
                  <p className="text-[9px] text-muted font-bold mt-2 uppercase tracking-tight">Pins can be purchased from an active HCM or HBA</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 rounded-2xl bg-hcc text-[#0d0f14] font-black text-sm uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-20 shadow-2xl shadow-hcc/10"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#0d0f14] border-t-transparent rounded-full animate-spin" />
                      <span>Creating Account...</span>
                    </div>
                  ) : 'Register Membership'}
                </button>
              </form>
            </>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted font-medium">
            Already have an account? {' '}
            <a href="/login" className="text-hcc font-bold hover:underline">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
}
