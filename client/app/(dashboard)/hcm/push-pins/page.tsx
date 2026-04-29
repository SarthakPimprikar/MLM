'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import EPinTable from '@/components/ui/EPinTable';
import { HCM_EPINS } from '@/lib/mockData';

export default function HcmPushPinsPage() {
  const color = '#f87171';

  return (
    <DashboardLayout pageTitle="Push Pins">
      <div className="space-y-8 pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold text-white tracking-tight">Push Pins</h2>
            <p className="text-sm text-muted mt-1 font-medium">Distribute activation pins to your HCC team members</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 rounded-xl bg-hcm/10 border border-hcm/20 text-hcm text-xs font-bold uppercase tracking-widest hover:bg-hcm/20 transition-all">
              Transfer to HCC
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-hcm text-[#0d0f14] text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-hcm/10">
              Request from HBA
            </button>
          </div>
        </div>

        <EPinTable pins={HCM_EPINS} color={color} title="E-Pin Inventory" />
      </div>
    </DashboardLayout>
  );
}
