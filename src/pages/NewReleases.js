import React, { useState, useEffect } from 'react';
import { Pagination } from 'flowbite-react';
import './NewReleases.css';
import usePageTitle from '../hooks/useTitle';

const NewReleases = () => {
  const apiKey = process.env.REACT_APP_RAWG_API_KEY;
  const [newReleases, setNewReleases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredNewReleases, setFilteredNewReleases] = useState([]);

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
    const ratedRTags = [
      'sexual-content',
      'nsfw',
      'milf',
      'top-nsfw',
      'adult',
      'akabur',
      'your-mom',
      'star-channel-34',
      'adults-only',
    ];
    const ratedRSlugs = [
      'sexual-content',
      'nsfw',
      'milf',
      'top-nsfw',
      'adult',
      'akabur',
      'star-channel-34',
      'adults-only',
      'horos-monster-slayer-and-lover-of-many',
    ];
    const ratedRNames = [
      'Sexual Content',
      'NSFW',
      'Adult',
      'milf',
      'top-nsfw',
      'akabur',
      'your-mom',
      'Star Channel 34',
      'Adults Only',
      'HOROS - monster slayer and lover of many',
    ];

    const updatedGames = newReleases.map((game) => {
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
    setFilteredNewReleases(updatedGames);
  }, [newReleases]);

  useEffect(() => {
    const getNewReleases = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${apiKey}&dates=${newReleasesStartDate},${newReleasesEndDate}&ordering=-released&page=${currentPage}&page_size=20`
        );
        const data = await response.json();
        setNewReleases(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getNewReleases();
  }, [newReleasesStartDate, newReleasesEndDate, apiKey, currentPage]);
  usePageTitle(`GameLink | New Releases`);
  return (
    <div>
      <div className="flex justify-center overflow-hidden mb-10">
        <div className="container mt-10">
          <div className="flex flex-col border-box text-white dark:text-gray-800 col overflow-hidden">
            <div className="swiper-container best-of-year">
              <h2 className="text-4xl font-bold mb-5">New Releases</h2>
              <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 px-4">
                {filteredNewReleases && filteredNewReleases.length > 0 ? (
                  filteredNewReleases.map((game) => (
                    <div key={game.id}>
                      {/* New Releases game cards here */}
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
                            Rated R
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
    </div>
  );
};

export default NewReleases;
