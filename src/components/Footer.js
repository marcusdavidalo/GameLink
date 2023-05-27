import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as FacebookIcon } from '../assets/icons/facebook.svg';
import { ReactComponent as TwitterIcon } from '../assets/icons/twitter.svg';
import { ReactComponent as InstagramIcon } from '../assets/icons/instagram.svg';
import { ReactComponent as GithubIcon } from '../assets/icons/github.svg';

function Footer() {
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
                  className="text-gray-400 dark:text-gray-800 hover:text-white dark:hover:text-gray-200 transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 dark:text-gray-800 hover:text-white dark:hover:text-gray-200 transition duration-300"
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
                  className="bg-slate-500 dark:bg-gray-400 text-gray-200 dark:text-gray-800 py-2 px-4 rounded-r-md hover:bg-slate-700 dark:hover:bg-gray-500 transition duration-300"
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
          <p className="text-gray-400 dark:text-gray-800">
            &copy; {new Date().getFullYear()} GameLink. All rights reserved.
          </p>
          <div className="flex space-x-4">
            {/* Social media icons */}
            <a
              href="http://www.facebook.com"
              className="text-gray-400 dark:text-gray-800 hover:text-white dark:hover:text-gray-200 transition duration-300"
            >
              <FacebookIcon />
            </a>
            <a
              href="http://www.twitter.com"
              className="text-gray-400 dark:text-gray-800 hover:text-white dark:hover:text-gray-200 transition duration-300"
            >
              <TwitterIcon />
            </a>
            <a
              href="http://www.instagram.com"
              className="text-gray-400 dark:text-gray-800 hover:text-white dark:hover:text-gray-200 transition duration-300"
            >
              <InstagramIcon />
            </a>
            <a
              href="http://www.github.com"
              className="text-gray-400 dark:text-gray-800 hover:text-white dark:hover:text-gray-200 transition duration-300"
            >
              <GithubIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
