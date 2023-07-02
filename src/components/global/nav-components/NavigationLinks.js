import React from "react";
import NavItem from "./NavItem";
import { Link } from "react-router-dom";

const NavigationLinks = ({
  user,
  isLoggedIn,
  toggleDropdown,
  isDropdownOpen,
  profileDropDownRef,
  isAdmin,
  userId,
  username,
  handleLogout,
}) => {
  return (
    <>
      <div className="flex py-2 align-center items-center">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/about">About</NavItem>

        {/* Sign Up button */}
        {!isLoggedIn && (
          <NavItem to="/register" className="whitespace-nowrap">
            Sign Up
          </NavItem>
        )}
        {!isLoggedIn && (
          <NavItem to="/login" className="whitespace-nowrap">
            Sign In
          </NavItem>
        )}

        {/* Logged-in user menu */}
        {isLoggedIn && (
          <div className="relative ml-2">
            <button
              onClick={toggleDropdown}
              className="px-3 py-2 rounded-md hover:scale-105"
            >
              <div className="flex flex-col align-center items-center">
                {user && user.avatar ? (
                  <div className="w-10 h-10 rounded-full bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)] border-2 border-[rgba(255,255,255,0.75)] dark:border-[rgba(31,41,55,0.5)] cursor-pointer relative overflow-hidden">
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="object-cover w-full h-full transition-transform hover:scale-110"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center align-center  font-extrabold text-3xl text-slate-400/60 items-center align-middle w-10 h-10 rounded-full bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)] border-2 border-[rgba(255,255,255,0.75)] dark:border-[rgba(31,41,55,0.5)]">
                    ?
                  </div>
                )}
                <p className="text-2xl font-semibold mt-2"></p>
              </div>
            </button>

            {isDropdownOpen && (
              <ul
                ref={profileDropDownRef}
                id="profileDropdown"
                className="absolute right-0 mt-2 py-1 w-[200px] bg-slate-700/80 backdrop-blur-[2px] border border-gray-200/60 rounded-md shadow-lg z-[999]"
              >
                <li>
                  <Link
                    to={`/profile/${userId}/${username}`}
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
    </>
  );
};

export default NavigationLinks;
