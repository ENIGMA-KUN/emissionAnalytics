import React from 'react';
import Header from './components/Header';
import EmissionScopes from './components/EmissionScopes';
import TotalEmissionStats from './components/TotalEmissionStats';
import ProductStats from './components/ProductStats';
import CategoriesOfS3 from './components/CategoriesOfS3';
import WorldHeatMap from './components/WorldHeatMap';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <TotalEmissionStats />
        <EmissionScopes />
        <ProductStats />
        <CategoriesOfS3 />
        <WorldHeatMap />
      </main>
    </div>
  );
}

export default App;