'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export default function NetworkTreePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const mixData = [
    { name: 'Active', value: 84 },
    { name: 'Remaining', value: 16 }
  ];

  return (
    <DashboardLayout pageTitle="Network Tree">
      <div className="space-y-2 mb-8">
        <h2 className="text-2xl font-bold text-[#1E293B] tracking-tight">Network Tree</h2>
        <p className="text-sm text-[#64748B] font-medium opacity-70">View team structure, track growth, and monitor network performance in real time.</p>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
        <div className="md:col-span-5 space-y-1.5">
          <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">Search</label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search by name or ID"
              className="w-full bg-[#131241] border border-white/5 rounded-xl px-4 py-3 text-xs text-white placeholder:text-slate-600 outline-none focus:border-[#60A5FA]/30"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="md:col-span-3 space-y-1.5">
          <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">Role</label>
          <select className="w-full bg-[#131241] border border-white/5 rounded-xl px-4 py-3 text-xs text-white outline-none appearance-none cursor-pointer">
            <option>All</option>
            <option>HBA</option>
            <option>HCM</option>
            <option>HCC</option>
          </select>
        </div>
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">Depth</label>
          <select className="w-full bg-[#131241] border border-white/5 rounded-xl px-4 py-3 text-xs text-white outline-none appearance-none cursor-pointer">
            <option>All Levels</option>
            <option>Level 1</option>
            <option>Level 2</option>
          </select>
        </div>
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-[10px] font-bold text-[#B5B8BD] uppercase tracking-widest pl-1">Actions</label>
          <div className="flex gap-2">
            <button className="flex-1 bg-[#131241] text-white px-3 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider border border-white/5 hover:bg-white/5 transition-all">Expand</button>
            <button className="flex-1 bg-[#131241] text-white px-3 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider border border-white/5 hover:bg-white/5 transition-all">Collapse</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
        
        {/* Main Downline Visualization */}
        <div className="lg:col-span-8 bg-[#131241] rounded-[24px] p-8 shadow-2xl border border-white/5 min-h-[700px]">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-10">Downline Visualization</h3>
          
          <div className="space-y-4">
            {/* Tree Root */}
            <div className="relative">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 w-max">
                <span className="text-xs font-bold text-white">State Head 1</span>
                <span className="text-[8px] font-black bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded-sm uppercase">SH</span>
              </div>
              
              {/* Vertical Line from Root */}
              <div className="ml-[22px] border-l border-white/10 pl-10 space-y-8 pt-8">
                
                {/* Branch 1 */}
                <div className="relative">
                  <div className="absolute -left-10 top-4 w-10 border-t border-white/10" />
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 w-max">
                    <span className="text-xs font-bold text-white">HBA Partner 1</span>
                    <span className="text-[8px] font-black bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded-sm uppercase">HBA</span>
                  </div>
                  
                  {/* Sub-branch */}
                  <div className="ml-[22px] border-l border-white/10 pl-10 space-y-6 pt-6">
                    <div className="relative">
                      <div className="absolute -left-10 top-4 w-10 border-t border-white/10" />
                      <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 w-max">
                        <span className="text-xs font-bold text-white">Health Manager 1</span>
                        <span className="text-[8px] font-black bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-sm uppercase">HCM</span>
                      </div>
                      
                      {/* Leaf */}
                      <div className="ml-[22px] border-l border-white/10 pl-10 pt-6">
                        <div className="relative">
                          <div className="absolute -left-10 top-4 w-10 border-t border-white/10" />
                          <div className="flex items-center gap-3 bg-white/2 border border-white/5 rounded-xl px-4 py-2 w-max opacity-50">
                            <span className="text-xs font-bold text-white">Consultant 88</span>
                            <span className="text-[8px] font-black bg-slate-500/20 text-slate-400 px-1.5 py-0.5 rounded-sm uppercase">HCC</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Branch 2 */}
                <div className="relative">
                  <div className="absolute -left-10 top-5 w-10 border-t border-white/10" />
                  <div className="flex items-center gap-3 bg-white/10 border-2 border-[#60A5FA]/30 rounded-xl px-4 py-3 w-max shadow-[0_0_20px_rgba(96,165,250,0.1)]">
                    <span className="text-sm font-bold text-white tracking-tight">HBA Partner 3</span>
                    <span className="text-[8px] font-black bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded-sm uppercase">HBA</span>
                  </div>
                  
                  {/* Vertical Line */}
                  <div className="ml-[22px] border-l border-white/10 pl-10 space-y-8 pt-8">
                     {/* HM 8 */}
                     <div className="relative">
                       <div className="absolute -left-10 top-4 w-10 border-t border-white/10" />
                       <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 w-max">
                         <span className="text-xs font-bold text-white">Health Manager 8</span>
                         <span className="text-[8px] font-black bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-sm uppercase">HCM</span>
                       </div>
                       <div className="ml-[22px] border-l border-white/10 pl-10 space-y-4 pt-4">
                          <div className="relative">
                            <div className="absolute -left-10 top-4 w-10 border-t border-white/10" />
                            <div className="flex items-center gap-3 bg-white/2 border border-white/5 rounded-xl px-4 py-2 w-max opacity-50">
                              <span className="text-xs font-bold text-white">Consultant 19</span>
                              <span className="text-[8px] font-black bg-slate-500/20 text-slate-400 px-1.5 py-0.5 rounded-sm uppercase">HCC</span>
                            </div>
                          </div>
                          <div className="relative">
                            <div className="absolute -left-10 top-4 w-10 border-t border-white/10" />
                            <div className="flex items-center gap-3 bg-white/2 border border-white/5 rounded-xl px-4 py-2 w-max opacity-50">
                              <span className="text-xs font-bold text-white">Consultant 55</span>
                              <span className="text-[8px] font-black bg-slate-500/20 text-slate-400 px-1.5 py-0.5 rounded-sm uppercase">HCC</span>
                            </div>
                          </div>
                       </div>
                     </div>
                  </div>
                </div>

                {/* More Branches... */}
                <div className="relative">
                  <div className="absolute -left-10 top-4 w-10 border-t border-white/10" />
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 w-max">
                    <span className="text-xs font-bold text-white">HBA Partner 4</span>
                    <span className="text-[8px] font-black bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded-sm uppercase">HBA</span>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -left-10 top-4 w-10 border-t border-white/10" />
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 w-max">
                    <span className="text-xs font-bold text-white">HBA Partner 9</span>
                    <span className="text-[8px] font-black bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded-sm uppercase">HBA</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Analytics */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Network Mix */}
          <div className="bg-[#131241] rounded-[24px] p-8 shadow-2xl border border-white/5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Network Mix</h3>
            <div className="h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mixData}
                    innerRadius={80}
                    outerRadius={100}
                    paddingAngle={0}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                    stroke="none"
                  >
                    <Cell fill="#60A5FA" />
                    <Cell fill="rgba(255,255,255,0.05)" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">84%</span>
              </div>
            </div>
          </div>

          {/* Node Inspector */}
          <div className="bg-[#131241] rounded-[24px] p-8 shadow-2xl border border-white/5 flex-1 min-h-[400px]">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-10">Node Inspector</h3>
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-30">
               <div className="w-16 h-16 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
               </div>
               <p className="text-xs font-bold text-white uppercase tracking-widest">Select a node for details.</p>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
