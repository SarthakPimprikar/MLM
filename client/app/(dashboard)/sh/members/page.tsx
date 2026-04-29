'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { usersAPI } from '@/lib/api';
import { IUser } from '@/types';
import { ROLE_COLORS } from '@/lib/constants';

export default function MembersPage() {
  const [members, setMembers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const res = await usersAPI.getAll({ limit: 50 });
        if (res.data.success) {
          setMembers(res.data.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch members', err);
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, []);

  return (
    <DashboardLayout pageTitle="Regional Network">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-md-center gap-4 bg-white border border-slate-100 p-6 rounded-[24px] shadow-sm">
           <div>
             <h2 className="text-xl font-bold text-slate-900">Regional Members</h2>
             <p className="text-xs text-slate-400 mt-1 font-medium">Manage and monitor all active partners in your state</p>
           </div>
           <div className="flex gap-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Search members..." 
                  className="bg-slate-50 border border-slate-100 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 outline-none focus:border-indigo-500/30 w-64 transition-all"
                />
              </div>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">Export</button>
           </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[24px] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Member ID</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rank</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Joined</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {members.map((member) => (
                  <tr key={member._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-xs font-mono font-bold text-indigo-600">{member.memberId}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-slate-900">{member.name}</div>
                      <div className="text-[10px] text-slate-400 font-medium">{member.mobile}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span 
                        className="text-[10px] font-bold px-2 py-1 rounded-md"
                        style={{ 
                          backgroundColor: `${ROLE_COLORS[member.role]}15`, 
                          color: ROLE_COLORS[member.role] 
                        }}
                      >
                        {member.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-900">
                      {new Date(member.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        member.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {member.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {loading && (
            <div className="p-20 text-center">
              <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
