'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Role, IUser } from '@/types';
import { ROLE_COLORS, ROLE_TAGS } from '@/lib/constants';
import { useAuth } from '@/lib/auth';

interface NavItem { label: string; href: string; icon: string; count?: number; }
interface NavSection { label: string; items: NavItem[]; }

const NAV_CONFIG: Record<Role, NavSection[]> = {
  admin: [
    { label: 'Overview', items: [
      { label: 'Dashboard', href: '/admin', icon: 'grid' },
    ]},
    { label: 'Network', items: [
      { label: 'Users', href: '/admin/members', icon: 'users' },
      { label: 'User Details', href: '/admin/user-details', icon: 'user-search' },
      { label: 'Hierarchy Tree', href: '/admin/hierarchy', icon: 'git-branch' },
    ]},
    { label: 'Finance', items: [
      { label: 'Commission Engine', href: '/admin/commission-config', icon: 'settings' },
      { label: 'Payout Management', href: '/admin/payouts', icon: 'dollar' },
      { label: 'Wallet Ledger', href: '/admin/wallet-ledger', icon: 'wallet' },
      { label: 'Manual Adjustments', href: '/admin/manual-adjustments', icon: 'sliders' },
    ]},
    { label: 'Rules', items: [
      { label: 'Activity Rules', href: '/admin/activity-rules', icon: 'activity' },
      { label: 'Promotion Rules', href: '/admin/promotion-rules', icon: 'tag' },
    ]},
    { label: 'Compliance', items: [
      { label: 'KYC Management', href: '/admin/kyc', icon: 'shield' },
      { label: 'Audit Trail', href: '/admin/audit-trail', icon: 'clipboard' },
    ]},
    { label: 'Administration', items: [
      { label: 'Role Manager', href: '/admin/role-manager', icon: 'users-cog' },
      { label: 'Reports', href: '/admin/tax-reports', icon: 'file-text' },
      { label: 'State Performance', href: '/admin/state-performance', icon: 'map' },
    ]},
    { label: 'Products', items: [
      { label: 'Plans & Products', href: '/admin/plans', icon: 'package' },
      { label: 'Ranks', href: '/admin/ranks', icon: 'award' },
    ]},
    { label: 'E-Pin', items: [
      { label: 'Generate', href: '/admin/epins', icon: 'key' },
    ]},
  ],
  sh: [
    { label: 'Main', items: [
      { label: 'Dashboard', href: '/sh', icon: 'grid' },
      { label: 'Profile', href: '/sh/profile', icon: 'user' },
      { label: 'KYC', href: '/sh/kyc', icon: 'shield' },
    ]},
    { label: 'Network', items: [
      { label: 'Network Tree', href: '/sh/state-tree', icon: 'git-branch' },
      { label: 'Direct Team', href: '/sh/direct-team', icon: 'users' },
      { label: 'Team Performance', href: '/sh/team-performance', icon: 'bar-chart' },
      { label: 'Members', href: '/sh/members', icon: 'list' },
    ]},
    { label: 'Sales', items: [
      { label: 'Sales Entry', href: '/sh/sales-entry', icon: 'plus-circle' },
      { label: 'My Sales', href: '/sh/my-sales', icon: 'list' },
      { label: 'Revenue', href: '/sh/revenue', icon: 'dollar' },
    ]},
    { label: 'Finance', items: [
      { label: 'Wallet', href: '/sh/wallet', icon: 'wallet' },
      { label: 'Withdrawal', href: '/sh/withdrawal', icon: 'clock' },
      { label: 'Income Breakdown', href: '/sh/income', icon: 'pie-chart' },
      { label: 'Profit Tracker', href: '/sh/profit-tracker', icon: 'target' },
      { label: 'Ranks Progress', href: '/sh/ranks', icon: 'award' },
    ]},
    { label: 'System', items: [
      { label: 'Compliance', href: '/sh/compliance', icon: 'shield' },
      { label: 'Notification', href: '/sh/notifications', icon: 'bell' },
      { label: 'Support', href: '/sh/support', icon: 'help-circle' },
    ]},
  ],
  hba: [
    { label: 'Overview', items: [
      { label: 'Dashboard', href: '/hba', icon: 'grid' },
      { label: 'Profile', href: '/hba/profile', icon: 'user' },
      { label: 'KYC', href: '/hba/kyc', icon: 'shield' },
    ]},
    { label: 'Network', items: [
      { label: 'My Tree', href: '/hba/network', icon: 'git-branch' },
      { label: 'Team Performance', href: '/hba/team-performance', icon: 'bar-chart' },
    ]},
    { label: 'Finance', items: [
      { label: 'Override Income', href: '/hba/override-income', icon: 'layers' },
      { label: 'Wallet', href: '/hba/wallet', icon: 'wallet' },
      { label: 'Withdrawal', href: '/hba/withdrawal', icon: 'clock' },
    ]},
    { label: 'E-Pin', items: [
      { label: 'Bulk Pins', href: '/hba/bulk-pins', icon: 'key' },
    ]},
  ],
  hcm: [
    { label: 'Overview', items: [
      { label: 'Dashboard', href: '/hcm', icon: 'grid' },
      { label: 'Profile', href: '/hcm/profile', icon: 'user' },
      { label: 'KYC', href: '/hcm/kyc', icon: 'shield' },
    ]},
    { label: 'Network', items: [
      { label: 'My Tree', href: '/hcm/network', icon: 'git-branch' },
      { label: 'Team Monitor', href: '/hcm/team-monitor', icon: 'activity' },
    ]},
    { label: 'Finance', items: [
      { label: 'Override Ledger', href: '/hcm/override-ledger', icon: 'layers' },
      { label: 'Wallet', href: '/hcm/wallet', icon: 'wallet' },
      { label: 'Withdrawal', href: '/hcm/withdrawal', icon: 'clock' },
      { label: 'Rank Progress', href: '/hcm/rank-progress', icon: 'target' },
    ]},
    { label: 'E-Pin', items: [
      { label: 'Push Pins', href: '/hcm/push-pins', icon: 'key' },
    ]},
  ],
  hcc: [
    { label: 'Overview', items: [
      { label: 'Dashboard', href: '/hcc', icon: 'grid' },
    ]},
    { label: 'My Business', items: [
      { label: 'Live', href: '/hcc/network', icon: 'activity' },
      { label: 'Rank Progress', href: '/hcc/rank-progress', icon: 'target' },
    ]},
    { label: 'Sales', items: [
      { label: 'New Policy Sale', href: '/hcc/new-sale', icon: 'plus-circle' },
      { label: 'My Sales History', href: '/hcc/sales-history', icon: 'list' },
      { label: 'Customer KYC Form', href: '/hcc/customer-kyc', icon: 'file-text' },
    ]},
    { label: 'Finance', items: [
      { label: 'My Wallet', href: '/hcc/wallet', icon: 'wallet' },
      { label: 'Withdrawal Request', href: '/hcc/withdrawal', icon: 'clock' },
    ]},
    { label: 'E-Pin', items: [
      { label: 'My Pin Wallet', href: '/hcc/epins', icon: 'key' },
      { label: 'Use Pin to Register', href: '/hcc/register-pin', icon: 'plus-circle' },
    ]},
    { label: 'Documents', items: [
      { label: 'My KYC Status', href: '/hcc/kyc', icon: 'shield' },
      { label: 'Policy Certificates', href: '/hcc/certificates', icon: 'award' },
    ]},
    { label: 'System', items: [
      { label: 'Support', href: '/hcc/support', icon: 'help-circle' },
      { label: 'Notifications', href: '/hcc/notifications', icon: 'bell' },
    ]},
  ],
};

