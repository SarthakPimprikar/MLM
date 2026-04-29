'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { usersAPI, salesAPI } from '@/lib/api';

interface StatBoxProps {
  label: string;
  value: string;
  sub: string;
  color: string;
}

function StatBox({ label, value, sub, color }: StatBoxProps) {
  return (
    <div className="bg-surface border border-white/[0.07] rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-all">
      <div className="absolute top-0 right-0 w-24 h-24 blur-3xl -mr-12 -mt-12 opacity-20" style={{ backgroundColor: color }} />
      <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-2">{label}</p>
      <p className="text-3xl font-display font-bold text-white mb-1">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color }}>{sub}</p>
    </div>
  );
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function AdminAnalyticsPage() {
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [loading, setLoading] = useState(true);

  const currentMonth = new Date().getMonth();

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersRes, salesRes] = await Promise.all([
          usersAPI.getAll({ limit: 1 }),
          salesAPI.getAll({ limit: 1 }),
        ]);
        if (usersRes.data.success) setTotalMembers(usersRes.data.pagination?.total || 0);
        if (salesRes.data.success) setTotalSales(salesRes.data.pagination?.total || 0);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Mock bar chart data
  const barData = [42, 58, 73, 61, 89, 95, 78, 102, 88, 115, 98, 130];
  const maxBar = Math.max(...barData);

  return (
    <DashboardLayout pageTitle="Analytics">
      <div className="space-y-8 pb-10">
        <div>
          <h2 className="font-display text-3xl font-bold text-[#000000] tracking-tight">Platform Analytics</h2>
          <p className="text-sm text-muted mt-1 font-medium">Network growth, sales volume, and financial performance</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatBox label="Total Members" value={loading ? '—' : String(totalMembers)} sub="Platform wide" color="#8b7cf8" />
          <StatBox label="Total Policies" value={loading ? '—' : String(totalSales)} sub="All-time" color="#60a5fa" />
          <StatBox label="Active This Month" value="—" sub="Cycle performance" color="#34d399" />
          <StatBox label="Pending Payouts" value="—" sub="Awaiting settlement" color="#fbbf24" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Bar Chart */}
          <div className="lg:col-span-8 bg-surface border border-white/[0.07] rounded-3xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">Monthly Sales Volume</h3>
              <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Current Year</span>
            </div>
            <div className="flex items-end gap-2 h-48">
              {barData.map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group/bar">
                  <div
                    className="w-full rounded-t-lg transition-all duration-500 group-hover/bar:brightness-125"
                    style={{
                      height: `${(val / maxBar) * 100}%`,
                      backgroundColor: i === currentMonth ? '#8b7cf8' : 'rgba(139,124,248,0.2)',
                    }}
                  />
                  <span className={`text-[8px] font-bold uppercase ${i === currentMonth ? 'text-admin' : 'text-muted/50'}`}>
                    {MONTHS[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Role Distribution */}
          <div className="lg:col-span-4 bg-surface border border-white/[0.07] rounded-3xl p-6 shadow-xl">
            <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-6">Role Distribution</h3>
            <div className="space-y-5">
              {[
                { label: 'HCC (Consultants)', pct: 72, color: '#60a5fa' },
                { label: 'HCM (Managers)', pct: 18, color: '#f87171' },
                { label: 'HBA (Associates)', pct: 7, color: '#fbbf24' },
                { label: 'SH (State Heads)', pct: 3, color: '#34d399' },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-muted uppercase tracking-widest">{item.label}</span>
                    <span style={{ color: item.color }}>{item.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.05]">
              <p className="text-[10px] text-admin font-bold uppercase tracking-widest leading-relaxed">
                💡 Network growing at 4.2% MoM. Target: 500 members by Q4.
              </p>
            </div>
          </div>
        </div>

        {/* Growth Table */}
        <div className="bg-surface border border-white/[0.07] rounded-3xl overflow-hidden shadow-2xl">
          <div className="px-6 py-5 border-b border-white/[0.07] flex justify-between items-center bg-white/[0.01]">
            <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">Recent Network Growth</h3>
            <span className="text-[10px] font-bold text-admin uppercase tracking-widest">Live Data Coming Soon</span>
          </div>
          <div className="p-12 text-center">
            <div className="text-4xl mb-4 opacity-10">📈</div>
            <p className="text-xs text-muted font-bold uppercase tracking-widest">Connect live data pipeline from /api/analytics</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
