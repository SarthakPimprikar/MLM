'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

const data = [
  { name: 'Team', value: 25 },
  { name: 'Direct', value: 60 },
  { name: 'Other', value: 15 },
];

const COLORS = ['#6366f1', '#4f46e5', '#f1f5f9'];

export default function IncomeMixGauge() {
  return (
    <div className="h-[220px] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={8}
            dataKey="value"
            startAngle={90}
            endAngle={450}
            cornerRadius={10}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
            ))}
            <Label 
              content={({ viewBox }) => {
                const { cx, cy } = viewBox as any;
                return (
                  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan x={cx} dy="-0.5em" fill="#ffffff" style={{ fontSize: '24px', fontWeight: 'bold' }}>100</tspan>
                    <tspan x={cx} dy="1.5em" fill="#B5B8BD" style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>TOTAL</tspan>
                  </text>
                );
              }}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
