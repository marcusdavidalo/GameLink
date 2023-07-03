import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import SwiperCore, { Navigation } from "swiper";
import Swiper from "swiper";
import { ReactComponent as Heart } from "./../../assets/icons/heart.svg";
import { ReactComponent as HeartFilled } from "./../../assets/icons/heartfilled.svg";
import jwtDecode from "jwt-decode";

SwiperCore.use([Navigation]);

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: "long", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

function AllTimeTop() {
  const [allTimeTopGames, setAllTimeTopGames] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_RAWG_API_KEY;
    const pageSize = 20;

    // Function to initialize the Swiper slider
    function initializeSwiper(containerSelector, swiperSelector) {
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
        navigation: {
          nextEl: `${swiperSelector} .all-time-top-custom-next-button`,
          prevEl: `${swiperSelector} .all-time-top-custom-prev-button`,
        },
      });

      const prevButton = document.querySelector(
        `${swiperSelector} .all-time-top-custom-prev-button`
      );
      const nextButton = document.querySelector(
        `${swiperSelector} .all-time-top-custom-next-button`
      );

      if (prevButton) {
        prevButton.addEventListener("click", () => {
          swiper.slidePrev();
        });
      }

      if (nextButton) {
        nextButton.addEventListener("click", () => {
          swiper.slideNext();
        });
      }
    }

    function cacheGameCards(key, games) {
      const cachedData = JSON.stringify(games);
      sessionStorage.setItem(key, cachedData);
    }

    function loadCachedGameCards(key) {
      const cachedData = sessionStorage.getItem(key);
      return JSON.parse(cachedData);
    }

    const cacheKeyAllTimeTop = "allTimeTopGames";

    const cachedAllTimeTopGames = loadCachedGameCards(cacheKeyAllTimeTop);

    if (cachedAllTimeTopGames) {
      // If game cards are already cached, load them
      setAllTimeTopGames(cachedAllTimeTopGames);

      initializeSwiper(".all-time-top", ".all-time-top");
    } else {
      const allTimeTopURL = `https://api.rawg.io/api/games?key=${apiKey}&ordering=ratings&page_size=${pageSize}`;

      (async () => {
        try {
          const [allTimeTopResponse] = await Promise.all([
            axios.get(allTimeTopURL),
          ]);

          const allTimeTopGames = allTimeTopResponse.data.results.map(
            (game) => ({
              ...game,
              metacritic: game.metacritic,
              updated: game.updated,
            })
          );

          const filteredAllTimeTopGames = allTimeTopGames.filter((game) => {
            const exceptionalRating = game.ratings.find(
              (rating) => rating.title === "exceptional"
            );
            const recommendedRating = game.ratings.find(
              (rating) => rating.title === "recommended"
            );
            return (
              exceptionalRating &&
              recommendedRating &&
              exceptionalRating.count > recommendedRating.count
            );
          });

          setAllTimeTopGames(filteredAllTimeTopGames);

          initializeSwiper(".all-time-top", ".all-time-top");

          // Cache the game cards for future use
          cacheGameCards(cacheKeyAllTimeTop, filteredAllTimeTopGames);
        } catch (error) {
          console.error("Error:", error);
        }
      })();
    }
  }, []);

  const addGameToWishlist = async (userId, gameId) => {
    try {
      await fetch(
        `https://api-gamelinkdb.onrender.com/api/users/${userId}/addGameToWishlist?apiKey=${process.env.REACT_APP_GAMELINK_DB_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gameId }),
        }
      );
      setWishlist([...wishlist, gameId]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeGameFromWishlist = async (userId, gameId) => {
    try {
      await fetch(
        `https://api-gamelinkdb.onrender.com/api/users/${userId}/removeGameFromWishlist?apiKey=${process.env.REACT_APP_GAMELINK_DB_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gameId }),
        }
      );
      setWishlist(wishlist.filter((id) => id !== gameId));
    } catch (error) {
      console.log(error);
    }
  };

  // Updated handleWishlist function to use the separate add and remove functions
  const handleWishlist = async (gameId) => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      if (wishlist.includes(gameId)) {
        removeGameFromWishlist(userId, gameId);
      } else {
        addGameToWishlist(userId, gameId);
      }
    }
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        try {
          const response = await fetch(
            `https://api-gamelinkdb.onrender.com/api/users/${userId}?apiKey=${process.env.REACT_APP_GAMELINK_DB_KEY}`
          );
          const data = await response.json();
          setWishlist(data.wishlist);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchWishlist();
  }, []);

  return (
    <div className="swiper-container all-time-top">
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
          <button className="all-time-top-custom-prev-button bg-slate-600/50 text-3xl my-4 p-2 h-14 rounded-lg hover:scale-105 hover:bg-slate-600/80 dark:bg-white/60 dark:hover:bg-white/80">
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
          <button className="all-time-top-custom-next-button bg-slate-600/50 text-3xl p-2 my-4 ml-5 h-14 rounded-lg hover:scale-105 hover:bg-slate-600/80 dark:bg-white/60 dark:hover:bg-white/80 ">
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
        {allTimeTopGames.map((game, index) => {
          const delay = (index + 1) * 100;
          return (
            <div
              key={game.id}
              className="swiper-slide"
              data-aos="fade-down"
              data-aos-delay={delay.toString()}
            >
              <div className="card card-games dark:bg-[rgba(230,230,230,0.75)]">
                <div className="card card-games-overlay"></div>
                <Link to={`./game/${game.slug}/${game.id}`}>
                  <img
                    src={
                      game.background_image ||
                      `https://placehold.co/256/1F2937/FFFFFF?text=${encodeURIComponent(
                        game.name
                      )}&font=roboto`
                    }
                    className="card card-games-img-top swiper-lazy"
                    alt={game.name}
                    data-src={
                      game.background_image ||
                      `https://placehold.co/256/1F2937/FFFFFF?text=${encodeURIComponent(
                        game.name
                      )}&font=roboto`
                    }
                  />
                </Link>
                <div
                  className={`absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-[#008000] text-white font-bold text-sm metacritic ${
                    game.metacritic ? "" : "bg-yellow-300 text-black"
                  }`}
                >
                  {game.metacritic ? game.metacritic : "N"}
                </div>
                <div
                  className={`absolute top-3 left-3 flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-sm cursor-pointer`}
                  onClick={() => handleWishlist(game.id)}
                  width="32"
                  height="32"
                >
                  {wishlist.includes(game.id) ? (
                    <HeartFilled className="text-red-500" />
                  ) : (
                    <Heart />
                  )}
                </div>
                <div className="card card-games-body frosted-blur">
                  <Link to={`./game/${game.slug}/${game.id}`}>
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
                  </Link>
                  <p className="card card-games-text">
                    Release Date: {formatDate(game.released)}
                  </p>
                  <p className="card card-games-text">
                    Latest Update: {formatDate(game.updated)}
                  </p>
                  <p className="genre card card-games-text">
                    Genre: {game.genres.map((genre) => genre.name).join(", ")}
                  </p>
                </div>
              </div>
              <div className="swiper-lazy-preloader swiper-lazy-preloader-white animate-spin"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllTimeTop;
