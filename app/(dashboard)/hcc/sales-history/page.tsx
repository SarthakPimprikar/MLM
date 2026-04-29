'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';

export default function SalesHistory() {
  return (
    <DashboardLayout pageTitle="My Sales History">
      <div className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
        <h2 className="text-2xl font-bold mb-6">Sales History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] border-b border-white/5">
                <th className="px-4 py-4">Policy ID</th>
                <th className="px-4 py-4">Customer</th>
                <th className="px-4 py-4">Date</th>
                <th className="px-4 py-4">Amount</th>
                <th className="px-4 py-4">Commission</th>
                <th className="px-4 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium">
              <tr className="border-b border-white/5 last:border-0 hover:bg-white/5">
                <td className="px-4 py-4 text-[#60A5FA]">#POL-8821</td>
                <td className="px-4 py-4">Rahul Sharma</td>
                <td className="px-4 py-4">28 Jun 2024</td>
                <td className="px-4 py-4">₹12,400</td>
                <td className="px-4 py-4 text-[#34d399]">₹1,240</td>
                <td className="px-4 py-4 text-center">
                  <span className="text-[9px] font-black px-2 py-0.5 rounded bg-[#34d399]/20 text-[#34d399]">SUCCESS</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
