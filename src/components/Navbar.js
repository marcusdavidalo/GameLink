import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Switch } from '@headlessui/react';
import logo from '../assets/logo.png';

function Nav({ isDarkMode, handleDarkModeToggle }) {
  return (
    <nav className="flex justify-center py-2 bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)]">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
              <span className="ml-2 text-2xl font-bold text-gray-200 dark:text-gray-800">
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
                  className="border text-gray-200 bg-[rgba(156,163,175,0.5)] border-gray-500 rounded-md py-2 px-4 pr-10 block w-full focus:outline-none focus:ring-slate-400 focus:border-slate-400 dark:text-gray-800 dark:bg-[rgba(255,255,255,0.7)] sm:text-sm"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400 dark:text-gray-800"
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
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="mx-2 text-gray-200 dark:text-gray-800"
              viewBox="0 0 24 24"
            >
              <path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z" />
            </svg>
            <Switch
              checked={isDarkMode}
              onChange={handleDarkModeToggle}
              className={`${
                isDarkMode ? 'bg-slate-600' : 'bg-gray-400'
              } relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span
                className={`${
                  isDarkMode ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-white rounded-full`}
              />
            </Switch>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="mx-2 text-gray-200 dark:text-gray-800"
              viewBox="0 0 16 16"
            >
              {' '}
              <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278zM4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z" />{' '}
            </svg>
          </div>

          {/* Navigation Links */}
          <div className="flex">
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending
                  ? 'ml-2 px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-gray-900 hover:bg-[rgba(243,244,246,0.95)] dark:text-gray-800 dark:hover:text-gray-200 dark:hover:bg-[rgba(18,18,19,0.95)]'
                  : isActive
                  ? 'ml-2 px-3 py-2 rounded-md text-base font-medium text-gray-900 bg-[rgba(243,244,246,0.95)] dark:text-gray-200 dark:bg-[rgba(18,18,19,0.95)]'
                  : 'ml-2 px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-gray-900 hover:bg-[rgba(243,244,246,0.95)] dark:text-gray-800 dark:hover:text-gray-200 dark:hover:bg-[rgba(18,18,19,0.95)]'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive, isPending }) =>
                isPending
                  ? 'ml-2 px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-gray-900 hover:bg-[rgba(243,244,246,0.95)] dark:text-gray-800 dark:hover:text-gray-200 dark:hover:bg-[rgba(18,18,19,0.95)]'
                  : isActive
                  ? 'ml-2 px-3 py-2 rounded-md text-base font-medium text-gray-900 bg-[rgba(243,244,246,0.95)] dark:text-gray-200 dark:bg-[rgba(18,18,19,0.95)]'
                  : 'ml-2 px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-gray-900 hover:bg-[rgba(243,244,246,0.95)] dark:text-gray-800 dark:hover:text-gray-200 dark:hover:bg-[rgba(18,18,19,0.95)]'
              }
            >
              About
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
