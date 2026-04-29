'use client';

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Week 1', value: 50.8 },
  { name: 'Week 2', value: 50.9 },
  { name: 'Week 3', value: 50.7 },
  { name: 'Week 4', value: 52.1 },
  { name: 'Week 5', value: 52.8 },
];

export default function RevenueChart() {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            stroke="#ffffff10" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
            tick={{ fill: '#B5B8BD', fontWeight: 500 }}
            dy={15}
          />
          <YAxis 
            stroke="#ffffff10" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
            tick={{ fill: '#B5B8BD', fontWeight: 500 }}
            domain={[46, 58]}
            ticks={[46, 48, 50, 52, 54, 56, 58]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#131241', 
              border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '12px',
              fontSize: '11px',
              color: '#fff'
            }}
            itemStyle={{ color: '#60A5FA' }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#60A5FA" 
            strokeWidth={4}
            fillOpacity={1} 
            fill="url(#colorValue)" 
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
