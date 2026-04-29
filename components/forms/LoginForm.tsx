'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authAPI } from '@/lib/api';
import { getDashboardRoute } from '@/lib/auth';

type Step = 'mobile' | 'otp';

export default function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authAPI.sendOTP(mobile);
      setStep('otp');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authAPI.verifyOTP(mobile, otp);
      const data = res.data;
      if (data.success && data.user) {
        document.cookie = `user_role=${data.user.role}; path=/; max-age=604800`;
        router.push(getDashboardRoute(data.user.role));
      } else {
        router.push(`/register?mobile=${mobile}`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      {step === 'mobile' ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Mobile Number
            </label>
            <div className="flex">
              <span className="flex items-center px-3 bg-slate-800 border border-r-0 border-slate-600 rounded-l-xl text-slate-400 text-sm">
                +91
              </span>
              <input
                id="login-mobile"
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="9876543210"
                maxLength={10}
                pattern="[6-9][0-9]{9}"
                required
                className="flex-1 bg-slate-800 border border-slate-600 rounded-r-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity shadow-lg shadow-emerald-500/20"
          >
            {loading ? 'Sending OTP...' : 'Get OTP'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-slate-300 text-sm font-medium">Enter OTP</label>
              <button
                type="button"
                onClick={() => setStep('mobile')}
                className="text-emerald-400 text-xs hover:underline"
              >
                Change number
              </button>
            </div>
            <p className="text-slate-500 text-xs mb-3">Sent to +91 {mobile}</p>
            <input
              id="login-otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit OTP"
              maxLength={6}
              pattern="[0-9]{6}"
              required
              className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white text-center text-xl tracking-[0.5em] font-bold focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity shadow-lg shadow-emerald-500/20"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      )}

      <p className="text-center text-slate-500 text-sm mt-4">
        New member?{' '}
        <a href="/register" className="text-emerald-400 hover:underline font-medium">
          Register here
        </a>
      </p>
    </div>
  );
}
