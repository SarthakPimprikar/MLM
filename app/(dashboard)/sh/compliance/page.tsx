'use client';
import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { authAPI } from '@/lib/api';
import { IUser } from '@/types';
export default function ShCompliancePage() {
  const [user, setUser] = useState<Partial<IUser>>({});
  useEffect(() => { authAPI.getMe().then((r) => setUser(r.data.data || {})); }, []);
  return (
    <DashboardLayout pageTitle="Compliance Reports">
      <div className="space-y-6">
        <h1 className="text-white text-2xl font-bold">Compliance Reports</h1>
        <p className="text-slate-400 text-sm">Tax, GST, and member compliance summaries</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['Tax & GST Summary', 'Member Compliance', 'TDS Reports', 'Annual Returns'].map((t) => (
            <div key={t} className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5">
              <h3 className="text-white font-semibold">{t}</h3>
              <p className="text-slate-500 text-sm mt-2">No data available yet for current cycle.</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
