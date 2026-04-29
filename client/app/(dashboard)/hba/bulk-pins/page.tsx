'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import EPinTable from '@/components/ui/EPinTable';
import { HBA_EPINS } from '@/lib/mockData';

export default function HbaBulkPinsPage() {
  const color = '#3b82f6';

  return (
    <DashboardLayout pageTitle="Bulk E-Pins">
      <div className="space-y-8 pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold text-white tracking-tight">E-Pin Management</h2>
            <p className="text-sm text-muted mt-1 font-medium">Manage and distribute activation pins to your HCM network</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 rounded-xl bg-hba/10 border border-hba/20 text-hba text-xs font-bold uppercase tracking-widest hover:bg-hba/20 transition-all">
              Transfer Pin
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-hba text-[#0d0f14] text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-hba/10">
              Request Pins
            </button>
          </div>
        </div>

        <EPinTable pins={HBA_EPINS} color={color} title="E-Pin Inventory" />
      </div>
    </DashboardLayout>
  );
}
