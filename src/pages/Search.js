import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { search } = useParams();
  const apiKey = process.env.REACT_APP_RAWG_API_KEY;

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?search=${search}&ordering=ratings&key=${apiKey}`
        );
        const data = await response.json();
        setSearchResults(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSearchResults();
  }, [search, apiKey]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div>
      <div className="flex justify-center overflow-hidden mb-10">
        <div className="container mt-10">
          <div className="flex flex-col border-box text-white dark:text-gray-800 col overflow-hidden">
            <div className="swiper-container best-of-year">
              <h2 className="text-4xl font-bold mb-5">Search Results</h2>
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 px-4">
                {searchResults && searchResults.length > 0 ? (
                  searchResults.map((game) => (
                    <div key={game.id}>
                      {/* Display game information here */}
                      <div className="card card-games dark:bg-[rgba(230,230,230,0.75)]">
                        <div className="card card-games-overlay"></div>
                        <a href={`/game/${game.slug}/${game.id}`}>
                          <img
                            src={
                              game.background_image ||
                              `https://placehold.co/256/1F2937/FFFFFF?text=${encodeURIComponent(
                                game.name
                              )}&font=roboto`
                            }
                            className={`card card-games-img-top swiper-lazy`}
                            alt="Game"
                            data-src={game.background_image}
                            loading="lazy"
                          />
                        </a>
                        <div
                          className={`absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-[#008000] text-white font-bold text-sm metacritic ${
                            game.metacritic ? "" : "bg-yellow-300 text-black"
                          }`}
                        >
                          {game.metacritic ? game.metacritic : "N"}
                        </div>
                        <div className="card card-games-body frosted-blur">
                          <a href={`./game/${game.slug}/${game.id}`}>
                            <div
                              className={`scrollable-title ${
                                game.name.length > 30 ? "marquee" : ""
                              }`}
                            >
                              <h5
                                className="card card-games-title font-extrabold hover:text-cyan-400 pl-1 rounded"
                                title={game.name}
                              >
                                {game.name}
                              </h5>
                            </div>
                          </a>
                          <p className="card card-games-text">
                            Release Date: {formatDate(game.released)}
                          </p>
                          <p className="card card-games-text">
                            Latest Update: {formatDate(game.updated)}
                          </p>
                          <p className="genre card card-games-text">
                            Genre:{" "}
                            {game.genres.map((genre) => genre.name).join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No results found</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
