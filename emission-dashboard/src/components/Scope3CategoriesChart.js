import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Scope3CategoriesChart = ({ data }) => {
  const [showChart, setShowChart] = useState(true);

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + Object.keys(data[0]).join(",") + "\n"
      + data.map(row => Object.values(row).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "scope3_categories_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg col-span-3">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl text-gray-300">Scope 3 Categories</h3>
        <button 
          onClick={() => setShowChart(!showChart)} 
          className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
        >
          {showChart ? 'Show Table' : 'Show Chart'}
        </button>
      </div>
      {showChart ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis type="number" stroke="#888" />
            <YAxis dataKey="category" type="category" width={150} stroke="#888" />
            <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
            <Legend />
            <Bar dataKey="value" fill="#ff9800" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-gray-700">
              <tr>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Value</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="bg-gray-800 border-b border-gray-700">
                  <td className="px-6 py-4">{row.category}</td>
                  <td className="px-6 py-4">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <button 
        onClick={downloadCSV} 
        className="mt-4 bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
      >
        Download CSV
      </button>
    </div>
  );
};

export default Scope3CategoriesChart;