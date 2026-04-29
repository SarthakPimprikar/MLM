'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TreeView from '@/components/genealogy/TreeView';
import { usersAPI } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { ITreeNode } from '@/types';

export default function GenealogyPage() {
  const { user } = useAuth();
  const [treeData, setTreeData] = useState<ITreeNode | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<ITreeNode | null>(null);

  useEffect(() => {
    async function fetchTree() {
      if (!user) return;
      try {
        const res = await usersAPI.getDownline(user._id);
        if (res.data.success) {
          setTreeData(res.data.data || null);
        }
      } catch (err) {
        console.error('Tree fetch failed', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTree();
  }, [user]);

  return (
    <DashboardLayout pageTitle="Network Genealogy">
      <div className="space-y-8 pb-20">
        {/* Legend */}
        <div className="flex flex-wrap gap-4 bg-surface border border-white/[0.07] p-4 rounded-2xl">
          <LegendItem color="#60a5fa" label="HCC" />
          <LegendItem color="#f87171" label="HCM" />
          <LegendItem color="#3b82f6" label="HBA" />
          <LegendItem color="#34d399" label="SH" />
          <div className="ml-auto flex items-center gap-2 px-4 border-l border-white/10">
             <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Max Depth: 5 Levels</span>
          </div>
        </div>

        {/* Tree Container */}
        <div className="bg-surface border border-white/[0.07] rounded-[32px] p-10 overflow-x-auto min-h-[600px] flex justify-center custom-scrollbar shadow-2xl relative">
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-hcc border-t-transparent rounded-full animate-spin" />
            </div>
          ) : treeData ? (
            <div className="scale-90 origin-top">
              <TreeView node={treeData} onNodeClick={(node) => setSelectedNode(node)} />
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-4xl mb-4 opacity-10">🕸️</div>
              <p className="text-xs text-muted font-bold uppercase tracking-widest">No downline found</p>
              <p className="text-[10px] text-muted mt-2">Start recruiting members to see your network grow</p>
            </div>
          )}
        </div>

        {/* Node Detail Sidebar/Modal (Simplified) */}
        {selectedNode && (
          <div className="fixed bottom-10 right-10 w-80 bg-surface2 border border-white/10 rounded-3xl p-6 shadow-2xl animate-in slide-in-from-right-10 duration-500 z-50">
            <button 
              onClick={() => setSelectedNode(null)}
              className="absolute top-4 right-4 text-muted hover:text-white"
            >✕</button>
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl">👤</div>
               <div>
                  <h4 className="text-sm font-bold text-white tracking-tight">{selectedNode.name}</h4>
                  <p className="text-[10px] text-muted font-bold uppercase tracking-widest">{selectedNode.rank} · Level {selectedNode.level}</p>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-6">
               <div className="p-3 bg-bg border border-white/5 rounded-xl text-center">
                  <div className="text-[8px] text-muted font-bold uppercase mb-1">Direct Team</div>
                  <div className="text-lg font-display font-bold text-white">{selectedNode.teamSize}</div>
               </div>
               <div className="p-3 bg-bg border border-white/5 rounded-xl text-center">
                  <div className="text-[8px] text-muted font-bold uppercase mb-1">Total Sales</div>
                  <div className="text-lg font-display font-bold text-sh">{selectedNode.personalSalesCount}</div>
               </div>
            </div>
            <button className="w-full py-3 rounded-xl bg-hcc/10 border border-hcc/20 text-hcc text-[10px] font-black uppercase tracking-widest hover:bg-hcc/20 transition-all">
               View Full Profile
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function LegendItem({ color, label }: any) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-[10px] font-bold text-white uppercase tracking-widest">{label}</span>
    </div>
  );
}
