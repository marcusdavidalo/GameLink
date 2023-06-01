import React, { useState, useEffect } from 'react';
import './NewReleases.css';

const NewReleases = () => {
  const apiKey = '9d2a05428ec1467e83df95314e32b77b';
  const [newReleases, setNewReleases] = useState([]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();

  const startMonth =
    currentMonth - 4 > 0 ? currentMonth - 4 : 12 + (currentMonth - 4);
  const startYear = currentMonth - 4 > 0 ? currentYear : currentYear - 1;
  const endMonth = currentMonth;
  const endYear = currentYear;

  const newReleasesStartDate = `${startYear}-${
    startMonth < 10 ? '0' + startMonth : startMonth
  }-01`;
  const newReleasesEndDate = `${endYear}-${
    endMonth < 10 ? '0' + endMonth : endMonth
  }-${lastDayOfMonth}`;

  useEffect(() => {
    const getNewReleases = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${apiKey}&dates=${newReleasesStartDate},${newReleasesEndDate}&ordering=-released`
        );
        const data = await response.json();
        setNewReleases(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getNewReleases();
  }, [newReleasesStartDate, newReleasesEndDate]);

  return (
    <div>
      <div className="flex justify-center overflow-hidden mb-10">
        <div className="container mt-10">
          <div className="flex flex-col border-box text-white dark:text-gray-800 col overflow-hidden">
            <div className="swiper-container best-of-year">
              <h2 className="text-4xl font-bold mb-5">New Releases</h2>
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 px-4">
                {newReleases.map((game) => (
                  <div key={game.id}>
                    {/* New Releases game cards here */}
                    <div className="card card-games dark:bg-[rgba(230,230,230,0.75)]">
                      <div className="card card-games-overlay"></div>
                      <a href={`./game?id=${game.id}`}>
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
                          game.metacritic ? '' : 'no-score'
                        }`}
                      >
                        {game.metacritic ? game.metacritic : 'N'}
                      </div>
                      <div className="card card-games-body frosted-blur">
                        <a href={`./game?id=${game.id}`}>
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
                    <div className="swiper-lazy-preloader"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewReleases;
