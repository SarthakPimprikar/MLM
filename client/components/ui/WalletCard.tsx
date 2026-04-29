'use client';

interface WalletCardProps {
  provisionalBalance: number;
  finalBalance: number;
  totalEarned: number;
  totalWithdrawn: number;
  color: string;
  onWithdraw: () => void;
}

export default function WalletCard({
  provisionalBalance, finalBalance,
  totalEarned, totalWithdrawn,
  color, onWithdraw
}: WalletCardProps) {
  const formatAmount = (val: number) =>
    `₹${(val).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;

  return (
    <div className="bg-[#0c1033] border border-indigo-500/[0.1] rounded-2xl overflow-hidden flex flex-col h-full"
      style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.02)' }}
    >
      {/* Header */}
      <div className="p-6 border-b border-indigo-500/[0.08] relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${color}08, transparent)` }}>
        
        {/* Glow effect */}
        <div className="absolute -top-10 -right-10 w-32 h-32 blur-[60px] opacity-15" style={{ backgroundColor: color }} />

        <div className="text-[10px] text-[#7c82a6] mb-1 uppercase font-bold tracking-[0.15em] relative z-10">Available For Withdrawal</div>
        <div className="font-display text-3xl font-bold text-white relative z-10 mb-1">
          {formatAmount(finalBalance)}
        </div>
        <div className="text-xs font-medium flex items-center gap-1.5 relative z-10" style={{ color }}>
          <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
          + {formatAmount(provisionalBalance)} pending cycle end
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 divide-x divide-indigo-500/[0.08] bg-[#0a0e2d]">
        <div className="p-5">
          <div className="text-[10px] text-[#7c82a6] mb-1 uppercase font-bold tracking-tight">Gross Earnings</div>
          <div className="font-display text-lg font-bold text-emerald-400">
            {formatAmount(totalEarned)}
          </div>
        </div>
        <div className="p-5">
          <div className="text-[10px] text-[#7c82a6] mb-1 uppercase font-bold tracking-tight">Total Withdrawn</div>
          <div className="font-display text-lg font-bold text-white">
            {formatAmount(totalWithdrawn)}
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="p-5 mt-auto border-t border-indigo-500/[0.08] bg-[#0c1033]">
        <button
          onClick={onWithdraw}
          disabled={finalBalance < 500}
          className="w-full py-3 rounded-xl text-sm font-bold text-white 
            transition-all hover:brightness-110 active:scale-[0.98] 
            disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed"
          style={{ 
            backgroundColor: color,
            boxShadow: `0 4px 16px ${color}30`
          }}
        >
          {finalBalance < 500 ? 'Minimum ₹500 required' : 'Request Payout'}
        </button>
      </div>
    </div>
  );
}
