import React from 'react';

function Header() {
  return (
    <header className="bg-primary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Crown Monkey Industries</h1>
        <div className="flex items-center space-x-4">
          <span>Emitrix Analytics</span>
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        </div>
      </div>
    </header>
  );
}

export default Header;