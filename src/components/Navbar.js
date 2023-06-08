import React, { useState, useEffect, useRef, useCallback } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Switch } from "@headlessui/react";
import logo from "../assets/logo.png";
import { ReactComponent as LightIcon } from "../assets/icons/sun.svg";
import { ReactComponent as DarkIcon } from "../assets/icons/moon.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import axios from "axios";

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive, isPending }) =>
        isPending
          ? "ml-2 px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-gray-900 hover:bg-cyan-500  dark:text-gray-800 dark:hover:text-gray-300 dark:hover:bg-cyan-500"
          : isActive
          ? "ml-2 px-3 py-2 rounded-md text-base font-medium text-gray-900 bg-cyan-500  dark:text-gray-200 dark:bg-cyan-500"
          : "ml-2 px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:text-gray-900 hover:bg-cyan-500  dark:text-gray-800 dark:hover:text-gray-300 dark:hover:bg-cyan-500"
      }
    >
      {children}
    </NavLink>
  );
}

function Nav({ isDarkMode, handleDarkModeToggle }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedGame, setSelectedGame] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const suggestionsRef = useRef(null);
  const searchInputRef = useRef(null);
  const timeoutIdRef = useRef(null);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  function handleOutsideClick(event) {
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(event.target) &&
      event.target !== searchInputRef.current
    ) {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }

  const handleSearchInputChange = useCallback((event) => {
    const apiKey = process.env.REACT_APP_RAWG_API_KEY;
    const query = event.target.value;
    setSearchQuery(query);

    if (!event.target.value) {
      setSuggestions([]);
      setShowSuggestions(false);
    } else {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = setTimeout(() => {
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
            console.error("Error fetching game suggestions:", error);
          });
      }, 500);
    }
  }, []);

  function handleGameSelect(game) {
    setSelectedGame(game);
    navigate(`/game/${game.slug}/${game.id}`);
    setSearchQuery("");
    setSuggestions([]);
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollPos < currentScrollPos) {
        setIsNavHidden(true);
      } else {
        setIsNavHidden(false);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 flex justify-center py-2 bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)] transition-transform duration-500 z-[9998] ${
        isNavHidden ? "translate-y-[-100%] blur-sm" : ""
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
              <h1 className="ml-2 text-2xl font-bold text-gray-200 dark:text-gray-800">
                Game
                <span className="text-2xl font-bold text-cyan-500">Link</span>
              </h1>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center flex-grow">
            <form className="w-full mx-5">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search"
                  className="border text-gray-200 bg-[rgba(156,163,175,0.5)] border-gray-500 rounded-md py-2 px-4 pr-10 block w-full focus:outline-none focus:ring-slate-400 focus:border-slate-400 dark:text-gray-800 dark:bg-[rgba(255,255,255,0.7)] sm:text-sm"
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
              {showSuggestions && suggestions.length > 0 && (
                <ul
                  ref={suggestionsRef}
                  id="suggestions"
                  className="absolute items-center bg-slate-700/80 backdrop-blur-[2px] border border-gray-200/60 rounded-md z-10"
                >
                  {suggestions.map((game) => (
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
                          <span className="font-semibold">Release Date: </span>
                          {game.releaseDate}
                        </p>
                        <p className="text-slate-300">
                          <span className="font-semibold">Rating: </span>{" "}
                          {game.rating}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </form>
          </div>
          <div className="flex">
            <LightIcon className="h-5 w-5 mx-2 text-gray-200 dark:text-gray-800" />
            <Switch
              checked={isDarkMode}
              onChange={handleDarkModeToggle}
              className={`${
                isDarkMode ? "bg-slate-600" : "bg-gray-400"
              } relative inline-flex items-center h-6 rounded-full w-11`}
            >
              <span
                className={`${
                  isDarkMode ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full`}
              />
            </Switch>
            <DarkIcon className="h-5 w-5 mx-2 text-gray-200 dark:text-gray-800" />
          </div>

          {/* Navigation Links */}
          <div className="flex">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/about">About</NavItem>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
