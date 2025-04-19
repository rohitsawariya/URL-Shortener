import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 shadow-md rounded-b-2xl">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo or App Name */}
        <div className="text-white text-2xl font-semibold">
          <Link to="/">URL Shortener</Link>
        </div>

        {/* Nav Links */}
        <ul className="flex space-x-6">
          <li>
            <Link
              className="text-white hover:text-blue-400 transition duration-300 font-medium"
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="text-white hover:text-blue-400 transition duration-300 font-medium"
              to="/history"
            >
              URLs History
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
