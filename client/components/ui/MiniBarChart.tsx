'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MiniBarChartProps {
  data: { month: string; revenue: number; overrideIncome: number }[];
  color: string;
  title?: string;
}

export default function MiniBarChart({ data, color, title }: MiniBarChartProps) {
  const formattedData = data.map(d => ({
    ...d,
    revenue: d.revenue / 100,
    overrideIncome: d.overrideIncome / 100,
  }));

  return (
    <div className="bg-[#0c1033] border border-indigo-500/[0.1] rounded-2xl p-6"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.25)' }}
    >
      {title && (
        <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider mb-6">{title}</h3>
      )}
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(99, 102, 241, 0.06)" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#7c82a6', fontSize: 11, fontWeight: 600 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: '#7c82a6', fontSize: 10 }}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#111545',
                border: '1px solid rgba(99, 102, 241, 0.15)',
                borderRadius: '12px',
                fontSize: '12px',
                color: '#fff',
                fontWeight: 600,
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
              formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, '']}
              labelStyle={{ color: '#7c82a6', fontWeight: 700, textTransform: 'uppercase', fontSize: 10 }}
              cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
            />
            <Bar 
              dataKey="revenue" 
              fill="#4338ca"
              radius={[4, 4, 0, 0]} 
              name="Revenue"
            />
            <Bar 
              dataKey="overrideIncome" 
              fill="#6366f1"
              radius={[4, 4, 0, 0]} 
              name="Override Income"
              opacity={0.7}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-indigo-500/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-indigo-700" />
          <span className="text-[10px] text-[#7c82a6] font-bold uppercase tracking-wider">Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-indigo-500 opacity-70" />
          <span className="text-[10px] text-[#7c82a6] font-bold uppercase tracking-wider">Override Income</span>
        </div>
      </div>
    </div>
  );
}