export default function Sidebar({ role, user, isOpen, setIsOpen }: { role: Role; user: IUser; isOpen: boolean; setIsOpen: (val: boolean) => void }) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const sections = NAV_CONFIG[role];
  const color = ROLE_COLORS[role];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 w-[264px] min-h-screen flex flex-col flex-shrink-0 z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`} style={{ background: 'linear-gradient(180deg, #131241 0%, #0d0f14 100%)' }}>
      <div className="absolute top-0 left-0 right-0 h-40 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 0%, ${color}12 0%, transparent 70%)` }} />

      <div className="h-[90px] px-6 flex items-center gap-3 relative border-b border-white/5 flex-shrink-0">
        <div className="w-11 h-11 flex items-center justify-center flex-shrink-0 relative transition-all hover:scale-105 active:scale-95">
           <Image 
             src="/image.png" 
             alt="CureBharat Logo" 
             width={44} 
             height={44} 
             className="object-contain"
             priority
           />
        </div>
        <div>
           <div className="font-display text-[15px] font-black text-white tracking-[0.15em] leading-none uppercase">
             CURE<span className="text-[#60A5FA]">BHARAT</span>
           </div>
           <div className="text-[7px] font-black text-white/20 tracking-[0.2em] uppercase mt-1.5 leading-tight">
             Wellness Private Ltd.
           </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll px-3 pb-6 relative">
        {sections.map((section) => (
          <div key={section.label} className="mb-5">
            <div className="text-[9px] font-bold uppercase px-4 mb-2 text-white/20 tracking-widest">{section.label}</div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}
                    className={`flex items-center gap-3 px-4 py-[9px] rounded-xl text-[13px] relative group transition-all duration-200 ${isActive ? 'text-white font-bold' : 'text-white/60 hover:text-white hover:bg-white/[0.04]'}`}
                    style={{
                      background: isActive ? `linear-gradient(135deg, ${color}33, ${color}11)` : undefined,
                    }}
                  >
                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full" style={{ height: '55%', background: color, boxShadow: `0 0 10px ${color}60` }} />}
                    <span className="flex-shrink-0" style={{ color: isActive ? color : 'inherit' }}>{getIcon(item.icon, isActive ? color : 'currentColor')}</span>
                    <span className="flex-1 truncate">{item.label}</span>
                    {item.count && <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: `${color}20`, color }}>{item.count}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-4 space-y-1 relative border-t border-white/5">
        <button onClick={() => logout()} className="w-full flex items-center gap-3 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] rounded-lg transition-all text-white/40 hover:text-red-400 hover:bg-red-500/[0.06]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          Logout
        </button>
      </div>
    </aside>
    </>
  );
}

