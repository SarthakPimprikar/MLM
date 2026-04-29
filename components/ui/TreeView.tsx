'use client';

import { ITreeNode } from '@/types';
import { ROLE_COLORS } from '@/lib/constants';

interface TreeViewProps {
  nodes: ITreeNode[];
  depth?: number;
}

function TreeNodeCard({ node, depth }: { node: ITreeNode; depth: number }) {
  const color = (ROLE_COLORS as any)[node.rank.toLowerCase()] || '#ffffff';

  return (
    <div className="flex flex-col items-center relative">
      {/* Node Card */}
      <div 
        className="w-48 bg-surface border border-white/[0.07] rounded-2xl p-4 shadow-xl relative z-10 hover:border-white/20 transition-all group"
        style={{ borderTop: `4px solid ${color}` }}
      >
        <div className="flex items-center justify-between mb-3">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black"
            style={{ backgroundColor: `${color}15`, color }}
          >
            {node.rank}
          </div>
          <span className={`w-1.5 h-1.5 rounded-full ${node.status === 'active' ? 'bg-sh animate-pulse' : 'bg-red-500'}`} />
        </div>
        
        <div className="text-sm font-bold text-white truncate">{node.name}</div>
        <div className="text-[10px] text-muted font-mono mt-0.5">{node.memberId}</div>
        
        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/[0.04]">
           <div>
              <div className="text-[8px] text-muted font-bold uppercase tracking-widest">Sales</div>
              <div className="text-xs font-bold text-white">{node.personalSalesCount}</div>
           </div>
           <div className="text-right">
              <div className="text-[8px] text-muted font-bold uppercase tracking-widest">Team</div>
              <div className="text-xs font-bold text-white">{node.teamSize}</div>
           </div>
        </div>
      </div>

      {/* Connection Lines for Children */}
      {node.children && node.children.length > 0 && (
        <>
          <div className="w-px h-10 bg-white/[0.07]" />
          <div className="flex gap-8 relative">
            {/* Horizontal Line connecting children */}
            {node.children.length > 1 && (
              <div className="absolute top-0 left-[10%] right-[10%] h-px bg-white/[0.07]" />
            )}
            {node.children.map((child) => (
              <div key={child._id} className="flex flex-col items-center">
                <div className="w-px h-6 bg-white/[0.07]" />
                <TreeNodeCard node={child} depth={depth + 1} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function TreeView({ nodes }: TreeViewProps) {
  if (!nodes || nodes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 opacity-20">
        <div className="text-6xl mb-4">🌳</div>
        <p className="text-sm font-bold uppercase tracking-widest text-white">No network data</p>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col items-center p-8">
      {nodes.map((node) => (
        <TreeNodeCard key={node._id} node={node} depth={0} />
      ))}
    </div>
  );
}
