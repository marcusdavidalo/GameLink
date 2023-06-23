import React from 'react';
import { Link } from 'react-router-dom';
import { Switch } from '@headlessui/react';
import { ReactComponent as FacebookIcon } from '../assets/icons/facebook.svg';
import { ReactComponent as TwitterIcon } from '../assets/icons/twitter.svg';
import { ReactComponent as InstagramIcon } from '../assets/icons/instagram.svg';
import { ReactComponent as GithubIcon } from '../assets/icons/github.svg';
import { ReactComponent as LightIcon } from '../assets/icons/sun.svg';
import { ReactComponent as DarkIcon } from '../assets/icons/moon.svg';
import './Footer.css';

function Footer({ isDarkMode, handleDarkModeToggle }) {
  const currentYear = React.useMemo(() => new Date().getFullYear(), []);

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
              Elevating gaming experiences with up-to-date insights, news, and
              curated content. Join us at{' '}
              <span className="font-bold text-cyan-500">GameLinked</span> for an
              unforgettable gaming adventure.
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
                  className="border placeholder-slate-400 text-gray-200 dark:text-gray-800 bg-gray-600 dark:bg-white border-gray-500 dark:border-gray-500 rounded-l-md py-2 px-4 focus:outline-none focus:ring-slate-400 focus:border-slate-400 sm:text-sm"
                />
                <button
                  type="submit"
                  className="bg-cyan-500 dark:bg-cyan-500 text-gray-200 dark:text-gray-800 py-2 px-4 rounded-r-md hover:bg-cyan-500 dark:hover:bg-gray-500 transition "
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
        <div className="flex flex-col md:flex-row justify-between items-center mt-8">
          <div className="flex space-x-4">
            {/* Social media icons */}
            <a
              href="http://www.facebook.com"
              className="text-gray-400 dark:text-gray-800 hover:text-white dark:hover:text-gray-200 transition fa-facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href="http://www.twitter.com"
              className="text-gray-400 dark:text-gray-800 hover:text-white dark:hover:text-gray-200 transition fa-twitter"
            >
              <TwitterIcon />
            </a>
            <a
              href="http://www.instagram.com"
              className="text-gray-400 dark:text-gray-800 hover:text-white dark:hover:text-gray-200 transition fa-instagram"
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

          <p className="text-center text-gray-400 dark:text-gray-800 mt-4 md:mt-0">
            © {currentYear} GameLink. All rights reserved. Powered by RAWG API
            and NewsCatcherAPI. Developed by Team Vitamax.
          </p>

          <div className="flex items-center mt-4 md:mt-0">
            <LightIcon className="h-5 w-5 mx-2 my-2 text-gray-200 dark:text-gray-800" />
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
            <DarkIcon className="h-5 w-5 mx-2 my-2 text-gray-200 dark:text-gray-800" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
