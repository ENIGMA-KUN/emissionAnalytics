import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { downloadCSV } from '../utils/chartUtils';

const AllProductsChart = ({ data }) => {
  const [showChart, setShowChart] = useState(true);

  return (
    <div className="chart-container">
      <div className="flex justify-between items-center mb-4">
        <h3 className="chart-title">All Products Emissions</h3>
        <button 
          onClick={() => setShowChart(!showChart)} 
          className="toggle-button"
        >
          {showChart ? 'Show Table' : 'Show Chart'}
        </button>
      </div>
      {showChart ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
            <Legend />
            {Object.keys(data[0]).filter(key => key !== 'date').map((key, index) => (
              <Line key={key} type="monotone" dataKey={key} stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} cursor={"pointer"} onClick={(data, i) => alert('Arm2 clicked ' + i)}
/>
            ))}
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
        onClick={() => downloadCSV(data, 'all_products_data.csv')} 
        className="download-button"
      >
        Download CSV
      </button>
    </div>
  );
};

export default AllProductsChart;