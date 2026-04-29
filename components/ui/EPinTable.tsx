'use client';

import { IEPin } from '@/types';

interface EPinTableProps {
  pins: IEPin[];
  color: string;
  title?: string;
}

const PIN_STATUS_STYLES: Record<string, string> = {
  unused:       'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  used:         'bg-slate-500/10 text-slate-400 border-slate-500/20',
  transferred:  'bg-blue-500/10 text-blue-400 border-blue-500/20',
  expired:      'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function EPinTable({ pins, color, title }: EPinTableProps) {
  const unusedCount = pins.filter(p => p.status === 'unused').length;
  const usedCount = pins.filter(p => p.status === 'used').length;
  const transferredCount = pins.filter(p => p.status === 'transferred').length;

  return (
    <div className="bg-[#0c1033] border border-indigo-500/[0.1] rounded-2xl overflow-hidden"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.25)' }}
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-indigo-500/[0.08]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
              {title || 'E-Pin Inventory'}
            </h3>
            <p className="text-[10px] text-[#7c82a6] mt-1 font-medium">{pins.length} total pins</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center px-3">
              <div className="text-lg font-display font-bold text-emerald-400">{unusedCount}</div>
              <div className="text-[9px] text-[#7c82a6] font-bold uppercase tracking-wider">Available</div>
            </div>
            <div className="w-px h-8 bg-indigo-500/10" />
            <div className="text-center px-3">
              <div className="text-lg font-display font-bold text-[#7c82a6]">{usedCount}</div>
              <div className="text-[9px] text-[#7c82a6] font-bold uppercase tracking-wider">Used</div>
            </div>
            <div className="w-px h-8 bg-indigo-500/10" />
            <div className="text-center px-3">
              <div className="text-lg font-display font-bold text-blue-400">{transferredCount}</div>
              <div className="text-[9px] text-[#7c82a6] font-bold uppercase tracking-wider">Transferred</div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-indigo-500/[0.06] bg-[#0a0e2d]">
              <th className="text-left text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest px-6 py-3">Pin Code</th>
              <th className="text-left text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest px-4 py-3">Plan</th>
              <th className="text-right text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest px-4 py-3">Value</th>
              <th className="text-center text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest px-4 py-3">Status</th>
              <th className="text-left text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest px-6 py-3">Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-500/[0.05]">
            {pins.map((pin) => (
              <tr key={pin._id} className="hover:bg-indigo-500/[0.03] transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm text-white font-mono font-bold">{pin.pinCode}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-xs text-white font-medium">{pin.plan.name}</span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="text-sm font-black tracking-tight" style={{ color }}>
                    ₹{(pin.value / 100).toLocaleString('en-IN')}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${PIN_STATUS_STYLES[pin.status]}`}>
                    {pin.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-[#7c82a6] font-medium">
                    {new Date(pin.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
