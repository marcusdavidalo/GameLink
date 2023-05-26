import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar() {
  return (
    <nav className="flex justify-center bg-gray-800">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
              <span className="ml-2 text-lg font-bold text-gray-200">
                GameLink
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center flex-grow">
            <form className="w-full mx-5">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="border text-gray-200 bg-gray-600 border-gray-500 rounded-md py-2 px-4 pr-10 block w-full focus:outline-none focus:ring-slate-400 focus:border-slate-400 sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 15l5.79 5.79"
                    />
                  </svg>
                </div>
              </div>
            </form>
          </div>

          {/* Navigation Links */}
          <div className="flex">
            <Link
              to="/"
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-gray-900 hover:bg-gray-200"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-gray-900 hover:bg-gray-200"
            >
              About
            </Link>
            {/* Add more navigation links */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
