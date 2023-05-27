import React, { useEffect } from 'react';
import axios from 'axios';
import Swiper from 'swiper';
import 'swiper/css';
import './Index.css';

function Index() {
  useEffect(() => {
    const apiKey = '9d2a05428ec1467e83df95314e32b77b';
    const pageSize = 10;

    // Function to initialize the Swiper slider
    function initializeSwiper(containerSelector, games) {
      const container = document.querySelector(containerSelector);
      const slider = container.querySelector('.swiper-wrapper');

      games.forEach((game, index) => {
        if (
          !game.tags.some((tag) => tag.name === 'adult' || tag.name === 'Adult')
        ) {
          const slide = document.createElement('div');
          slide.className = 'swiper-slide';
          slide.innerHTML = `
            <div class="card">
              <div class="card-overlay"></div>
              <a href='./game-details?id=${game.id}'>
                <img src="${
                  game.background_image
                }" class="card-img-top swiper-lazy" alt="Game Image" data-src="${
            game.background_image
          }" loading="lazy"/>
              </a>
              <div class="metacritic ${
                game.metacritic ? '' : 'no-score'
              }" aria-data="metacritic">
                ${game.metacritic ? game.metacritic : 'N'}
              </div>
              <div class="card-body frosted-blur">
                <h5 class="card-title font-extrabold">${game.name}</h5>
                <p class="card-text">Release Date: ${formatDate(
                  game.released
                )}</p>
                <p class="card-text">Latest Update: ${formatDate(
                  game.updated
                )}</p>
                <p class="genre card-text">Genre: ${game.genres
                  .map((genre) => genre.name)
                  .join(', ')}</p>
              </div>
            </div>
            <div className="swiper-lazy-preloader"></div>
          `;

          slider.appendChild(slide);
        }
      });

      // eslint-disable-next-line no-unused-vars
      const swiper = new Swiper(containerSelector, {
        slidesPerView: 1,
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
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }

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

    const bestOfYearURL = `https://api.rawg.io/api/games/lists/popular?key=${apiKey}&dates=${bestOfYearStartDate},${bestOfYearEndDate}&ordering=-rating&page_size=${pageSize}`;
    const newReleasesURL = `https://api.rawg.io/api/games?key=${apiKey}&dates=${newReleasesStartDate},${newReleasesEndDate}&ordering=-released&page_size=${pageSize}`;
    const allTimeTopURL = `https://api.rawg.io/api/games?key=${apiKey}&ordering=-rating&page_size=${pageSize}`;

    axios
      .all([
        axios.get(bestOfYearURL),
        axios.get(newReleasesURL),
        axios.get(allTimeTopURL),
      ])
      .then(
        axios.spread(
          (bestOfYearResponse, newReleasesResponse, allTimeTopResponse) => {
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

            const newReleases = newReleasesResponse.data.results.map(
              (game) => ({
                ...game,
                metacritic: game.metacritic,
                updated: game.updated,
              })
            );

            const filteredNewReleases = newReleases.filter((game) => {
              return !game.tags.some(
                (tag) => tag.name.toLowerCase() === 'adult'
              );
            });

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
                game.metacritic &&
                exceptionalRating.count > recommendedRating.count
              );
            });

            initializeSwiper('.best-of-year', filteredBestOfYearGames);
            initializeSwiper('.new-releases', filteredNewReleases);
            initializeSwiper('.all-time-top', filteredAllTimeTopGames);
          }
        )
      )
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="flex justify-center overflow-hidden mb-10">
      <div className="container mt-10">
        <div className="flex flex-col border-box text-white col overflow-hidden">
          <div className="swiper-container best-of-year">
            <h2 className="text-2xl font-bold mb-4">Best of the Year</h2>
            <div className="swiper-wrapper">
              {/* Best of the Year game cards here */}
            </div>
            {/* Navs */}
            {/* <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div> */}
          </div>

          <div className="swiper-container  new-releases mt-10">
            <h2 className="text-2xl font-bold mb-4">New Releases</h2>
            <div className="swiper-wrapper">
              {/* New Releases game cards here */}
            </div>
            {/* Navs */}
            {/* <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div> */}
          </div>

          <div className="swiper-container  all-time-top mt-10">
            <h2 className="text-2xl font-bold font mb-4">All Time Top</h2>
            <div className="swiper-wrapper pb-5">
              {/* All Time Top game cards here */}
            </div>
            {/* Navs */}
            {/* <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
