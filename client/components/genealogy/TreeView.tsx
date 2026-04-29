'use client';

import React from 'react';
import { ITreeNode } from '../../types';

interface TreeViewProps {
  node: ITreeNode;
  onNodeClick?: (node: ITreeNode) => void;
}

const TreeView: React.FC<TreeViewProps> = ({ node, onNodeClick }) => {
  const rankColors: Record<string, string> = {
    HCC: 'border-hcc text-hcc',
    HCM: 'border-hcm text-hcm',
    HBA: 'border-hba text-hba',
    SH: 'border-sh text-sh',
    ADMIN: 'border-admin text-admin'
  };

  return (
    <div className="flex flex-col items-center">
      {/* Node Content */}
      <div 
        onClick={() => onNodeClick?.(node)}
        className={`
          relative p-4 rounded-2xl bg-surface border-2 shadow-xl cursor-pointer
          hover:scale-105 transition-all duration-300 min-w-[180px]
          ${rankColors[node.rank] || 'border-white/10 text-white'}
        `}
      >
        <div className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">{node.rank}</div>
        <div className="text-sm font-bold text-white truncate">{node.name}</div>
        <div className="text-[10px] font-mono text-muted mt-1">{node.memberId}</div>
        
        <div className="mt-3 pt-3 border-t border-white/[0.05] flex justify-between items-center">
          <div className="text-[9px] text-muted font-bold uppercase tracking-tighter">
            Team: <span className="text-white">{node.teamSize}</span>
          </div>
          <div className="text-[9px] text-muted font-bold uppercase tracking-tighter">
            Sales: <span className="text-white">{node.personalSalesCount}</span>
          </div>
        </div>

        {/* Level Indicator Badge */}
        <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-surface2 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">
          L{node.level}
        </div>
      </div>

      {/* Children Container */}
      {node.children && node.children.length > 0 && (
        <div className="relative pt-10">
          {/* Vertical Connection Line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-white/10" />
          
          <div className="flex gap-10 relative">
            {/* Horizontal Connection Line */}
            {node.children.length > 1 && (
              <div className="absolute top-0 left-0 w-full h-0.5 bg-white/10" style={{
                left: `calc(50% / ${node.children.length})`,
                width: `calc(100% - (100% / ${node.children.length}))`
              }} />
            )}

            {node.children.map((child, idx) => (
              <div key={child._id} className="relative">
                {/* Child connection line */}
                <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 w-0.5 h-10 bg-white/10" />
                <TreeView node={child} onNodeClick={onNodeClick} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeView;
