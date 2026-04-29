'use client';

import { IUser } from '@/types';

interface ProfileCardProps {
  user: IUser;
  color: string;
}

export default function ProfileCard({ user, color }: ProfileCardProps) {
  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="bg-[#0c1033] border border-indigo-500/[0.1] rounded-2xl overflow-hidden"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.25)' }}
    >
      {/* Banner */}
      <div 
        className="h-28 relative"
        style={{ background: `linear-gradient(135deg, ${color}20, ${color}05, transparent)` }}
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[80px] opacity-20" style={{ backgroundColor: color }} />
        <div className="absolute top-4 right-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${
            user.status === 'active' 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
              : 'bg-red-500/10 text-red-400 border-red-500/20'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
            {user.status}
          </span>
        </div>
      </div>

      {/* Avatar & Name */}
      <div className="px-6 -mt-10 relative z-10">
        <div className="flex items-end gap-4">
          <div 
            className="w-20 h-20 rounded-2xl border-4 border-[#0c1033] flex items-center justify-center text-xl font-black shadow-xl"
            style={{ backgroundColor: `${color}20`, color }}
          >
            {initials}
          </div>
          <div className="pb-2">
            <h2 className="font-display text-xl font-bold text-white">{user.name}</h2>
            <p className="text-[11px] text-[#7c82a6] font-mono">{user.memberId}</p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="p-6 pt-6 space-y-5">
        {/* Role & Rank */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#0a0e2d] border border-indigo-500/[0.08] rounded-xl p-4">
            <div className="text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest mb-1">Role</div>
            <div className="text-sm font-bold uppercase tracking-wider" style={{ color }}>{user.role.toUpperCase()}</div>
          </div>
          <div className="bg-[#0a0e2d] border border-indigo-500/[0.08] rounded-xl p-4">
            <div className="text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest mb-1">Rank</div>
            <div className="text-sm font-bold text-white">{user.rank}</div>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0a0e2d] border border-indigo-500/[0.08] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c82a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <div>
              <div className="text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest">Mobile</div>
              <div className="text-sm text-white font-medium">{user.mobile}</div>
            </div>
          </div>
          {user.email && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0a0e2d] border border-indigo-500/[0.08] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c82a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div>
                <div className="text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest">Email</div>
                <div className="text-sm text-white font-medium">{user.email}</div>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0a0e2d] border border-indigo-500/[0.08] flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c82a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div>
              <div className="text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest">State</div>
              <div className="text-sm text-white font-medium">{user.state}</div>
            </div>
          </div>
        </div>

        {/* Referrer */}
        {user.referrer && (
          <div className="border-t border-indigo-500/[0.06] pt-4">
            <div className="text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest mb-3">Upline / Sponsor</div>
            <div className="flex items-center gap-3 bg-[#0a0e2d] border border-indigo-500/[0.08] rounded-xl p-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-[10px] font-black">
                {user.referrer.rank}
              </div>
              <div>
                <div className="text-sm font-bold text-white">{user.referrer.name}</div>
                <div className="text-[10px] text-[#7c82a6] font-mono">{user.referrer.memberId}</div>
              </div>
            </div>
          </div>
        )}

        {/* Join Date */}
        <div className="border-t border-indigo-500/[0.06] pt-4 flex justify-between items-center">
          <div className="text-[10px] text-[#7c82a6] font-bold uppercase tracking-widest">Member Since</div>
          <div className="text-sm text-white font-medium">
            {new Date(user.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>
    </div>
  );
}
