import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import gif1 from "../assets/gifs/gif1.gif";
import gif2 from "../assets/gifs/gif2.gif";
import gif3 from "../assets/gifs/gif3.gif";
import gif4 from "../assets/gifs/gif4.gif";
import gif5 from "../assets/gifs/gif5.gif";
import gif6 from "../assets/gifs/gif6.gif";

// Import the list of GIFs
const gifs = [gif1, gif2, gif3, gif4, gif5, gif6];
const random404Message = [
  "The page couldn't handle the power of your mad gaming skills. You broke it!",
  "GameLink.exe process has died!",
  "Oops! It seems this page has gone on a coffee break",
  "It appears you've entered a forbidden cheat code",
  "What are you looking for?",
  "You're not supposed to be here",
<<<<<<< HEAD
  "How did you get here?",
  "Well this is awkward...",
  "Oi! this isnt where you're supposed to be!",
=======
  'How did you get here?',
  'Well this is awkward...',
  'Oh No! Our Page! Its Broken!',
>>>>>>> 263361e6cc755fdad3e56daf17c599ab78f85d19
];

const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const PageNotFound = React.memo(() => {
  const randomGif = useMemo(() => getRandomElement(gifs), []);
  const random404 = useMemo(() => getRandomElement(random404Message), []);

  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen">
        <div
          className="relative flex flex-col items-center justify-center p-10 bg-[rgba(31,41,55,0.4)] border-2 border-black/70 shadow-lg shadow-black dark:shadow-black/10 dark:bg-slate-200/30 rounded-md"
          data-aos="zoom-in-down"
        >
          <div
            id="notfoundnav"
            className="absolute flex justify-between top-0 left-0 px-2 py-1 bg-black/50 dark:bg-gray-200/70 w-full"
          >
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-5 w-auto" />
              <span className="ml-2 text-base text-gray-200 dark:text-gray-800 pointer-events-none">
                GameLink.exe
              </span>
            </Link>
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="text-gray-200 dark:text-gray-800 hover:bg-slate-800 rounded-md"
                viewBox="0 0 16 16"
              >
<<<<<<< HEAD
                {" "}
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />{" "}
=======
                {' '}
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />{' '}
>>>>>>> 263361e6cc755fdad3e56daf17c599ab78f85d19
              </svg>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-200 dark:text-gray-800 mb-2 mt-4">
            404!
          </h1>
          <Link to="/" className="flex items-center mb-4 hover:animate-pulse">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
            <span className="ml-2 text-2xl font-bold text-gray-200 dark:text-gray-800">
              GameLink
            </span>
          </Link>
          <img
            src={randomGif}
            alt="Dang The GIF also got 404!"
            className="m-5 rounded-md text-white text-bold"
          />
          <p className="text-2xl text-gray-300 dark:text-gray-800 mb-5">
            {random404}
          </p>
          <Link
            to="/"
            className="px-4 py-2 rounded-md text-base font-medium bg-gray-800 text-white hover:bg-gray-900"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </main>
  );
});

export default PageNotFound;
