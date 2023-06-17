import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SwiperCore, { Navigation } from 'swiper';
import Swiper from 'swiper';
import usePageTitle from '../hooks/useTitle';

SwiperCore.use([Navigation]);

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
function Home() {
  usePageTitle(`GameLink | Home`);
  useEffect(() => {
    const apiKey = process.env.REACT_APP_RAWG_API_KEY;
    const pageSize = 20;

    // Function to initialize the Swiper slider
    function initializeSwiper(containerSelector, games, swiperSelector) {
      const container = document.querySelector(containerSelector);
      const slider = container.querySelector('.swiper-wrapper');

      games.forEach((game) => {
        if (
          (!game.tags ||
            game.tags.slug !== 'sexual-content' ||
            game.tags.name !== 'Sexual Content') &&
          (!game.tags ||
            game.tags.slug !== 'nsfw' ||
            game.tags.name !== 'NSFW') &&
          (!game.tags ||
            game.tags.slug !== 'adult' ||
            game.tags.name !== 'Adult') &&
          (!game.tags ||
            game.tags.slug !== 'akabur' ||
            game.tags.name !== 'akabur') &&
          (!game.tags ||
            game.tags.slug !== 'your-mom' ||
            game.tags.name !== 'your-mom') &&
          (!game.name ||
            game.slug !== 'star-channel-34' ||
            game.name !== 'Star Channel 34') &&
          (!game.esrb_rating ||
            game.esrb_rating.slug !== 'adults-only' ||
            game.esrb_rating.name !== 'Adults Only')
        ) {
          const slide = document.createElement('div');
          slide.classList.add('swiper-slide');
          slide.setAttribute('data-aos', 'fade-down');
          slide.innerHTML = `
            <div class="card card-games dark:bg-[rgba(230,230,230,0.75)]">
              <div class="card card-games-overlay"></div>
              <a href='./game/${game.slug}/${game.id}'>
              <img src="${
                game.background_image ||
                `https://placehold.co/256/1F2937/FFFFFF?text=${encodeURIComponent(
                  game.name
                )}&font=roboto`
              }" class="card card-games-img-top swiper-lazy" alt=${
            game.name
          } data-src="${
            game.background_image ||
            `https://placehold.co/256/1F2937/FFFFFF?text=${encodeURIComponent(
              game.name
            )}&font=roboto`
          }" />

              </a>
              <div class="metacritic ${
                game.metacritic ? '' : 'no-score'
              }" aria-data="metacritic">
                ${game.metacritic ? game.metacritic : 'N'}
              </div>
              <div class="card card-games-body frosted-blur">
                <a href='./game/${game.slug}/${game.id}'>
                  <div class="scrollable-title ${
                    game.name.length > 30 ? 'marquee' : ''
                  }">
                    <h5 class="card card-games-title font-extrabold hover:text-cyan-400 pl-1 rounded" title="${
                      game.name
                    }">${game.name}</h5>
                  </div>
                </a>
                <p class="card card-games-text">Release Date: ${formatDate(
                  game.released
                )}</p>
                <p class="card card-games-text">Latest Update: ${formatDate(
                  game.updated
                )}</p>
                <p class="genre card card-games-text">Genre: ${game.genres
                  .map((genre) => genre.name)
                  .join(', ')}</p>
              </div>
            </div>
            <div class="swiper-lazy-preloader swiper-lazy-preloader-white animate-spin"></div>
          `;

          slider.appendChild(slide);
        }
      });

      const swiper = new Swiper(containerSelector, {
        slidesPerView: 2,
        spaceBetween: 10,
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
        },
      });

      const prevButton = document.querySelector(
        `${swiperSelector} .custom-prev-button`
      );
      const nextButton = document.querySelector(
        `${swiperSelector} .custom-next-button`
      );

      prevButton.addEventListener('click', () => {
        swiper.slidePrev();
      });

      nextButton.addEventListener('click', () => {
        swiper.slideNext();
      });
    }

    function cacheGameCards(key, games) {
      const cachedData = JSON.stringify(games);
      sessionStorage.setItem(key, cachedData);
    }

    function loadCachedGameCards(key) {
      const cachedData = sessionStorage.getItem(key);
      return JSON.parse(cachedData);
    }

    const cacheKeyBestOfYear = 'bestOfYearGames';
    const cacheKeyNewReleases = 'newReleasesGames';
    const cacheKeyAllTimeTop = 'allTimeTopGames';

    const cachedBestOfYearGames = loadCachedGameCards(cacheKeyBestOfYear);
    const cachedNewReleasesGames = loadCachedGameCards(cacheKeyNewReleases);
    const cachedAllTimeTopGames = loadCachedGameCards(cacheKeyAllTimeTop);

    if (
      cachedBestOfYearGames &&
      cachedNewReleasesGames &&
      cachedAllTimeTopGames
    ) {
      // If game cards are already cached, load them
      initializeSwiper('.best-of-year', cachedBestOfYearGames, '.best-of-year');
      initializeSwiper(
        '.new-releases',
        cachedNewReleasesGames,
        '.new-releases'
      );
      initializeSwiper('.all-time-top', cachedAllTimeTopGames, '.all-time-top');
    } else {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1;
      const currentDay = currentDate.getDate();

      const bestOfYearStartDate = `${currentYear}-01-01`;
      const bestOfYearEndDate = `${currentYear}-${
        currentMonth < 10 ? '0' + currentMonth : currentMonth
      }-${currentDay < 10 ? '0' + currentDay : currentDay}`;

      const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();

      const startMonth =
        currentMonth - 4 > 0 ? currentMonth - 4 : 12 + (currentMonth - 6);
      const startYear = currentMonth - 4 > 0 ? currentYear : currentYear - 1;
      const endMonth = currentMonth;
      const endYear = currentYear;

      const newReleasesStartDate = `${startYear}-${
        startMonth < 10 ? '0' + startMonth : startMonth
      }-01`;
      const newReleasesEndDate = `${endYear}-${
        endMonth < 10 ? '0' + endMonth : endMonth
      }-${lastDayOfMonth}`;

      const bestOfYearURL = `https://api.rawg.io/api/games?key=${apiKey}&dates=${bestOfYearStartDate},${bestOfYearEndDate}&ordering=ratings&page_size=${pageSize}`;
      const newReleasesURL = `https://api.rawg.io/api/games?key=${apiKey}&dates=${newReleasesStartDate},${newReleasesEndDate}&ordering=ratings&page_size=${pageSize}`;
      const allTimeTopURL = `https://api.rawg.io/api/games?key=${apiKey}&ordering=ratings&page_size=${pageSize}`;

      (async () => {
        try {
          const [bestOfYearResponse, newReleasesResponse, allTimeTopResponse] =
            await Promise.all([
              axios.get(bestOfYearURL),
              axios.get(newReleasesURL),
              axios.get(allTimeTopURL),
            ]);
          const bestOfYearGames = bestOfYearResponse.data.results.map(
            (game) => ({
              ...game,
              metacritic: game.metacritic,
              updated: game.updated,
            })
          );

          const filteredBestOfYearGames = bestOfYearGames.filter((game) => {
            const exceptionalRating = game.ratings.find(
              (rating) => rating.title === 'exceptional'
            );
            const recommendedRating = game.ratings.find(
              (rating) => rating.title === 'recommended'
            );
            return (
              exceptionalRating &&
              recommendedRating &&
              game.metacritic &&
              exceptionalRating.count > recommendedRating.count
            );
          });

          const newReleases = newReleasesResponse.data.results.map((game) => ({
            ...game,
            metacritic: game.metacritic,
            updated: game.updated,
          }));

          const allTimeTopGames = allTimeTopResponse.data.results.map(
            (game) => ({
              ...game,
              metacritic: game.metacritic,
              updated: game.updated,
            })
          );

          const filteredAllTimeTopGames = allTimeTopGames.filter((game) => {
            const exceptionalRating = game.ratings.find(
              (rating) => rating.title === 'exceptional'
            );
            const recommendedRating = game.ratings.find(
              (rating) => rating.title === 'recommended'
            );
            return (
              exceptionalRating &&
              recommendedRating &&
              exceptionalRating.count > recommendedRating.count
            );
          });

          initializeSwiper(
            '.best-of-year',
            filteredBestOfYearGames,
            '.best-of-year'
          );
          initializeSwiper('.new-releases', newReleases, '.new-releases');
          initializeSwiper(
            '.all-time-top',
            filteredAllTimeTopGames,
            '.all-time-top'
          );

          // Cache the game cards for future use
          cacheGameCards(cacheKeyBestOfYear, filteredBestOfYearGames);
          cacheGameCards(cacheKeyNewReleases, newReleases);
          cacheGameCards(cacheKeyAllTimeTop, filteredAllTimeTopGames);
        } catch (error) {
          console.error('Error:', error);
        }
      })();
    }
  }, []);

  return (
    <main className="flex justify-center overflow-hidden mb-10">
      <div className="container mt-10">
        <div className="flex flex-col border-box text-white dark:text-gray-800 col overflow-hidden px-4">
          <div className="swiper-container best-of-year">
            <div className="flex justify-between">
              <Link
                to="/best-of-the-year"
                className="border-b-2 border-gray-500 mb-5 pb-5 pr-[100px]"
                title="Games"
              >
                <h2 className="text-4xl font-bold hover:scale-105">
                  Best of the Year
                </h2>
              </Link>
              {/* Swiper Navigations for best of the year swipers */}
              <div className="flex justify-between">
                <button className="custom-prev-button bg-slate-600/50 text-3xl my-4 p-2 h-14 rounded-lg hover:scale-105 hover:bg-slate-600/80 dark:bg-white/60 dark:hover:bg-white/80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="h-8 w-8 font-extrabold antialiased"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </button>
                <button className="custom-next-button bg-slate-600/50 text-3xl p-2 my-4 ml-5 h-14 rounded-lg hover:scale-105 hover:bg-slate-600/80 dark:bg-white/60 dark:hover:bg-white/80 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="h-8 w-8 font-extrabold antialiased"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="swiper-wrapper">
              {/* Best of the Year game cards here */}
            </div>
          </div>

          <div className="swiper-container new-releases mt-10">
            <div className="flex justify-between">
              <Link
                to="/new-releases"
                className="border-b-2 border-gray-500 mb-5 pb-5 pr-[100px]"
                title="Games"
              >
                <h2 className="text-4xl font-bold hover:scale-105">
                  New Releases
                </h2>
              </Link>
              {/* Swiper Navigations for new releases swipers */}
              <div className="flex justify-between items-center">
                <button className="custom-prev-button bg-slate-600/50 text-3xl my-4 p-2 h-14 rounded-lg hover:scale-105 hover:bg-slate-600/80 dark:bg-white/60 dark:hover:bg-white/80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="h-8 w-8 font-extrabold antialiased"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </button>
                <button className="custom-next-button bg-slate-600/50 text-3xl p-2 my-4 ml-5 h-14 rounded-lg hover:scale-105 hover:bg-slate-600/80 dark:bg-white/60 dark:hover:bg-white/80 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="h-8 w-8 font-extrabold antialiased"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="swiper-wrapper">
              {/* New Releases game cards here */}
            </div>
          </div>

          <div className="swiper-container  all-time-top mt-10">
            <div className="flex justify-between">
              <Link
                to="/all-time-top"
                className="border-b-2 border-gray-500 mb-5 pb-5 pr-[100px]"
                title="Games"
              >
                <h2 className="text-4xl font-bold hover:scale-105">
                  All Time Top
                </h2>
              </Link>
              {/* Swiper Navigations for all time top swipers */}
              <div className="flex justify-between">
                <button className="custom-prev-button bg-slate-600/50 text-3xl my-4 p-2 h-14 rounded-lg hover:scale-105 hover:bg-slate-600/80 dark:bg-white/60 dark:hover:bg-white/80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="h-8 w-8 font-extrabold antialiased"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </button>
                <button className="custom-next-button bg-slate-600/50 text-3xl p-2 my-4 ml-5 h-14 rounded-lg hover:scale-105 hover:bg-slate-600/80 dark:bg-white/60 dark:hover:bg-white/80 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    className="h-8 w-8 font-extrabold antialiased"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="swiper-wrapper pb-5">
              {/* All Time Top game cards here */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
