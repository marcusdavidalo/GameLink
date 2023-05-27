import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Navbar() {
  return (
    <nav className="flex justify-center py-2 bg-[rgba(31,41,55,0.5)]">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
              <span className="ml-2 text-2xl font-bold text-gray-200">
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
                  className="border text-gray-200 bg-[rgba(156,163,175,0.5)] border-gray-500 rounded-md py-2 px-4 pr-10 block w-full focus:outline-none focus:ring-slate-400 focus:border-slate-400 sm:text-sm"
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
              className="ml-2 px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-gray-900 hover:bg-[rgba(243,244,246,0.95)]"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="ml-2 px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-gray-900 hover:bg-[rgba(243,244,246,0.95)]"
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
