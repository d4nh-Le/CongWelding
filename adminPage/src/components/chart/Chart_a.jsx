import React from 'react';
import "./chart_a.scss"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: "January", Total: 1200, typea:123},
    { name: "February", Total: 2100,typea:2111},
    { name: "March", Total: 800,typea:111 },
    { name: "April", Total: 1600,typea:1111 },
    { name: "May", Total: 900,typea:211 },
    { name: "June", Total: 1700,typea:1111 },
  ];
  
  const Chart_a=()=>{
    return (
        <div className="chart">
        <div className="title"> Monthly Revenue</div>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="Total" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="typea" stackId="2" stroke="#82ca9d" fill="#82ca9d" />

            </AreaChart>
       </ResponsiveContainer>
        </div>
      );
    
  }
   
    export default Chart_a
     
  
  