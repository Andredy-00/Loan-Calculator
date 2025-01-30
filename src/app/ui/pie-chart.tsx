// components/PieChartComponent.tsx
'use client';

import React from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const data01 = [
  { name: 'Principal', value: 40.11, fill: '#88A825' },
  { name: 'Interest', value: 55.08, fill: '#ED8C2B' },
  { name: 'Fees & Charges', value: 4.01, fill: '#B8204C' },
];
export default function PieChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={data01}
          cx="50%"
          cy="50%"
          outerRadius={110}
          label
          startAngle={90}
          endAngle={-270}
        />
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}