function getIcon(name: string, color: string = 'currentColor'): React.ReactNode {
  const s = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const icons: Record<string, React.ReactNode> = {
    grid: <svg {...s}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>,
    'bar-chart': <svg {...s}><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>,
    users: <svg {...s}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    shield: <svg {...s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    award: <svg {...s}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
    dollar: <svg {...s}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
    'file-text': <svg {...s}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    settings: <svg {...s}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.32 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    key: <svg {...s}><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.778-7.778zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>,
    'git-branch': <svg {...s}><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>,
    layers: <svg {...s}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
    activity: <svg {...s}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    'plus-circle': <svg {...s}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
    list: <svg {...s}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
    wallet: <svg {...s}><path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0 0 4h4v-4h-4z"/></svg>,
    'arrow-up': <svg {...s}><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>,
    user: <svg {...s}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
    clock: <svg {...s}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    'pie-chart': <svg {...s}><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>,
    target: <svg {...s}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    bell: <svg {...s}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    'help-circle': <svg {...s}><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    package: <svg {...s}><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>,
    'user-search': <svg {...s}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><path d="M11 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path></svg>,
    sliders: <svg {...s}><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>,
    tag: <svg {...s}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>,
    clipboard: <svg {...s}><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>,
    'users-cog': <svg {...s}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><circle cx="19" cy="11" r="2"></circle><path d="M23 11h-2M19 9V7M17.5 9.5l1-1M17.5 12.5l1 1M21 13v-2M22.5 9.5l-1-1M22.5 12.5l-1 1"></path></svg>,
    map: <svg {...s}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
  };
  return icons[name] || icons.grid;
}
