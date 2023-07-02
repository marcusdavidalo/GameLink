import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Switch } from "@headlessui/react";
import logo from "./../../assets/logo.png";
import NavigationLinks from "./nav-components/NavigationLinks";
import SearchBar from "./nav-components/SearchBar";
import { ReactComponent as LightIcon } from "./../../assets/icons/sun.svg";
import { ReactComponent as DarkIcon } from "./../../assets/icons/moon.svg";
import axios from "axios";
import jwtDecode from "jwt-decode";

function Nav({ isDarkMode, handleDarkModeToggle, isLoggedIn, setIsLoggedIn }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
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
  const [username, setUsername] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  // Function to handle logging out
  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");

    // Update state to indicate that the user is logged out
    setIsLoggedIn(false);
    setUsername("");
  };

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const fetchUserData = async (
    token,
    setUserId,
    setUsername,
    setIsAdmin,
    setUser
  ) => {
    try {
      // Decode the token to get the user ID
      const decodedToken = jwtDecode(token);
      const id = decodedToken.id;
      setUserId(id);

      const apiKey = process.env.REACT_APP_GAMELINK_DB_KEY;
      const url = `https://api-gamelinkdb.onrender.com/api/users/${id}?apiKey=${apiKey}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update the user state variable with the user data
      setUser(response.data);

      const username = response.data.username;
      setUsername(username);

      // Set admin status based on the user data
      const isAdmin = response.data.admin;
      setIsAdmin(isAdmin);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchUserData(token, setUserId, setUsername, setIsAdmin, setUser);
    }
  }, [setIsLoggedIn]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (userId === null) {
        const token = localStorage.getItem("token");
        if (token) {
          fetchUserData(token, setUserId, setUsername, setIsAdmin);
        }
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [userId]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
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
          !event.target.closest("#profileDropdown"))
      ) {
        setSuggestions([]);
        setShowSuggestions(false);
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
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
        if (query.startsWith("@")) {
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
              console.error("Error fetching user suggestions:", error);
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
              console.error("Error fetching game suggestions:", error);
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
    navigate(`/game/${game.slug}/${game.id}`);
    setSearchQuery("");
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

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  return (
    <header>
      <nav
        className={`static md:fixed top-0 left-0 right-0 flex justify-center pb-40 py-4 sm:py-2 box-content bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)] transition-transform duration-500 z-[9998] ${
          isNavHidden ? "translate-y-[-100%] blur-sm" : ""
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
                <SearchBar
                  handleSearchSubmit={handleSearchSubmit}
                  handleSearchInputChange={handleSearchInputChange}
                  handleGameSelect={handleGameSelect}
                  searchQuery={searchQuery}
                  suggestions={suggestions}
                  searchInputRef={searchInputRef}
                  suggestionsRef={suggestionsRef}
                  navigate={navigate}
                />
              </div>
              <div className="flex items-center md:flex-row flex-col-reverse py-2">
                <div className="flex flex-row items-center">
                  <LightIcon className="h-5 w-5 mx-2 my-2 text-gray-200 dark:text-gray-800" />
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
                  <DarkIcon className="h-5 w-5 mx-2 my-2 text-gray-200 dark:text-gray-800" />
                </div>
                {/* Navigation Links */}
                <NavigationLinks
                  user={user}
                  isLoggedIn={isLoggedIn}
                  toggleDropdown={toggleDropdown}
                  isDropdownOpen={isDropdownOpen}
                  profileDropDownRef={profileDropDownRef}
                  isAdmin={isAdmin}
                  userId={userId}
                  username={username}
                  handleLogout={handleLogout}
                />
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
