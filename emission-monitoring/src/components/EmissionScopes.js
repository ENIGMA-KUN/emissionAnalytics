import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Scope 1', value: 10516488 },
  { name: 'Scope 2', value: 54156 },
  { name: 'Scope 3', value: 956549595 },
];

function EmissionScopes() {
  const [viewType, setViewType] = useState('graph');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Scopes of Emissions</h2>
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
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#4A90E2" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Scope</th>
              <th className="text-right">Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td className="text-right">{item.value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="mt-4 bg-secondary text-white px-4 py-2 rounded">Download</button>
    </div>
  );
}

export default EmissionScopes;