'use client';

interface RankProgressBarProps {
  currentRank: string;
  nextRank: string;
  currentSales: number;
  targetSales: number;
  currentRecruits: number;
  targetRecruits: number;
  color: string;
}

export default function RankProgressBar({
  currentRank, nextRank,
  currentSales, targetSales,
  currentRecruits, targetRecruits,
  color
}: RankProgressBarProps) {
  const salesPercent = Math.min((currentSales / targetSales) * 100, 100);
  const recruitPercent = Math.min((currentRecruits / targetRecruits) * 100, 100);
  const overallPercent = Math.round((salesPercent + recruitPercent) / 2);

  return (
    <div className="bg-surface border border-white/[0.07] rounded-xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="text-[10px] text-muted mb-1 uppercase font-bold tracking-widest">Current Rank</div>
          <div className="font-display text-xl font-bold" style={{ color }}>
            {currentRank}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-muted mb-1 uppercase font-bold tracking-widest">Next Goal</div>
          <div className="font-display text-xl font-bold text-white">
            {nextRank}
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-muted font-medium">Overall Progress</span>
          <span style={{ color }} className="font-bold">{overallPercent}%</span>
        </div>
        <div className="h-2.5 bg-surface2 rounded-full overflow-hidden p-[2px]">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            style={{ width: `${overallPercent}%`, backgroundColor: color }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Sales Progress */}
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-3">
          <div className="flex justify-between text-[10px] mb-2">
            <span className="text-muted uppercase font-bold tracking-tighter">Sales</span>
            <span className="text-white font-mono">{currentSales} / {targetSales}</span>
          </div>
          <div className="h-1 bg-surface2 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${salesPercent}%`, backgroundColor: color, opacity: 0.6 }}
            />
          </div>
        </div>

        {/* Recruits Progress */}
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-3">
          <div className="flex justify-between text-[10px] mb-2">
            <span className="text-muted uppercase font-bold tracking-tighter">Team</span>
            <span className="text-white font-mono">{currentRecruits} / {targetRecruits}</span>
          </div>
          <div className="h-1 bg-surface2 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${recruitPercent}%`, backgroundColor: color, opacity: 0.6 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
