import React from 'react'
import { NavLink } from "react-router-dom";

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

export default NavItem