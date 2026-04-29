'use client';

import { WithdrawalRequest } from '@/lib/mockData';

interface WithdrawalTableProps {
  withdrawals: WithdrawalRequest[];
  color: string;
  title?: string;
}

const STATUS_STYLES: Record<string, string> = {
  pending:    'bg-amber-500/10 text-amber-400 border-amber-500/20',
  processing: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  completed:  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  rejected:   'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function WithdrawalTable({ withdrawals, color, title }: WithdrawalTableProps) {
  const totalWithdrawn = withdrawals
    .filter(w => w.status === 'completed')
    .reduce((sum, w) => sum + w.amount, 0);

  return (
    <div className="bg-[#0c1033] border border-indigo-500/[0.1] rounded-2xl overflow-hidden"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.25)' }}
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-indigo-500/[0.08] flex items-center justify-between">
        <div>
          <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
            {title || 'Withdrawal History'}
          </h3>
          <p className="text-[10px] text-[#7c82a6] mt-1 font-medium">{withdrawals.length} requests</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest">Total Withdrawn</div>
          <div className="font-display text-lg font-bold" style={{ color }}>
            ₹{(totalWithdrawn / 100).toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-indigo-500/[0.06] bg-[#0a0e2d]">
              <th className="text-left text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest px-6 py-3">Date</th>
              <th className="text-right text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest px-4 py-3">Amount</th>
              <th className="text-center text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest px-4 py-3">Status</th>
              <th className="text-left text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest px-4 py-3">Processed</th>
              <th className="text-left text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest px-6 py-3">Reference</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-500/[0.05]">
            {withdrawals.map((wd) => (
              <tr key={wd._id} className="hover:bg-indigo-500/[0.03] transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm text-white font-medium">
                    {new Date(wd.requestDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <span className="text-sm font-black tracking-tight" style={{ color }}>
                    ₹{(wd.amount / 100).toLocaleString('en-IN')}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${STATUS_STYLES[wd.status]}`}>
                    <span className={`w-1 h-1 rounded-full ${
                      wd.status === 'completed' ? 'bg-emerald-400' : 
                      wd.status === 'pending' ? 'bg-amber-400 animate-pulse' :
                      wd.status === 'processing' ? 'bg-blue-400 animate-pulse' : 'bg-red-400'
                    }`} />
                    {wd.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  {wd.processedDate ? (
                    <span className="text-xs text-[#7c82a6] font-medium">
                      {new Date(wd.processedDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  ) : (
                    <span className="text-[10px] text-[#5a5e82] font-medium italic">—</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {wd.transactionRef ? (
                    <span className="text-[11px] text-[#7c82a6] font-mono">{wd.transactionRef}</span>
                  ) : (
                    <span className="text-[10px] text-[#5a5e82] font-medium italic">Awaiting</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
