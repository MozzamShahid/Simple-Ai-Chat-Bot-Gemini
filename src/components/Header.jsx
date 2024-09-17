import React from 'react';
import { Link } from 'react-router-dom'; // React Router for navigation

const Header = () => {
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">MyLogo</Link>
        </div>

        {/* Menu Links */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/add" className="hover:text-gray-400">
                Product Form
              </Link>
            </li>
            <li>
              <Link to="/show-product" className="hover:text-gray-400">
                Product Show
              </Link>
            </li>
          </ul>
        </nav>

        {/* Login Button (Signup component) */}
        <div>
          <Link to="/signup">
            <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 transition">
              Login
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
