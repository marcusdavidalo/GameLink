import React, { useState, useEffect } from "react";
import { Pagination } from "flowbite-react";
import "./AllTimeTop.css";

const AllTimeTop = () => {
  const apiKey = process.env.REACT_APP_RAWG_API_KEY;
  const [allTimeTop, setAllTimeTop] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredAllTimeTop, setFilteredAllTimeTop] = useState([]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  useEffect(() => {
    const filteredGames = allTimeTop.filter(
      (game) =>
        (!game.tags ||
          game.tags.slug !== "sexual-content" ||
          game.tags.name !== "Sexual Content") &&
        (!game.tags ||
          game.tags.slug !== "nsfw" ||
          game.tags.name !== "NSFW") &&
        (!game.tags ||
          game.tags.slug !== "adult" ||
          game.tags.name !== "Adult") &&
        (!game.tags ||
          game.tags.slug !== "akabur" ||
          game.tags.name !== "akabur") &&
        (!game.tags ||
          game.tags.slug !== "your-mom" ||
          game.tags.name !== "your-mom") &&
        (!game.name ||
          game.slug !== "star-channel-34" ||
          game.name !== "Star Channel 34") &&
        (!game.esrb_rating ||
          game.esrb_rating.slug !== "adults-only" ||
          game.esrb_rating.name !== "Adults Only")
    );
    setFilteredAllTimeTop(filteredGames);
  }, [allTimeTop]);

  useEffect(() => {
    const getAllTimeTop = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${apiKey}&ordering=-rating&page=${currentPage}&page_size=20`
        );
        console.log(response);
        const data = await response.json();
        setAllTimeTop(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getAllTimeTop();
  }, [apiKey, currentPage]);

  return (
    <div>
      <div className="flex justify-center overflow-hidden mb-10">
        <div className="container mt-10">
          <div className="flex flex-col border-box text-white dark:text-gray-800 col overflow-hidden">
            <div className="swiper-container best-of-year">
              <h2 className="text-4xl font-bold mb-5">All Time Top</h2>
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 px-4">
                {filteredAllTimeTop && filteredAllTimeTop.length > 0 ? (
                  filteredAllTimeTop.map((game) => (
                    <div key={game.id}>
                      {/* All time top game cards here */}
                      <div className="card card-games dark:bg-[rgba(230,230,230,0.75)]">
                        <div className="card card-games-overlay"></div>
                        <a href={`./game/${game.slug}/${game.id}`}>
                          <img
                            src={game.background_image}
                            className="card card-games-img-top swiper-lazy"
                            alt="Game"
                            data-src={game.background_image}
                            loading="lazy"
                          />
                        </a>
                        <div
                          className={`metacritic ${
                            game.metacritic ? "" : "no-score"
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
                  <p>Loading...</p>
                )}
              </div>
            </div>
            <Pagination
              className="flex justify-center mt-2 h-10 dark"
              currentPage={currentPage}
              totalPages={50}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTimeTop;
