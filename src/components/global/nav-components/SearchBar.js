import React from "react";
import { ReactComponent as SearchIcon } from "./../../../assets/icons/search.svg";

const SearchBar = ({
  handleSearchSubmit,
  handleSearchInputChange,
  handleGameSelect,
  searchQuery,
  suggestions,
  searchInputRef,
  suggestionsRef,
  navigate,
}) => {
  return (
    <>
      <form onSubmit={handleSearchSubmit} className="w-full mx-5 my-2">
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
          {searchQuery.startsWith("@")
            ? suggestions.map((user) => (
                <li
                  key={user.id}
                  className="grid grid-cols-3 items-center px-4 hover:bg-slate-600/80 cursor-pointer"
                  onClick={() =>
                    navigate(`/profile/${user._id}/${user.username}`)
                  }
                >
                  {user.avatar ? (
                    <div className="w-10 h-10 rounded-full bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)] border-2 border-[rgba(255,255,255,0.75)] dark:border-[rgba(31,41,55,0.5)] cursor-pointer relative overflow-hidden">
                      <img
                        src={user.avatar}
                        alt="Avatar"
                        className="object-cover w-full h-full transition-transform hover:scale-110"
                      />
                    </div>
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
      </form>
    </>
  );
};

export default SearchBar;
