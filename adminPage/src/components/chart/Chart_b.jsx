import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'ab', value: 12, quatity:22},
  { name: 'cd', value: 19 , quatity:22},
  { name: 'ee', value: 3, quatity:22 },
  { name: 'ee', value: 5, quatity:22 },
  { name: 'ww', value: 2, quatity:22 },
  { name: 'qq', value: 3 , quatity:22},
  { name: 'ww', value: 12 , quatity:22},
];

const Chart_b = () => {
  return (
    <BarChart
    barSize={30}
      width={600}
      height={600}
      data={data}
      layout="vertical"
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
      <Bar dataKey="quatity" fill="#423295" />
    </BarChart>
  );
};

export default Chart_b;