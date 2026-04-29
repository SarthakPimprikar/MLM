'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const AUDIT_LOGS = [
  { id: 'LOG-001', actor: 'Vikram Admin', action: 'KYC Approved', target: 'Arjun Mehra (CB-9281)', ip: '192.168.1.10', timestamp: '2026-04-28T14:32:00Z', severity: 'info', icon: 'check' },
  { id: 'LOG-002', actor: 'System', action: 'Payout Cycle Finalized', target: 'Cycle: AUG-2024 · ₹12.4M', ip: 'system', timestamp: '2026-04-28T14:10:00Z', severity: 'success', icon: 'payout' },
  { id: 'LOG-003', actor: 'Rohit Gupta', action: 'Commission Config Updated', target: 'HCC Rate 40% → 45%', ip: '192.168.1.15', timestamp: '2026-04-28T13:00:00Z', severity: 'warning', icon: 'settings' },
  { id: 'LOG-004', actor: 'System', action: 'Failed Login Attempt', target: 'IP: 203.0.113.42', ip: '203.0.113.42', timestamp: '2026-04-28T12:44:00Z', severity: 'error', icon: 'alert' },
  { id: 'LOG-005', actor: 'Admin', action: 'Manual Adjustment', target: 'ID: CB-1024 · ₹5,000 Credit', ip: '192.168.1.10', timestamp: '2026-04-28T11:55:00Z', severity: 'info', icon: 'edit' },
];

