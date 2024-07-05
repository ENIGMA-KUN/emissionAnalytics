import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Product A', value: 400 },
  { name: 'Product B', value: 300 },
  { name: 'Product C', value: 200 },
  { name: 'Product D', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function ProductStats() {
  const [viewType, setViewType] = useState('graph');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Product Stats</h2>
        <div>
          <button
            className={`px-4 py-2 rounded-l-md ${viewType === 'graph' ? 'bg-primary text-white' : 'bg-gray-200'}`}
            onClick={() => setViewType('graph')}
          >
            Graph
          </button>
          <button
            className={`px-4 py-2 rounded-r-md ${viewType === 'table' ? 'bg-primary text-white' : 'bg-gray-200'}`}
            onClick={() => setViewType('table')}
          >
            Table
          </button>
        </div>
      </div>
      {viewType === 'graph' ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Product</th>
              <th className="text-right">Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td className="text-right">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="mt-4 bg-secondary text-white px-4 py-2 rounded">Download</button>
    </div>
  );
}

export default ProductStats;