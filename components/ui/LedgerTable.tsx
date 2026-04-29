'use client';

import { ILedgerEntry } from '@/types';

interface LedgerTableProps {
  entries: ILedgerEntry[];
  color: string;
  title?: string;
}

const TYPE_CONFIG: Record<string, { label: string; badgeClass: string }> = {
  direct:         { label: 'Direct',       badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  override:       { label: 'Override',     badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  leadership:     { label: 'Leadership',   badgeClass: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  withdrawal:     { label: 'Withdrawal',   badgeClass: 'bg-red-500/10 text-red-400 border-red-500/20' },
  tds_deduction:  { label: 'TDS',          badgeClass: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
};

export default function LedgerTable({ entries, color, title }: LedgerTableProps) {
  return (
    <div className="bg-[#0c1033] border border-indigo-500/[0.1] rounded-2xl overflow-hidden"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.25)' }}
    >
      <div className="px-6 py-5 border-b border-indigo-500/[0.08]">
        <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
          {title || 'Transaction Ledger'}
        </h3>
        <p className="text-[10px] text-[#7c82a6] mt-1 font-medium">{entries.length} transactions</p>
      </div>

      <div className="divide-y divide-indigo-500/[0.05]">
        {entries.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="text-4xl mb-4 opacity-20">📒</div>
            <p className="text-xs text-[#7c82a6] font-bold uppercase tracking-widest">No transactions found</p>
          </div>
        ) : (
          entries.map((entry) => {
            const config = TYPE_CONFIG[entry.type] || TYPE_CONFIG.direct;
            const isDebit = entry.amount < 0;
            const absAmount = Math.abs(entry.amount);

            return (
              <div key={entry._id} className="px-6 py-4 flex items-center gap-4 hover:bg-indigo-500/[0.03] transition-colors">
                <div className={`shrink-0 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${config.badgeClass}`}>
                  {config.label}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white font-medium truncate">{entry.description}</div>
                  <div className="text-[10px] text-[#7c82a6] mt-0.5 flex items-center gap-2">
                    <span className="font-mono">{entry.cycleMonth}</span>
                    <span className="opacity-30">•</span>
                    <span>{new Date(entry.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
                <div className="shrink-0">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                    entry.status === 'final' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    <span className={`w-1 h-1 rounded-full ${entry.status === 'final' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                    {entry.status}
                  </span>
                </div>
                <div className="shrink-0 text-right min-w-[100px]">
                  <span className={`text-sm font-black tracking-tight ${isDebit ? 'text-red-400' : 'text-emerald-400'}`}>
                    {isDebit ? '-' : '+'}₹{(absAmount / 100).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
