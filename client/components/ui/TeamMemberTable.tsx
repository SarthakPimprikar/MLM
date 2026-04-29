'use client';

import { TeamMember } from '@/lib/mockData';

interface TeamMemberTableProps {
  members: TeamMember[];
  color: string;
  title?: string;
  showTeamSize?: boolean;
}

export default function TeamMemberTable({ members, color, title, showTeamSize = true }: TeamMemberTableProps) {
  const activeCount = members.filter(m => m.status === 'active').length;
  const inactiveCount = members.filter(m => m.status === 'inactive').length;

  return (
    <div className="bg-[#0c1033] border border-indigo-500/[0.1] rounded-2xl overflow-hidden"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.25)' }}
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-indigo-500/[0.08] flex items-center justify-between">
        <div>
          <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
            {title || 'Team Members'}
          </h3>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {activeCount} Active
            </span>
            {inactiveCount > 0 && (
              <span className="text-[10px] font-bold text-red-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                {inactiveCount} Inactive
              </span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest">Total</div>
          <div className="font-display text-xl font-bold text-white">{members.length}</div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-indigo-500/[0.06] bg-[#0a0e2d]">
              <th className="text-left text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest px-6 py-3">Member</th>
              <th className="text-left text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest px-4 py-3">ID</th>
              <th className="text-center text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest px-4 py-3">Status</th>
              <th className="text-center text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest px-4 py-3">Month Sales</th>
              <th className="text-center text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest px-4 py-3">Total Sales</th>
              {showTeamSize && (
                <th className="text-center text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest px-4 py-3">Team</th>
              )}
              <th className="text-right text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest px-6 py-3">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-500/[0.05]">
            {members.map((member) => (
              <tr key={member._id} className="hover:bg-indigo-500/[0.03] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold text-white truncate">{member.name}</div>
                      <div className="text-[10px] text-[#7c82a6]">{member.rank}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-[11px] text-[#7c82a6] font-mono">{member.memberId}</span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    member.status === 'active' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}>
                    <span className={`w-1 h-1 rounded-full ${member.status === 'active' ? 'bg-emerald-400' : 'bg-red-400'}`} />
                    {member.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`text-sm font-bold ${member.personalSalesThisMonth > 0 ? 'text-white' : 'text-red-400'}`}>
                    {member.personalSalesThisMonth}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="text-sm font-bold text-white">{member.personalSalesCount}</span>
                </td>
                {showTeamSize && (
                  <td className="px-4 py-4 text-center">
                    <span className="text-sm font-bold text-white">{member.teamSize}</span>
                  </td>
                )}
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-black tracking-tight" style={{ color }}>
                    ₹{(member.totalRevenue / 100).toLocaleString('en-IN')}
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
