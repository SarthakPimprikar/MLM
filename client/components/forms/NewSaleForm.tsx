'use client';

import { useState, useEffect } from 'react';
import { salesAPI } from '../../lib/api';
import { IPlan } from '../../types';

export default function NewSaleForm() {
  const [form, setForm] = useState({
    customerName: '',
    customerMobile: '',
    planId: '',
    ePinCode: '',
  });
  const [plans, setPlans] = useState<IPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Mock plans if not found
  useEffect(() => {
    // In a real app, fetch from backend:
    // salesApi.getPlans().then(res => setPlans(res.data.data));
    setPlans([
      { _id: '1', name: 'Basic Health Cover', price: 5000, businessVolume: 5000, isCommissionable: true, gstPercent: 18, description: '', isActive: true },
      { _id: '2', name: 'Premium Life Plan', price: 10000, businessVolume: 10000, isCommissionable: true, gstPercent: 18, description: '', isActive: true },
    ]);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const r = await salesAPI.create(form);
      setSuccess(`✅ Sale recorded! Policy ID: ${r.data.data?.policyId}`);
      setForm({ customerName: '', customerMobile: '', planId: '', ePinCode: '' });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to record sale');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-6">
      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-slate-300 text-sm font-medium mb-1.5">Customer Name *</label>
          <input
            name="customerName"
            value={form.customerName}
            onChange={(e) => setForm({ ...form, customerName: e.target.value })}
            required
            placeholder="Customer full name"
            className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-slate-300 text-sm font-medium mb-1.5">Customer Mobile *</label>
          <input
            name="customerMobile"
            value={form.customerMobile}
            onChange={(e) => setForm({ ...form, customerMobile: e.target.value })}
            required
            type="tel"
            placeholder="10-digit mobile number"
            className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-slate-300 text-sm font-medium mb-1.5">Plan *</label>
          <select
            name="planId"
            value={form.planId}
            onChange={(e) => setForm({ ...form, planId: e.target.value })}
            required
            className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
          >
            <option value="">Select a plan</option>
            {plans.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} — ₹{p.price}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-slate-300 text-sm font-medium mb-1.5">E-Pin Code (optional)</label>
          <input
            name="ePinCode"
            value={form.ePinCode}
            onChange={(e) => setForm({ ...form, ePinCode: e.target.value })}
            placeholder="CB-XXXXXX"
            className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-white text-sm font-mono focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity shadow-lg shadow-emerald-500/20"
        >
          {loading ? 'Recording Sale...' : 'Record Sale & Process Commission'}
        </button>
      </form>
    </div>
  );
}
