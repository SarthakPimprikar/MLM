'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import KycForm from '@/components/forms/KycForm';
import { authAPI } from '@/lib/api';
import { IUser } from '@/types';

export default function KycStatusPage() {
  const [user, setUser] = useState<Partial<IUser>>({});

  useEffect(() => {
    authAPI.getMe().then((r) => setUser(r.data.data || {}));
  }, []);

  return (
    <DashboardLayout pageTitle="KYC Status">
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-white text-2xl font-bold">KYC Documents</h1>
          <p className="text-slate-400 text-sm">Submit your documents for verification to enable payouts</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-700/50 rounded-2xl p-5 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Current Status</p>
              <p className={`text-lg font-bold uppercase ${
                user.kycStatus === 'approved' ? 'text-emerald-400' : 
                user.kycStatus === 'pending' ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {user.kycStatus || 'Not Submitted'}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
              user.kycStatus === 'approved' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
            }`}>
              {user.kycStatus === 'approved' ? '✅' : '⏳'}
            </div>
          </div>
        </div>

        {user.kycStatus !== 'approved' && <KycForm />}
      </div>
    </DashboardLayout>
  );
}
