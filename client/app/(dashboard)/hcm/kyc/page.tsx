'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import KYCStatusCard from '@/components/ui/KYCStatusCard';
import { HCM_USER } from '@/lib/mockData';

export default function HcmKycPage() {
  const color = '#f87171';

  return (
    <DashboardLayout pageTitle="KYC Verification">
      <div className="space-y-8 pb-10">
        <div>
          <h2 className="font-display text-3xl font-bold text-white tracking-tight">KYC Verification</h2>
          <p className="text-sm text-muted mt-1 font-medium">Your identity and bank verification status</p>
        </div>

        <div className="max-w-2xl">
          <KYCStatusCard user={HCM_USER} color={color} />
        </div>
      </div>
    </DashboardLayout>
  );
}
