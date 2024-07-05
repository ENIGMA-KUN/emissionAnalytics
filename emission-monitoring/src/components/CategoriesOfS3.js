import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Category A', value: 4000 },
  { name: 'Category B', value: 3000 },
  { name: 'Category C', value: 2000 },
  { name: 'Category D', value: 2780 },
  { name: 'Category E', value: 1890 },
];

function CategoriesOfS3() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Categories of Scope 3</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#50E3C2" />
        </BarChart>
      </ResponsiveContainer>
      <button className="mt-4 bg-secondary text-white px-4 py-2 rounded">Download</button>
    </div>
  );
}

export default CategoriesOfS3;