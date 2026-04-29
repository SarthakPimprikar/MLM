'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

const data = [
  { name: 'Completed', value: 75 },
  { name: 'Remaining', value: 25 },
];

const COLORS = ['#6366f1', 'rgba(255, 255, 255, 0.05)'];

export default function PerformanceGauge() {
  return (
    <div className="h-[200px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            startAngle={225}
            endAngle={-45}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
            ))}
            <Label 
              value="75%" 
              position="center" 
              fill="#ffffff" 
              style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'var(--font-display)' }}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute bottom-4 left-0 w-full text-center">
        <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Regional Target</p>
      </div>
    </div>
  );
}
