'use client';

import { IUser, Role } from '@/types';
import { useAuth } from '@/lib/auth';
import { ROLE_COLORS, ROLE_TAGS } from '@/lib/constants';

interface TopbarProps {
  pageTitle: string;
  user: IUser;
  setSidebarOpen: (val: boolean) => void;
}

export default function Topbar({ pageTitle, user, setSidebarOpen }: TopbarProps) {
  const { logout } = useAuth();
  
  return (
    <header className="h-[90px] bg-[#131241] flex items-center px-4 md:px-10 gap-4 md:gap-6 flex-shrink-0 z-20">
      {/* Mobile Menu Toggle */}
      <button 
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden w-10 h-10 flex items-center justify-center text-white bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
      </button>

      <div className="flex flex-col justify-center">
         <div className="font-display text-sm md:text-xl font-black text-white tracking-[0.2em] leading-none uppercase truncate max-w-[150px] md:max-w-none">
           {pageTitle}
         </div>
      </div>

      {/* Center: Search */}
      <div className="hidden sm:flex flex-1 justify-end px-8">
        <div className="relative w-full max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-4 h-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            placeholder="Global search..." 
            className="w-full bg-white rounded-md pl-10 pr-4 py-2 text-sm text-textDark font-medium placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-admin/50 transition-shadow"
          />
        </div>
      </div>

      {/* Right: Icons & Profile */}
      <div className="flex items-center gap-5 ml-auto">
        <button className="text-white hover:text-admin transition-colors relative">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-hcm border-2 border-topbarBg" />
        </button>
        
        <button 
          onClick={() => logout()}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-white/60 hover:text-red-400 hover:border-red-400/30 hover:bg-red-500/5 transition-all group"
          title="Logout"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Logout</span>
        </button>

        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-admin to-admin/60 border border-white/10 flex items-center justify-center font-black text-sm text-white shadow-lg shadow-admin/20">
           {user.name.slice(0, 1)}
        </div>
      </div>
    </header>
  );
}

function getCurrentCycleMonth(): string {
  const now = new Date();
  return `${now.toLocaleString('default', { month: 'long' })} ${now.getFullYear()}`;
}
