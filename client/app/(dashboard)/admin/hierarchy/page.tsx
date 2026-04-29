'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { usersAPI } from '@/lib/api';
import { IUser } from '@/types';

export default function AdminHierarchyPage() {
  const [roots, setRoots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandAll, setExpandAll] = useState(false);

  // Mock data to match Figma visual exactly
  const mockTree = [
    {
      _id: '1',
      name: 'Vikram Malhotra',
      memberId: 'MLMR-0001',
      level: 0,
      role: 'SH',
      location: 'Mumbai, MH',
      status: 'ACTIVE',
      children: [
        {
          _id: '2',
          name: 'Ananya Sharma',
          memberId: 'MLMR-1024',
          level: 1,
          role: 'HBA',
          location: 'Delhi, DL',
          status: 'ACTIVE',
          children: [
            {
              _id: '3',
              name: 'Rahul Verma',
              memberId: 'MLMR-4581',
              level: 2,
              role: 'HCM',
              location: 'Pune, MH',
              status: 'ACTIVE',
            },
            {
              _id: '4',
              name: 'Sneha Patil',
              memberId: 'MLMR-4582',
              level: 2,
              role: 'HCC',
              location: 'Satara, MH',
              status: 'ACTIVE',
            }
          ]
        },
        {
          _id: '5',
          name: 'Zaid Khan',
          memberId: 'MLMR-1088',
          level: 1,
          role: 'HBA',
          location: 'Lucknow, UP',
          status: 'ACTIVE',
        }
      ]
    },
    {
      _id: '6',
      name: 'Kavita Reddy',
      memberId: 'MLMR-0002',
      level: 0,
      role: 'SH',
      location: 'Hyderabad, TS',
      status: 'ACTIVE',
    }
  ];

  useEffect(() => {
    // For visual match, we use mockTree. In production, we'd fetch from /api/users/tree
    setRoots(mockTree);
    setLoading(false);
  }, []);

  return (
    <DashboardLayout pageTitle="Hierarchy Tree">
      <div className="space-y-6 pb-10">
        {/* Header Section */}
        <div className="bg-[#131241] rounded-[2rem] p-8 mb-8 border border-white/[0.03] shadow-xl text-white">
           <div className="flex justify-between items-center mb-6">
              <div>
                 <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">CUREBHARAT / ADMIN / HIERARCHY TREE</p>
                 <h1 className="text-3xl font-bold font-display">Hierarchy Tree</h1>
              </div>
              <button className="bg-[#6029F1] px-6 py-3 rounded-xl text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-[#6029F1]/20 hover:brightness-110 transition-all">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                 Export Network
              </button>
           </div>
           <p className="text-sm text-white/50 font-medium max-w-2xl leading-relaxed">Visualize and manage the recursive organizational structure. Monitor network growth and hierarchical distribution across all tiers.</p>
        </div>

        {/* Top Stat Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="TOTAL MEMBERS" value="124,582" sub="+12% vs last month" icon="users" />
          <StatCard label="ACTIVE MEMBERS" value="98,240" sub="78.8% Activity Rate" icon="active" />
          <StatCard label="TOTAL LEVELS" value="15" sub="Max depth reached" icon="levels" />
          <StatCard label="NEW JOINS" value="1,204" sub="Last 24 hours" icon="new" />
        </div>

        {/* Filter Bar */}
        <div className="bg-[#131241] p-4 rounded-2xl shadow-xl border border-white/[0.03] flex flex-col lg:flex-row gap-4 items-center">
           <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19l-6-6M10 17a7 7 0 100-14 7 7 0 000 14z"></path></svg>
              <input
                type="text"
                placeholder="Search ID or Name..."
                className="w-full bg-white/[0.05] border border-white/[0.05] rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none"
              />
           </div>
           <div className="flex flex-wrap gap-3">
              <select className="bg-white border border-[#E1E2EC] rounded-xl px-4 py-3 text-sm font-bold text-black min-w-[120px]"><option>Role: All</option></select>
              <select className="bg-white border border-[#E1E2EC] rounded-xl px-4 py-3 text-sm font-bold text-black min-w-[120px]"><option>Status: All</option></select>
              <select className="bg-white border border-[#E1E2EC] rounded-xl px-4 py-3 text-sm font-bold text-black min-w-[120px]"><option>State: All</option></select>
              <div className="flex gap-2">
                 <button className="bg-[#6029F1] px-5 py-3 rounded-xl text-[10px] font-black text-white uppercase tracking-widest" onClick={() => setExpandAll(true)}>Expand All</button>
                 <button className="bg-white px-5 py-3 rounded-xl text-[10px] font-black text-black uppercase tracking-widest border border-[#E1E2EC]" onClick={() => setExpandAll(false)}>Collapse All</button>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Tree View */}
          <div className="lg:col-span-9 bg-[#131241] rounded-[2rem] shadow-xl border border-white/[0.03] overflow-hidden min-h-[600px]">
             <div className="px-8 py-5 border-b border-white/5 flex text-[9px] font-black text-white/20 uppercase tracking-[0.2em]">
                <div className="w-[30%]">MEMBER / LEVEL</div>
                <div className="w-[15%] text-center">ROLE</div>
                <div className="w-[15%] text-center">LOCATION</div>
                <div className="w-[15%] text-center">SALES (₹)INCOME (₹)</div>
                <div className="w-[15%] text-center">STATUS</div>
                <div className="w-[10%] text-center">ACTION</div>
             </div>
             <div className="p-8 space-y-4">
                {roots.map(root => (
                   <TreeNode key={root._id} node={root} defaultExpanded={expandAll} />
                ))}
             </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-6">
             {/* Network Distribution */}
             <div className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
                <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-10">NETWORK DISTRIBUTION</h3>
                <div className="flex flex-col items-center">
                   <div className="w-40 h-40 relative flex items-center justify-center bg-white/[0.02] rounded-3xl border border-white/[0.05]">
                      <div className="absolute inset-2 rounded-2xl border-[6px] border-[#6029F1]/40 flex items-center justify-center">
                         <div className="text-center">
                            <p className="text-2xl font-bold font-display">62%</p>
                            <p className="text-[9px] font-black text-white/30 uppercase">HBA TIER</p>
                         </div>
                      </div>
                   </div>
                   <div className="mt-10 space-y-4 w-full">
                      <LegendItem label="Super Head" value="4,204" color="bg-[#60A5FA]" />
                      <LegendItem label="HBA" value="74,210" color="bg-[#8b7cf8]" />
                      <LegendItem label="HCM" value="32,150" color="bg-[#fbbf24]" />
                      <LegendItem label="HCC" value="14,018" color="bg-[#34d399]" />
                   </div>
                </div>
             </div>

             {/* Network Health */}
             <div className="bg-[#3B82F6] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.05]">
                <h3 className="text-sm font-bold font-display mb-4">Network Health</h3>
                <p className="text-xs text-white/70 leading-relaxed font-medium mb-8">Your network has grown by <span className="text-white font-bold underline">1,204 members</span> in the last 24 hours. The highest density is currently at Level 4.</p>
                <button className="w-full bg-white/10 hover:bg-white/20 rounded-xl py-4 text-[10px] font-black uppercase tracking-widest border border-white/20 transition-all">VIEW GROWTH MAP</button>
             </div>

             {/* Depth vs Count */}
             <div className="bg-[#131241] rounded-[2rem] p-8 text-white shadow-xl border border-white/[0.03]">
                <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-8">DEPTH VS COUNT</h3>
                <div className="space-y-6">
                   <BarItem label="L1 - L3" value="45,200" width="85%" color="bg-[#3B82F6]" />
                   <BarItem label="L4 - L7" value="38,100" width="70%" color="bg-[#3B82F6]" />
                   <BarItem label="L8 - L12" value="22,400" width="40%" color="bg-[#3B82F6]" opacity="opacity-60" />
                   <BarItem label="L13 - L15" value="18,882" width="25%" color="bg-[#3B82F6]" opacity="opacity-30" />
                </div>
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function TreeNode({ node, depth = 0, defaultExpanded = false }: any) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  useEffect(() => { setExpanded(defaultExpanded); }, [defaultExpanded]);

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="relative">
      <div className="flex items-center group">
         <div className="w-[30%] flex items-center gap-3">
            <div className="flex items-center" style={{ paddingLeft: depth * 24 }}>
               {hasChildren && (
                 <button onClick={() => setExpanded(!expanded)} className="p-1 text-white/20 hover:text-white transition-colors">
                    {expanded ? 
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg> : 
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    }
                 </button>
               )}
               {!hasChildren && <div className="w-5" />}
               <div className="w-9 h-9 rounded-xl border border-white/10 overflow-hidden flex-shrink-0">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${node.name}`} alt="avatar" className="w-full h-full object-cover bg-white/5" />
               </div>
               <div className="ml-3">
                  <p className="text-sm font-bold text-white">{node.name}</p>
                  <p className="text-[10px] text-white/20 font-bold uppercase tracking-tighter">ID: {node.memberId} · Level {node.level}</p>
               </div>
            </div>
         </div>
         <div className="w-[15%] text-center">
            <span className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border ${
               node.role === 'SH' ? 'text-sh border-sh/30 bg-sh/5' :
               node.role === 'HBA' ? 'text-[#8b7cf8] border-[#8b7cf8]/30 bg-[#8b7cf8]/5' :
               node.role === 'HCM' ? 'text-[#fbbf24] border-[#fbbf24]/30 bg-[#fbbf24]/5' :
               'text-[#60a5fa] border-[#60a5fa]/30 bg-[#60a5fa]/5'
            }`}>
               {node.role}
            </span>
         </div>
         <div className="w-[15%] text-center text-[10px] font-bold text-white/40">{node.location}</div>
         <div className="w-[15%] text-center text-[10px] font-bold text-white/20 uppercase">Mumbai, MH</div>
         <div className="w-[15%] text-center">
            <div className="flex items-center justify-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
               <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">{node.status}</span>
            </div>
         </div>
         <div className="w-[10%] text-center">
            <button className="text-white/20 hover:text-[#6029F1] transition-colors font-black text-lg">···</button>
         </div>
      </div>

      {expanded && hasChildren && (
        <div className="mt-2 space-y-2 relative">
           <div className="absolute left-[44px] top-0 bottom-4 w-px bg-white/5" style={{ left: (depth * 24) + 44 }} />
           {node.children.map((child: any) => (
              <TreeNode key={child._id} node={child} depth={depth + 1} defaultExpanded={defaultExpanded} />
           ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, sub, icon }: any) {
  return (
    <div className="bg-[#131241] rounded-[1.5rem] p-6 text-white shadow-xl border border-white/[0.03] relative group">
      <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-4">{label}</div>
      <div className="text-3xl font-bold font-display mb-2">{value}</div>
      <div className={`text-[10px] font-bold ${sub.includes('+') ? 'text-[#34d399]' : 'text-white/30'}`}>{sub}</div>
      <div className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center opacity-40">
         {icon === 'users' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
         {icon === 'active' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>}
         {icon === 'levels' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>}
         {icon === 'new' && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>}
      </div>
    </div>
  );
}

function LegendItem({ label, value, color }: any) {
  return (
    <div className="flex items-center justify-between">
       <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${color}`} />
          <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">{label}</span>
       </div>
       <span className="text-xs font-bold text-white">{value}</span>
    </div>
  );
}

function BarItem({ label, value, width, color, opacity = '' }: any) {
  return (
    <div className="space-y-2">
       <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
          <span className="text-white/40">{label}</span>
          <span className="text-white">{value}</span>
       </div>
       <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div className={`h-full ${color} ${opacity} rounded-full transition-all duration-1000`} style={{ width }} />
       </div>
    </div>
  );
}
