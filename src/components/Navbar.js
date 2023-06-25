import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Switch } from '@headlessui/react';
import logo from '../assets/logo.png';
import { ReactComponent as LightIcon } from '../assets/icons/sun.svg';
import { ReactComponent as DarkIcon } from '../assets/icons/moon.svg';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive, isPending }) =>
        isPending
          ? 'ml-2 px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-gray-900 hover:bg-cyan-500  dark:text-gray-800 dark:hover:text-gray-300 dark:hover:bg-cyan-500'
          : isActive
          ? 'ml-2 px-3 py-2 rounded-md text-base font-medium text-gray-900 bg-cyan-500  dark:text-gray-200 dark:bg-cyan-500'
          : 'ml-2 px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-gray-900 hover:bg-cyan-500  dark:text-gray-800 dark:hover:text-gray-300 dark:hover:bg-cyan-500'
      }
    >
      {children}
    </NavLink>
  );
}

function Nav({ isDarkMode, handleDarkModeToggle, isLoggedIn, setIsLoggedIn }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedGame, setSelectedGame] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const suggestionsRef = useRef(null);
  const searchInputRef = useRef(null);
  const timeoutIdRef = useRef(null);
  const profileDropDownRef = useRef(null);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  // Function to handle logging out
  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');

    // Update state to indicate that the user is logged out
    setIsLoggedIn(false);
    setUsername('');
  };

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);

      const fetchUserData = async () => {
        try {
          // Decode the token to get the user ID
          const decodedToken = jwtDecode(token);
          setUserId(decodedToken.id);

          const apiKey = process.env.REACT_APP_GAMELINK_DB_KEY;
          const url = `https://api-gamelinkdb.onrender.com/api/users/${userId}?apiKey=${apiKey}`;
          const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const username = response.data.username;
          setUsername(username);

          // Set admin status based on the user data
          const isAdmin = response.data.admin;
          setIsAdmin(isAdmin);
        } catch (error) {
          console.log(error);
        }
      };

      fetchUserData();
    }
  }, [userId, setIsLoggedIn]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        (suggestionsRef.current &&
          !suggestionsRef.current.contains(event.target) &&
          event.target !== searchInputRef.current &&
          showSuggestions) ||
        (profileDropDownRef.current &&
          !profileDropDownRef.current.contains(event.target) &&
          !event.target.closest('#profileDropdown'))
      ) {
        setSuggestions([]);
        setShowSuggestions(false);
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showSuggestions]);

  const handleSearchInputChange = useCallback((event) => {
    const apiKey = process.env.REACT_APP_RAWG_API_KEY;
    const dbKey = process.env.REACT_APP_GAMELINK_DB_KEY;
    const query = event.target.value;
    setSearchQuery(query);

    if (!event.target.value) {
      setSuggestions([]);
      setShowSuggestions(false);
    } else {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = setTimeout(() => {
        if (query.startsWith('@')) {
          const usernameQuery = query.slice(1);
          axios
            .get(
              `https://api-gamelinkdb.onrender.com/api/users?apiKey=${dbKey}`
            )
            .then((response) => {
              const users = response.data.filter(
                (user) =>
                  user.username
                    .toLowerCase()
                    .indexOf(usernameQuery.toLowerCase()) !== -1
              );
              setSuggestions(users);
              setShowSuggestions(true);
            })
            .catch((error) => {
              console.error('Error fetching user suggestions:', error);
            });
        } else {
          axios
            .get(
              `https://api.rawg.io/api/games?key=${apiKey}&search=${query}&page_size=6`
            )
            .then((response) => {
              const games = response.data.results.map((game) => ({
                id: game.id,
                slug: game.slug,
                name: game.name,
                image: game.background_image,
                releaseDate: game.released,
                rating: game.rating,
              }));
              setSuggestions(games);
              setShowSuggestions(true);
            })
            .catch((error) => {
              console.error('Error fetching game suggestions:', error);
            });
        }
      }, 200);
    }
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/search/${searchQuery}`);
  };

  function handleGameSelect(game) {
    setSelectedGame(game);
    navigate(`/game/${game.slug}/${game.id}`);
    setSearchQuery('');
    setSuggestions([]);
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      // Only update isNavHidden state if screen width is above 768px
      if (window.innerWidth > 768) {
        if (prevScrollPos < currentScrollPos) {
          setIsNavHidden(true);
        } else {
          setIsNavHidden(false);
        }
      }
      setPrevScrollPos(currentScrollPos);
      setShowBackToTop(currentScrollPos > 200);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <header>
      <nav
        className={`static md:fixed top-0 left-0 right-0 flex justify-center pb-40 py-4 sm:py-2 box-content bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)] transition-transform duration-500 z-[9998] ${
          isNavHidden ? 'translate-y-[-100%] blur-sm' : ''
        }`}
      >
        <div className="container">
          <div className="flex flex-col md:flex-row items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="Logo" className="h-8 w-auto" />
                <h1 className="ml-2 text-2xl font-bold text-gray-200 dark:text-gray-800">
                  Play
                  <span className="text-2xl font-bold text-cyan-500">
                    KoDex
                  </span>
                </h1>
              </Link>
            </div>

            <div className="flex items-center justify-end flex-col sm:flex-row w-full">
              {/* Search Bar */}
              <div className="flex justify-center flex-grow">
                <form
                  onSubmit={handleSearchSubmit}
                  className="w-full mx-5 my-2"
                >
                  <div className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search for games by typing in the game name, or search for users by typing in @user"
                      className="border placeholder-slate-400 text-gray-200 bg-[rgba(156,163,175,0.5)] border-gray-500 rounded-md py-2 px-4 pr-10 block w-full focus:outline-none focus:ring-slate-400 focus:border-slate-400 dark:text-gray-800 dark:bg-[rgba(255,255,255,0.7)] sm:text-sm"
                      value={searchQuery}
                      onChange={handleSearchInputChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <SearchIcon
                        className="h-5 w-5 text-slate-200 dark:text-slate-800"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                  <ul
                    ref={suggestionsRef}
                    id="suggestions"
                    className="absolute overflow-visible items-center bg-slate-700/80 backdrop-blur-[2px] border border-gray-200/60 rounded-md z-[999]"
                  >
                    {searchQuery.startsWith('@')
                      ? suggestions.map((user) => (
                          <li
                            key={user.id}
                            className="grid grid-cols-3 items-center px-4 hover:bg-slate-600/80 cursor-pointer"
                            onClick={() => navigate(`/profile/${user._id}`)}
                          >
                            {user.avatarUrl ? (
                              <img
                                src={user.avatarUrl}
                                alt="Avatar"
                                className="w-10 h-10 my-2 rounded-full"
                              />
                            ) : (
                              <div className="flex justify-center font-extrabold text-5xl text-slate-400/60 items-center align-middle w-10 h-10 my-2 rounded-full bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)] border-2 border-[rgba(255,255,255,0.75)] dark:border-[rgba(31,41,55,0.5)]">
                                ?
                              </div>
                            )}
                            <h3 className="text-slate-200 font-bold border-x-2 border-slate-500/80 px-5">
                              {user.username}
                            </h3>
                          </li>
                        ))
                      : suggestions.map((game) => (
                          <li
                            key={game.id}
                            className="grid grid-cols-3 items-center px-4 py-2 hover:bg-slate-600/80 cursor-pointer"
                            onClick={() => handleGameSelect(game)}
                          >
                            <img
                              src={game.image}
                              alt={game.name}
                              className="w-20 h-20 object-cover rounded-md mr-2"
                            />
                            <h3 className="text-slate-200 font-bold border-x-2 border-slate-500/80 px-5 py-5">
                              {game.name}
                            </h3>
                            <div className="px-5">
                              <p className="text-slate-300">
                                <span className="font-semibold">
                                  Release Date:{' '}
                                </span>
                                {game.releaseDate}
                              </p>
                              <p className="text-slate-300">
                                <span className="font-semibold">Rating: </span>{' '}
                                {game.rating}
                              </p>
                            </div>
                          </li>
                        ))}
                  </ul>
                </form>
              </div>
              <div className="flex items-center md:flex-row flex-col-reverse py-2">
                <div className="flex flex-row items-center">
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
                {/* Navigation Links */}
                <div className="flex py-2">
                  <NavItem to="/">Home</NavItem>
                  <NavItem to="/about">About</NavItem>

                  {/* Sign Up button */}
                  {!isLoggedIn && (
                    <NavItem to="/register" className="whitespace-nowrap">
                      Sign Up
                    </NavItem>
                  )}

                  {/* Logged-in user menu */}
                  {isLoggedIn && (
                    <div className="relative ml-2">
                      <button
                        onClick={toggleDropdown}
                        className="px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-gray-900 hover:bg-cyan-500  dark:text-gray-800 dark:hover:text-gray-300 dark:hover:bg-cyan-500"
                      >
                        Hello, {username}
                      </button>

                      {isDropdownOpen && (
                        <ul
                          ref={profileDropDownRef}
                          id="profileDropdown"
                          className="absolute right-0 mt-2 py-1 w-[200px] bg-slate-700/80 backdrop-blur-[2px] border border-gray-200/60 rounded-md shadow-lg z-[999]"
                        >
                          <li>
                            <Link
                              to={`/profile/${userId}`}
                              className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-600/80"
                            >
                              My Profile
                            </Link>
                          </li>
                          {isAdmin && (
                            <li>
                              <Link
                                to="/admin"
                                className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-600/80"
                              >
                                Admin Dashboard
                              </Link>
                            </li>
                          )}
                          {/* <li>
                            <Link
                              to="/messages"
                              className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-600/80"
                            >
                              Messages
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/notifications"
                              className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-600/80"
                            >
                              Notifications
                            </Link>
                          </li> */}
                          <li>
                            <Link
                              to="/settings"
                              className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-600/80"
                            >
                              Settings
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/help"
                              className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-600/80"
                            >
                              Help & Support
                            </Link>
                          </li>
                          <li>
                            <button
                              onClick={handleLogout}
                              className="block w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-600/80"
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div id="navspacer" className="py-28 absolute md:static sm:py-10"></div>
      {showBackToTop && (
        <button
          className="fixed bottom-4 right-4 p-2 bg-cyan-500 text-white rounded-full shadow-md hover:bg-gray-700 z-[10000]"
          onClick={handleScrollToTop}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </header>
  );
}

export default Nav;
