import React from 'react';
import { dummyData } from './data/dummyData';
import TotalEmissionStats from './components/TotalEmissionStats';
import AllProductsChart from './components/AllProductsChart';
import Scope1EmissionChart from './components/Scope1EmissionChart';
import Scope2EmissionChart from './components/Scope2EmissionChart';
import Scope3EmissionChart from './components/Scope3EmissionChart';
import Scope3CategoriesChart from './components/Scope3CategoriesChart';
import WorldHeatMap from './components/WorldHeatMap';

const Dashboard = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">CROWN MONKEY INDUSTRIES</h1>
        <h2 className="text-xl">EMITRIX ANALYTICS</h2>
      </header>

      <div className="space-y-8">
        <TotalEmissionStats data={dummyData.totalEmissions} />
        
        <div className="w-full">
          <AllProductsChart data={dummyData.allProducts} />
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          <Scope1EmissionChart data={dummyData.scopeEmissions} />
          <Scope2EmissionChart data={dummyData.scopeEmissions} />
        </div>
        
        <div className="w-full">
          <Scope3EmissionChart data={dummyData.scopeEmissions} />
        </div>
        
        <div className="w-full">
          <Scope3CategoriesChart data={dummyData.scope3Categories} />
        </div>
        
        <div className="w-full">
          <WorldHeatMap />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;