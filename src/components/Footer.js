import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Switch } from '@headlessui/react';
import { ReactComponent as FacebookIcon } from '../assets/icons/facebook.svg';
import { ReactComponent as TwitterIcon } from '../assets/icons/twitter.svg';
import { ReactComponent as InstagramIcon } from '../assets/icons/instagram.svg';
import { ReactComponent as LightIcon } from '../assets/icons/sun.svg';
import { ReactComponent as DarkIcon } from '../assets/icons/moon.svg';
import './Footer.css';

const feedbackButton = 'FEEDBACK';
function Footer({ isDarkMode, handleDarkModeToggle }) {
  const currentYear = React.useMemo(() => new Date().getFullYear(), []);

  const handleFeedbackSubmit = (event) => {
    event.preventDefault();
    const feedback = event.target.elements.feedback.value;
    // Handle the feedback submission logic here
    console.log(feedback);
  };

  const [isFeedbackBoxOpen, setIsFeedbackBoxOpen] = useState(true);
  const [feedbackBoxPosition, setFeedbackBoxPosition] = useState({
    x: 0,
    y: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDragging) {
        const newX = event.clientX - dragOffset.x;
        const newY = event.clientY - dragOffset.y;
        setFeedbackBoxPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleMouseDown = (event) => {
    event.preventDefault();
    const offsetX = event.clientX - feedbackBoxPosition.x;
    const offsetY = event.clientY - feedbackBoxPosition.y;
    setDragOffset({ x: offsetX, y: offsetY });
    setIsDragging(true);
  };

  const closeFeedbackBox = () => {
    setIsFeedbackBoxOpen(false);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    setTimeout(() => {
      const feedbackForm = document.getElementById('feedback-form');
      if (feedbackForm) {
        feedbackForm.classList.add('animate-pulse');
        setTimeout(() => {
          feedbackForm.classList.remove('animate-pulse');
        }, 4000);
      }
    }, 0);
  };

  return (
    <footer className="bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)] relative">
      {isFeedbackBoxOpen && (
        <div
          className="fixed bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)] text-gray-200 dark:text-gray-700 px-2 py-2 rounded shadow cursor-move z-[10000]"
          style={{
            top: 'calc(50% + 20px)', // Move the button 20 pixels down
            left: feedbackBoxPosition.x > window.innerWidth / 2 ? 'auto' : '0',
            right: feedbackBoxPosition.x > window.innerWidth / 2 ? '0' : 'auto',
            transform: 'translateY(-50%)',
          }}
          onMouseDown={handleMouseDown}
        >
          <button
            className="flex flex-col align-center items-center justify-center focus:outline-none"
            onClick={scrollToBottom}
          >
            <div className="flex flex-col align-center items-center py-2">
              {feedbackButton.split('').map((letter, index) => (
                <p
                  className="flex text-center text-lg font-mono h-4 justify-center items-center"
                  key={index}
                >
                  {letter}
                </p>
              ))}
            </div>
          </button>
          <button
            className="text-gray-400 font-bold hover:text-gray-600 dark:text-gray-600 dark:hover:text-gray-400 focus:outline-none"
            onClick={closeFeedbackBox}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
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
              <span className="font-bold text-cyan-500">PlayKoDEX</span> for an
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
              <li>
                <Link
                  to="/help"
                  className="text-gray-400 dark:text-gray-800 hover:text-white dark:hover:text-gray-200 transition "
                >
                  Help & Support
                </Link>
              </li>
              <li>
                <Link
                  to="/404"
                  className="text-gray-400 dark:text-gray-800 hover:text-white dark:hover:text-gray-200 transition "
                >
                  404
                </Link>
              </li>
            </ul>
          </div>

          {/* Footer Column 3 */}
          <div
            id="feedback-form"
            className="flex flex-col justify-between h-full"
          >
            <div>
              <h3 className="text-white dark:text-gray-800 text-lg font-bold">
                Feedback
              </h3>
              <form className="mt-4" onSubmit={handleFeedbackSubmit}>
                <textarea
                  name="feedback"
                  placeholder="Enter your feedback"
                  rows={2}
                  className="w-full border placeholder-slate-400 text-gray-200 dark:text-gray-800 bg-gray-600 dark:bg-white border-gray-500 dark:border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-slate-400 focus:border-slate-400 sm:text-sm"
                />
              </form>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-cyan-500 dark:bg-cyan-500 text-gray-200 dark:text-gray-800 py-2 px-4 rounded-md hover:bg-cyan-500 dark:hover:bg-gray-500 transition "
                onClick={handleFeedbackSubmit}
              >
                Send Feedback
              </button>
            </div>
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
          </div>

          <p className="text-center text-gray-400 dark:text-gray-800 mt-4 md:mt-0">
            © {currentYear}{' '}
            <Link className="font-semibold" to="/home">
              PlayKoDEX
            </Link>
            . All rights reserved. Powered by{' '}
            <Link className="font-semibold" to="https://rawg.io/">
              RAWG API{' '}
            </Link>
            and{' '}
            <Link className="font-semibold" to="https://newscatcherapi.com/">
              NewsCatcherAPI
            </Link>
            . Developed by Team Vitamax.
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
