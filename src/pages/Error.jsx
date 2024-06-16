import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../composants/Navbar';

const Error = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-tropical mb-4">Error 404</h1>
        <p className="text-xl text-gray-700 mb-8">Page not found</p>
        <NavLink 
          to="/" 
          className="px-4 py-2 text-lg text-white bg-tropical rounded hover:bg-tropical-dark transition-colors"
        >
          Home
        </NavLink>
      </div>
    </>
  );
};

export default Error;
