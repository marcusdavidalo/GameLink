import React from 'react';
import { Link } from 'react-router-dom';
import { Switch } from '@headlessui/react';
import { ReactComponent as FacebookIcon } from '../assets/icons/facebook.svg';
import { ReactComponent as TwitterIcon } from '../assets/icons/twitter.svg';
import { ReactComponent as InstagramIcon } from '../assets/icons/instagram.svg';
import { ReactComponent as GithubIcon } from '../assets/icons/github.svg';

function Footer({ isDarkMode, handleDarkModeToggle }) {
  return (
    <footer className="bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)]">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Footer Column 1 */}
          <div>
            <h3 className="text-white dark:text-gray-800 text-lg font-bold">
              About
            </h3>
            <p className="text-gray-400 dark:text-gray-800 mt-4">
              Lorem lang muna wala pa malagay dito bwahaha Lorem ipsum dolor sit
              amet consectetur, adipisicing elit. Numquam, velit?.
            </p>
          </div>

          {/* Footer Column 2 */}
          <div>
            <h3 className="text-white dark:text-gray-800 text-lg font-bold">
              Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 dark:text-gray-800 hover:text-white dark:hover:text-gray-200 transition "
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 dark:text-gray-800 hover:text-white dark:hover:text-gray-200 transition "
                >
                  About
                </Link>
              </li>
              {/* Add more footer links */}
            </ul>
          </div>

          {/* Footer Column 3 */}
          <div>
            <h3 className="text-white dark:text-gray-800 text-lg font-bold">
              Subscribe
            </h3>
            <form className="mt-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border text-gray-200 dark:text-gray-800 bg-gray-600 dark:bg-white border-gray-500 dark:border-gray-500 rounded-l-md py-2 px-4 focus:outline-none focus:ring-slate-400 focus:border-slate-400 sm:text-sm"
                />
                <button
                  type="submit"
                  className="bg-slate-500 dark:bg-gray-400 text-gray-200 dark:text-gray-800 py-2 px-4 rounded-r-md hover:bg-slate-700 dark:hover:bg-gray-500 transition "
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Divider */}
        <hr className="mt-8 border-gray-700 dark:border-gray-500" />

        {/* Bottom section */}
        <div className="flex justify-between items-center mt-8">
          <div className="flex space-x-4">
            {/* Social media icons */}
            <a
              href="http://www.facebook.com"
              className="text-gray-400 dark:text-gray-800 hover:text-white dark:hover:text-gray-200 transition "
            >
              <FacebookIcon />
            </a>
            <a
              href="http://www.twitter.com"
              className="text-gray-400 dark:text-gray-800 hover:text-white dark:hover:text-gray-200 transition "
            >
              <TwitterIcon />
            </a>
            <a
              href="http://www.instagram.com"
              className="text-gray-400 dark:text-gray-800 hover:text-white dark:hover:text-gray-200 transition "
            >
              <InstagramIcon />
            </a>
            <a
              href="http://www.github.com"
              className="text-gray-400 dark:text-gray-800 hover:text-white dark:hover:text-gray-200 transition "
            >
              <GithubIcon />
            </a>
          </div>

          <p className="text-gray-400 dark:text-gray-800">
            &copy; {new Date().getFullYear()} GameLink. All rights reserved.
          </p>

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
        </div>
      </div>
    </footer>
  );
}

export default Footer;