export default function AdminAuditTrailPage() {
  const [filter, setFilter] = useState('All Events');

  return (
    <DashboardLayout pageTitle="Audit Trail">
      <div className="space-y-6 pb-20">
        {/* Header */}
        <div className="flex justify-between items-center">
           <div>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">CUREBHARAT / ADMIN / AUDIT TRAIL</p>
              <h1 className="text-3xl font-bold text-[#000000] font-display">Audit Trail</h1>
           </div>
           <button className="bg-[#1c2030] px-6 py-3 rounded-xl text-[10px] font-black text-white uppercase tracking-widest border border-white/5 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Export Logs
           </button>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
           <AuditStat label="SYSTEM EVENTS" value="1,240" sub="Last 24 hours" icon="system" color="text-[#60A5FA]" />
           <AuditStat label="ADMIN ACTIONS" value="42" sub="Across 4 admins" icon="user" color="text-[#6029F1]" />
           <AuditStat label="SECURITY ALERTS" value="12" sub="Requires attention" icon="shield" color="text-[#f87171]" />
           <AuditStat label="LOGIN ATTEMPTS" value="142" sub="98% Success rate" icon="login" color="text-[#34d399]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
           {/* Left Column: Timeline */}
           <div className="lg:col-span-8 bg-[#131241] rounded-[2rem] shadow-xl border border-white/[0.03] overflow-hidden">
              <div className="p-8 border-b border-white/5 flex flex-col md:flex-row gap-4 items-center">
                 <div className="relative flex-1">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <input
                      type="text"
                      placeholder="Filter logs by actor, action, or target..."
                      className="w-full bg-[#1c2030] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none"
                    />
                 </div>
                 <select 
                   value={filter}
                   onChange={(e) => setFilter(e.target.value)}
                   className="bg-white border border-[#E1E2EC] rounded-xl px-6 py-3 text-[10px] font-black text-black uppercase tracking-widest outline-none min-w-[150px]"
                 >
                    <option>All Severities</option>
                    <option>Info Only</option>
                    <option>Warnings</option>
                    <option>Errors</option>
                 </select>
              </div>

              <div className="p-8 space-y-8 relative">
                 <div className="absolute left-[59px] top-0 bottom-0 w-px bg-white/5" />
                 
                 {AUDIT_LOGS.map((log) => (
                    <div key={log.id} className="relative flex items-start gap-8 group">
                       <div className="text-[10px] font-black text-white/20 uppercase tracking-widest pt-3 w-12 text-right flex-shrink-0">
                          {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </div>
                       
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 z-10 border border-white/10 transition-all group-hover:scale-110 ${
                          log.severity === 'success' ? 'bg-[#34d399]/10 text-[#34d399]' :
                          log.severity === 'warning' ? 'bg-[#fbbf24]/10 text-[#fbbf24]' :
                          log.severity === 'error' ? 'bg-[#f87171]/10 text-[#f87171]' :
                          'bg-[#60A5FA]/10 text-[#60A5FA]'
                       }`}>
                          {log.icon === 'check' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                          {log.icon === 'payout' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>}
                          {log.icon === 'settings' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1V11a2 2 0 0 1-2-2 2 2 0 0 1 2-2v-.09A1.65 1.65 0 0 0 4.6 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1 1.51V11a2 2 0 0 1 2 2 2 2 0 0 1-2 2v.09a1.65 1.65 0 0 0 1 1.51z"></path></svg>}
                          {log.icon === 'alert' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>}
                          {log.icon === 'edit' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>}
                       </div>

                       <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.04] transition-colors">
                          <div className="flex justify-between items-start mb-2">
                             <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-white">{log.action}</span>
                                <span className="text-[10px] text-white/20 font-medium">by <span className="text-white/60 font-bold">{log.actor}</span></span>
                             </div>
                             <span className="text-[9px] font-black text-white/10 uppercase tracking-widest">{log.id}</span>
                          </div>
                          <p className="text-xs text-white/40 mb-4 font-medium leading-relaxed">{log.target}</p>
                          <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-white/10">
                             <div className="flex gap-4">
                                <span>IP: {log.ip}</span>
                                <span>{new Date(log.timestamp).toLocaleDateString()}</span>
                             </div>
                             <button className="hover:text-white transition-colors">VIEW JSON</button>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
              <div className="px-8 py-6 border-t border-white/5 text-center">
                 <button className="text-[10px] font-black text-[#60A5FA] uppercase tracking-widest hover:underline">Load Older Events</button>
              </div>
           </div>

           {/* Right Column: Insights */}
           <div className="lg:col-span-4 space-y-6">
              {/* Action Distribution */}
              <div className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
                 <h3 className="text-sm font-bold font-display uppercase tracking-widest mb-10">Action Distribution</h3>
                 <div className="flex flex-col items-center">
                    <div className="w-40 h-40 relative">
                       <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="42" fill="none" stroke="#6029F1" strokeWidth="16" strokeDasharray="264" strokeDashoffset="0" />
                          <circle cx="50" cy="50" r="42" fill="none" stroke="#60A5FA" strokeWidth="16" strokeDasharray="264" strokeDashoffset="80" />
                          <circle cx="50" cy="50" r="42" fill="none" stroke="#fbbf24" strokeWidth="16" strokeDasharray="264" strokeDashoffset="220" />
                       </svg>
                       <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xl font-bold font-display tracking-tight text-white/20">LOGS</span>
                       </div>
                    </div>
                    <div className="mt-10 space-y-4 w-full">
                       <StatRow label="Admin Changes" value="62%" color="bg-[#6029F1]" />
                       <StatRow label="System Automation" value="28%" color="bg-[#60A5FA]" />
                       <StatRow label="Security Warnings" value="10%" color="bg-[#fbbf24]" />
                    </div>
                 </div>
              </div>

              {/* Top Actors */}
              <div className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
                 <h3 className="text-sm font-bold font-display uppercase tracking-widest mb-8">TOP ACTORS</h3>
                 <div className="space-y-6">
                    <ActorItem name="Vikram Malhotra" actions="42" avatar="VM" />
                    <ActorItem name="System Scheduler" actions="28" avatar="SS" isSystem />
                    <ActorItem name="Ananya Sharma" actions="14" avatar="AS" />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function AuditStat({ label, value, sub, icon, color }: any) {
  return (
    <div className="bg-[#131241] rounded-[1.5rem] p-6 text-white shadow-xl border border-white/[0.03] relative group">
       <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">{label}</p>
       <p className="text-3xl font-bold font-display mb-2">{value}</p>
       <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{sub}</p>
       <div className={`absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center opacity-40 ${color}`}>
          {icon === 'system' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>}
          {icon === 'user' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>}
          {icon === 'shield' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>}
          {icon === 'login' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>}
       </div>
    </div>
  );
}

function StatRow({ label, value, color }: any) {
  return (
    <div className="flex justify-between items-center">
       <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${color}`} />
          <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{label}</span>
       </div>
       <span className="text-xs font-bold text-white">{value}</span>
    </div>
  );
}

function ActorItem({ name, actions, avatar, isSystem = false }: any) {
  return (
    <div className="flex items-center justify-between group">
       <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-[10px] font-bold ${isSystem ? 'bg-[#60A5FA]/10 text-[#60A5FA]' : 'bg-white/5 text-white/40 group-hover:text-white'} transition-colors`}>
             {avatar}
          </div>
          <div>
             <p className="text-xs font-bold text-white tracking-tight">{name}</p>
             <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">{isSystem ? 'System Engine' : 'Admin User'}</p>
          </div>
       </div>
       <div className="text-right">
          <p className="text-xs font-black text-white">{actions}</p>
          <p className="text-[8px] font-bold text-white/10 uppercase tracking-tighter">Actions</p>
       </div>
    </div>
  );
}
