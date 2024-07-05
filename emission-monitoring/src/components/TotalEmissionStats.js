import React from 'react';

function TotalEmissionStats() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Total Emission Stats</h2>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-4xl font-bold text-primary">956,549,595</span>
          <span className="text-gray-500 ml-2">CO2e</span>
        </div>
        <select className="bg-gray-100 p-2 rounded">
          <option>2023</option>
          <option>2022</option>
          <option>2021</option>
        </select>
      </div>
    </div>
  );
}

export default TotalEmissionStats;