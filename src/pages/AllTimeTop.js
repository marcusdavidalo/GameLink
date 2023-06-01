import React, { useState, useEffect } from 'react';
import './AllTimeTop.css';

const AllTimeTop = () => {
  const apiKey = '9d2a05428ec1467e83df95314e32b77b';
  const [allTimeTop, setAllTimeTop] = useState([]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  useEffect(() => {
    const getAllTimeTop = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${apiKey}&ordering=-rating`
        );
        const data = await response.json();
        setAllTimeTop(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getAllTimeTop();
  }, []);

  return (
    <div>
      <div className="flex justify-center overflow-hidden mb-10">
        <div className="container mt-10">
          <div className="flex flex-col border-box text-white dark:text-gray-800 col overflow-hidden">
            <div className="swiper-container best-of-year">
              <h2 className="text-4xl font-bold mb-5">Best of the Year</h2>
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 px-4">
                {allTimeTop.map((game) => (
                  <div key={game.id}>
                    {/* Best of the Year game cards here */}
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

export default AllTimeTop;
