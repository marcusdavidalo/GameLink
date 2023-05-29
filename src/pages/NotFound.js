import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Link to="/" className="flex flex-col items-center mb-4">
        <img src={logo} alt="Logo" className="h-16 w-auto" />
        <span className="ml-2 text-2xl font-bold text-gray-200 dark:text-gray-800">
          GameLink
        </span>
      </Link>
      <h1 className="text-4xl font-bold text-gray-200 dark:text-gray-800 mb-2">
        404!
      </h1>
      <p className="text-lg text-gray-300 dark:text-gray-700 mb-8">
        The page couldn't handle the power of your mad gaming skills. You broke
        it!
      </p>
      <Link
        to="/"
        className="px-4 py-2 rounded-md text-base font-medium bg-gray-800 text-white hover:bg-gray-900"
      >
        Go to Home
      </Link>
    </div>
  );
}

export default PageNotFound;
