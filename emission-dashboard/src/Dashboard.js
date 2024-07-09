import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const dummyData = {
    totalEmissions: {
      scope1: 10516488,
      scope2: 54156,
      scope3: 956549595
    },
    emissionsByProduct: [
      { product: 'Product A', emissions: 1000000 },
      { product: 'Product B', emissions: 1500000 },
      { product: 'Product C', emissions: 800000 },
      { product: 'Product D', emissions: 1200000 },
      { product: 'Product E', emissions: 900000 }
    ],
    emissionsTrend: [
      { year: '2020', scope1: 9000000, scope2: 50000, scope3: 900000000 },
      { year: '2021', scope1: 9500000, scope2: 52000, scope3: 920000000 },
      { year: '2022', scope1: 10000000, scope2: 53000, scope3: 940000000 },
      { year: '2023', scope1: 10516488, scope2: 54156, scope3: 956549595 }
    ],
    scope3Categories: [
      { category: 'Purchased Goods & Services', value: 400000000 },
      { category: 'Capital Goods', value: 100000000 },
      { category: 'Fuel & Energy Activities', value: 150000000 },
      { category: 'Transportation & Distribution', value: 200000000 },
      { category: 'Waste Generated in Operations', value: 50000000 },
      { category: 'Business Travel', value: 30000000 },
      { category: 'Employee Commuting', value: 26549595 }
    ]
  };
  
const Dashboard = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">CROWN MONKEY INDUSTRIES</h1>
        <h2 className="text-xl">EMITRIX ANALYTICS</h2>
      </header>

      <div className="grid grid-cols-3 gap-8">
        <TotalEmissionStats data={dummyData.totalEmissions} />
        <EmissionTrendChart data={dummyData.emissionsTrend} />
        <ProductEmissionsChart data={dummyData.emissionsByProduct} />
      </div>

      <div className="mt-8 grid grid-cols-3 gap-8">
        <EmissionScopeChart data={dummyData.totalEmissions} />
        <Scope3CategoriesChart data={dummyData.scope3Categories} />
        <WorldHeatMap />
      </div>
    </div>
  );
};

const TotalEmissionStats = ({ data }) => (
  <div className="bg-gray-800 p-4 rounded-lg">
    <h3 className="text-xl mb-4">Total Emission Stats</h3>
    <div className="grid grid-cols-3 gap-4">
      <StatBox label="Scope 1" value={data.scope1} />
      <StatBox label="Scope 2" value={data.scope2} />
      <StatBox label="Scope 3" value={data.scope3} />
    </div>
  </div>
);

const StatBox = ({ label, value }) => (
  <div className="bg-gray-700 p-2 rounded">
    <p className="text-sm">{label}</p>
    <p className="text-lg font-bold">{value.toLocaleString()}</p>
  </div>
);

const EmissionTrendChart = ({ data }) => {
  const [showChart, setShowChart] = useState(true);

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl">Emission Trend</h3>
        <button onClick={() => setShowChart(!showChart)} className="bg-blue-500 text-white px-2 py-1 rounded">
          {showChart ? 'Show Table' : 'Show Chart'}
        </button>
      </div>
      {showChart ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="scope1" stroke="#8884d8" />
            <Line type="monotone" dataKey="scope2" stroke="#82ca9d" />
            <Line type="monotone" dataKey="scope3" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th>Year</th>
              <th>Scope 1</th>
              <th>Scope 2</th>
              <th>Scope 3</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.year}</td>
                <td>{item.scope1.toLocaleString()}</td>
                <td>{item.scope2.toLocaleString()}</td>
                <td>{item.scope3.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const ProductEmissionsChart = ({ data }) => {
  const [showChart, setShowChart] = useState(true);

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl">Product Emissions</h3>
        <button onClick={() => setShowChart(!showChart)} className="bg-blue-500 text-white px-2 py-1 rounded">
          {showChart ? 'Show Table' : 'Show Chart'}
        </button>
      </div>
      {showChart ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="product" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="emissions" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th>Product</th>
              <th>Emissions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.product}</td>
                <td>{item.emissions.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const EmissionScopeChart = ({ data }) => {
  const [showChart, setShowChart] = useState(true);
  const pieData = Object.entries(data).map(([key, value]) => ({ name: key, value }));
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl">Emission Scopes</h3>
        <button onClick={() => setShowChart(!showChart)} className="bg-blue-500 text-white px-2 py-1 rounded">
          {showChart ? 'Show Table' : 'Show Chart'}
        </button>
      </div>
      {showChart ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
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
              <th>Scope</th>
              <th>Emissions</th>
            </tr>
          </thead>
          <tbody>
            {pieData.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const Scope3CategoriesChart = ({ data }) => {
  const [showChart, setShowChart] = useState(true);

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl">Scope 3 Categories</h3>
        <button onClick={() => setShowChart(!showChart)} className="bg-blue-500 text-white px-2 py-1 rounded">
          {showChart ? 'Show Table' : 'Show Chart'}
        </button>
      </div>
      {showChart ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="category" type="category" width={150} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <th>Category</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.category}</td>
                <td>{item.value.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const WorldHeatMap = () => (
  <div className="bg-gray-800 p-4 rounded-lg">
    <h3 className="text-xl mb-4">World Heat Map</h3>
    <p>World Heat Map component to be implemented</p>
  </div>
);

export default Dashboard;