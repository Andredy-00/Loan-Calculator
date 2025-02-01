'use client';  

import React from 'react';  
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';  
import { EmiMora } from '../lib/definitions';  

export default function PieChartComponent({ data }: { data: EmiMora }) {  

  const newData = [  
    { name: 'Principal', value: data.totolPrincipal!, fill: '#88A825' },  
    { name: 'Interest', value: data.totalInterestPayable, fill: '#ED8C2B' },  
    { name: 'Fees & Charges', value: data.feesCharges!, fill: '#B8204C' },  
  ];  

  // Calcular el total  
  const total = newData.reduce((sum, item) => sum + item.value, 0);  

  // Calcular porcentajes y añadirlo a cada elemento  
  const dataWithPercentages = newData.map(item => ({  
    ...item,  
    percentage: ((item.value / total) * 100).toFixed(2) + '%',  
  }));  

  return (  
    <ResponsiveContainer width="100%" height={400}>  
      <PieChart>  
        <Pie  
          dataKey="value"  
          isAnimationActive={true}  
          data={dataWithPercentages}  
          cx="50%"  
          cy="50%"  
          outerRadius={140}  
          label={({ percentage }) => `${percentage}`} // Muestra el porcentaje en la etiqueta  
          startAngle={90}  
          endAngle={-270}  
        />  
        <Tooltip formatter={(value, name) => [`(${dataWithPercentages.find(item => item.name === name)?.percentage})`, name]} />  
        <Legend />  
      </PieChart>  
    </ResponsiveContainer>  
  );  
}