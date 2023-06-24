import React, { useState, useEffect } from 'react';
import { Pagination } from 'flowbite-react';
import usePageTitle from '../hooks/useTitle';

const BestOfYear = () => {
  const apiKey = process.env.REACT_APP_RAWG_API_KEY;
  const [bestOfYear, setBestOfYear] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredBestOfYear, setFilteredBestOfYear] = useState([]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const bestOfYearStartDate = `${currentYear}-01-01`;
  const bestOfYearEndDate = `${currentYear}-${
    currentMonth < 10 ? '0' + currentMonth : currentMonth
  }-${currentDay < 10 ? '0' + currentDay : currentDay}`;

  useEffect(() => {
    const explicitContentFilters = require('../json/explicitContentFilters.json');
    const ratedRTags = [...explicitContentFilters.tags];
    const ratedRSlugs = [...explicitContentFilters.slugs];
    const ratedRNames = [...explicitContentFilters.names];

    const updatedGames = bestOfYear.map((game) => {
      let isRatedR = false;
      if (game.tags && ratedRTags.includes(game.tags.slug)) {
        isRatedR = true;
      }
      if (game.slug && ratedRSlugs.includes(game.slug)) {
        isRatedR = true;
      }
      if (game.name && ratedRNames.includes(game.name)) {
        isRatedR = true;
      }
      if (game.esrb_rating && ratedRSlugs.includes(game.esrb_rating.slug)) {
        isRatedR = true;
      }
      return { ...game, isRatedR };
    });
    setFilteredBestOfYear(updatedGames);
  }, [bestOfYear]);

  useEffect(() => {
    const getBestOfYear = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/lists/popular?key=${apiKey}&dates=${bestOfYearStartDate},${bestOfYearEndDate}&ordering=ratings&page=${currentPage}&page_size=20`
        );
        console.log(response);
        const data = await response.json();
        setBestOfYear(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getBestOfYear();
  }, [bestOfYearStartDate, bestOfYearEndDate, apiKey, currentPage]);
  usePageTitle(`GameLink | Best Of ${currentYear}`);
  return (
    <div>
      <div className="flex justify-center overflow-hidden mb-10">
        <div className="container mt-10">
          <div className="flex flex-col border-box text-white dark:text-gray-800 col overflow-hidden">
            <h2 className="text-4xl font-bold mb-5">Best of the Year</h2>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 px-4">
              {filteredBestOfYear && filteredBestOfYear.length > 0 ? (
                filteredBestOfYear.map((game) => (
                  <div key={game.id}>
                    {/* Best of the Year game cards here */}
                    <div className="card card-games dark:bg-[rgba(230,230,230,0.75)]">
                      <div className="card card-games-overlay"></div>
                      <a href={`./game/${game.slug}/${game.id}`}>
                        <img
                          src={
                            game.background_image ||
                            `https://placehold.co/256/1F2937/FFFFFF?text=${encodeURIComponent(
                              game.name
                            )}&font=roboto`
                          }
                          className={`card card-games-img-top swiper-lazy ${
                            game.isRatedR ? 'blur-lg bg-blend-darken' : ''
                          }`}
                          alt="Game"
                          data-src={game.background_image}
                          loading="lazy"
                        />
                      </a>
                      {game.isRatedR && (
                        <div className="absolute top-2 left-2 bg-red-600/90 text-xl px-3 py-[1px] rounded-sm skew-x-[-12deg] font-bold">
                          18+
                        </div>
                      )}
                      <div
                        className={`metacritic ${
                          game.metacritic ? '' : 'no-score'
                        }`}
                      >
                        {game.metacritic ? game.metacritic : 'N'}
                      </div>
                      <div className="card card-games-body frosted-blur">
                        <a href={`./game/${game.slug}/${game.id}`}>
                          <div
                            className={`scrollable-title ${
                              game.name.length > 30 ? 'marquee' : ''
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
                          Genre:{' '}
                          {game.genres.map((genre) => genre.name).join(', ')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="classic flex items-center justify-center align-baseline absolute top-0 left-0 h-screen w-screen text-white text-5xl bg-transparent backdrop-blur-lg animate-pulse z-[9999] dark:text-gray-800">
                  Loading...
                </div>
              )}
            </div>
          </div>
          <Pagination
            className="flex justify-center my-2 h-10 dark"
            currentPage={currentPage}
            totalPages={50}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BestOfYear;
