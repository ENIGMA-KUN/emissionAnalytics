// src/pages/Dashboard.js
import React from 'react';
import Header from '../components/Header';
import EmissionStats from '../components/EmissionStats';
import ProductStats from '../components/ProductStats';
import ScopeStats from '../components/ScopeStats';
import CategoriesStats from '../components/CategoriesStats';
import WorldHeatMap from '../components/WorldHeatMap';

const Dashboard = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Header />
      <main className="container mx-auto p-4">
        <EmissionStats />
        <ProductStats />
        <ScopeStats />
        <CategoriesStats />
        <WorldHeatMap />
      </main>
    </div>
  );
};

export default Dashboard;
