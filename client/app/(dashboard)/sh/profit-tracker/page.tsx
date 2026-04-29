'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { authAPI } from '@/lib/api';
import { IUser } from '@/types';
export default function ShProfitTrackerPage() {
  const [user, setUser] = useState<Partial<IUser>>({});
  useEffect(() => { authAPI.getMe().then((r) => setUser(r.data.data || {})); }, []);
  return (
    <DashboardLayout pageTitle="Profit Tracker">
      <div className="space-y-6">
        <h1 className="text-white text-2xl font-bold">2% Profit Tracker</h1>
        <p className="text-slate-400 text-sm">Track your leadership income from all sales in your state</p>
        <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">📊</div>
          <p className="text-white font-semibold text-lg">Profit Tracker</p>
          <p className="text-slate-500 text-sm mt-2">Monthly cycle data will appear here after the first commission cycle.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
