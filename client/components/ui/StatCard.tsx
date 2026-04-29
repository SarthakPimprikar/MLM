'use client';

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  color: string;
}

export default function StatCard({ label, value, change, isPositive = true, color }: StatCardProps) {
  return (
    <div
      className="stat-card group cursor-default"
      style={{
        background: 'linear-gradient(135deg, #0d1030 0%, #131845 100%)',
        border: '1px solid rgba(99, 102, 241, 0.08)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
      }}
    >
      {/* Accent corner glow */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-[0.08] blur-xl transition-opacity duration-500 group-hover:opacity-[0.15]"
        style={{ backgroundColor: color }}
      />

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-6 right-6 h-[1px] opacity-20"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />

      {/* Label */}
      <div
        className="text-[10px] mb-3 uppercase font-bold"
        style={{ color: 'rgba(148, 163, 184, 0.6)', letterSpacing: '0.16em' }}
      >
        {label}
      </div>

      {/* Value */}
      <div
        className={`${value.length > 15 ? 'text-[16px]' : value.length > 12 ? 'text-[19px]' : 'text-[24px]'} font-extrabold text-white leading-tight mb-2 tracking-tighter truncate`}
      >
        {value}
      </div>

      {/* Change indicator */}
      {change && (
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className="w-4 h-4 rounded-full flex items-center justify-center text-[8px]"
            style={{
              background: isPositive ? 'rgba(52, 211, 153, 0.12)' : 'rgba(248, 113, 113, 0.12)',
              color: isPositive ? '#34d399' : '#f87171',
            }}
          >
            {isPositive ? '↑' : '↓'}
          </span>
          <span
            className="text-[11px] font-medium"
            style={{ color: isPositive ? '#34d399' : '#f87171' }}
          >
            {change}
          </span>
        </div>
      )}
    </div>
  );
}
