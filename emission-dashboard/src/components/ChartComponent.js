import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartComponent = ({ data, title, dataKey }) => {
  const [showChart, setShowChart] = useState(true);

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + Object.keys(data[0]).join(",") + "\n"
      + data.map(row => Object.values(row).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${title.toLowerCase().replace(/ /g, '_')}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl text-gray-300">{title}</h3>
        <button 
          onClick={() => setShowChart(!showChart)} 
          className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600"
        >
          {showChart ? 'Show Table' : 'Show Chart'}
        </button>
      </div>
      {showChart ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
            <Legend />
            <Line type="monotone" dataKey="productA" stroke="#ff9800" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-gray-700">
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key} className="px-6 py-3">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className="bg-gray-800 border-b border-gray-700">
                  {Object.values(row).map((value, index) => (
                    <td key={index} className="px-6 py-4">{value}</td>
                  ))}
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

export default ChartComponent;