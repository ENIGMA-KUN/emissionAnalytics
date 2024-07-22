import React from 'react';

const TotalEmissionStats = ({ data }) => (
  <div className="bg-gray-800 p-4 rounded-lg col-span-3">
    <h3 className="text-xl mb-4 text-gray-300">Data collection stats</h3>
    <div className="grid grid-cols-5 gap-4">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="bg-gray-700 p-4 rounded-lg">
          <h4 className="text-lg uppercase">{key}</h4>
          <p className="text-2xl font-bold">{value.toLocaleString()}</p>
          <p className="text-sm text-gray-400">from emitrix database</p>
        </div>
      ))}
    </div>
  </div>
);

export default TotalEmissionStats;