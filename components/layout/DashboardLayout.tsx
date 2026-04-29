'use client';

import { useAuth } from '@/lib/auth';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROLE_COLORS } from '@/lib/constants';

interface DashboardLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  hideSidebar?: boolean;
  hideTopbar?: boolean;
}

import { useState } from 'react';

export default function DashboardLayout({
  children,
  pageTitle,
  hideSidebar = false,
  hideTopbar = false
}: DashboardLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: '#f4f6fb' }}>
        <div className="relative w-14 h-14">
          <div className="absolute top-0 left-0 w-full h-full border-[3px] border-[#e8eaf0] rounded-full" />
          <div className="absolute top-0 left-0 w-full h-full border-[3px] border-[#6366f1] border-t-transparent rounded-full animate-spin" />
        </div>
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 p-2 mb-6 animate-bounce">
             <img src="/image.png" alt="CureBharat" className="w-full h-full object-contain" />
          </div>
          <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.4em] animate-pulse">Initialising Core...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 bg-white rounded-2xl p-2 shadow-xl grayscale opacity-20">
           <img src="/image.png" alt="CureBharat" className="w-full h-full object-contain" />
        </div>
        <p className="text-xs font-bold text-slate uppercase tracking-widest">Access Denied</p>
        <p className="text-[10px] text-muted -mt-2">No active session found. Please login again.</p>
        <a href="/login" className="mt-4 text-[10px] font-black text-hcc uppercase tracking-widest hover:underline">Return to Login</a>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-bg relative">
      {!hideSidebar && <Sidebar role={user.role} user={user} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {!hideTopbar && <Topbar pageTitle={pageTitle} user={user} setSidebarOpen={setSidebarOpen} />}

        <main className="flex-1 overflow-y-auto bg-white relative">
          <div className="max-w-[1440px] mx-auto px-6 md:px-8 py-6 md:py-8 relative animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
