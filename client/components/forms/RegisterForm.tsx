'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authAPI } from '@/lib/api';

export default function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefillMobile = searchParams.get('mobile') || '';

  const [form, setForm] = useState({
    name: '',
    mobile: prefillMobile,
    email: '',
    password: '',
    referrerId: '',
    state: '',
    ePinCode: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const states = [
    'Andhra Pradesh', 'Delhi', 'Gujarat', 'Karnataka', 'Maharashtra',
    'Madhya Pradesh', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
    'Uttar Pradesh', 'West Bengal'
  ];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await authAPI.register(form);
      router.push('/hcc');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="md:col-span-2">
            <label className="block text-slate-300 text-xs font-medium mb-1.5">Full Name *</label>
            <input
              id="reg-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Rajesh Kumar"
              className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-xs font-medium mb-1.5">Mobile *</label>
            <input
              id="reg-mobile"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              required
              type="tel"
              placeholder="9876543210"
              maxLength={10}
              className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-xs font-medium mb-1.5">Email</label>
            <input
              id="reg-email"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="rajesh@email.com"
              className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-xs font-medium mb-1.5">Password *</label>
            <input
              id="reg-password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-xs font-medium mb-1.5">State *</label>
            <select
              id="reg-state"
              name="state"
              value={form.state}
              onChange={handleChange}
              required
              className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="">Select state</option>
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-300 text-xs font-medium mb-1.5">Referrer Member ID</label>
            <input
              id="reg-referrer"
              name="referrerId"
              value={form.referrerId}
              onChange={handleChange}
              placeholder="CB-HCM-0001 (optional)"
              className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-300 text-xs font-medium mb-1.5">E-Pin Code</label>
            <input
              id="reg-epin"
              name="ePinCode"
              value={form.ePinCode}
              onChange={handleChange}
              placeholder="CB-XXXXXX (optional)"
              className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity shadow-lg shadow-emerald-500/20 mt-2"
        >
          {loading ? 'Registering...' : 'Create Account'}
        </button>
      </form>

      <p className="text-center text-slate-500 text-sm mt-4">
        Already registered?{' '}
        <a href="/login" className="text-emerald-400 hover:underline font-medium">
          Login
        </a>
      </p>
    </div>
  );
}
