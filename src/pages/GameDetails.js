import React, { useRef, useEffect, useState, useCallback } from "react";
import SwiperCore, { Scrollbar } from "swiper";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import GameComments from "../components/comment/GameComments";
import axios from "axios";
import usePageTitle from "../hooks/useTitle";
import explicitContentFilters from "../json/explicitContentFilters.json";
import jwtDecode from "jwt-decode";
import "swiper/css/bundle";
import { ReactComponent as Heart } from "../assets/icons/heart.svg";
import { ReactComponent as HeartFilled } from "../assets/icons/heartfilled.svg";
SwiperCore.use([Scrollbar]);

function TruncatedSummary({ summary, maxLength }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (summary && summary.length > maxLength) {
    const truncatedSummary = isExpanded
      ? summary
      : summary.substring(0, maxLength - 3) + "...";

    return (
      <React.Fragment>
        {truncatedSummary}
        <button
          onClick={handleToggleExpand}
          className="font-semibold text-gray-200 dark:text-slate-800"
        >
          {isExpanded ? " Read Less" : "Read More"}
        </button>
      </React.Fragment>
    );
  }
  return summary || "";
}
function GameDetails() {
  const swiperElRef = useRef(null);

  useEffect(() => {
    if (swiperElRef.current) {
      const swiper = swiperElRef.current.swiper;
      swiper.init(); // Manually initialize Swiper
    }
  }, []);

  const { id } = useParams();
  const [gameData, setGameData] = useState(null);
  const [topNews, setTopNews] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [numTagsToShow, setNumTagsToShow] = useState(6);

  const handleShowMore = () => {
    setNumTagsToShow((prevNum) => prevNum + 7);
  };

  const isNewsDataValid = useCallback((newsData) => {
    if (!newsData) {
      return false;
    }

    try {
      const parsedNewsData = JSON.parse(newsData); // Parse the cached data

      const storedTime = parsedNewsData?.timestamp
        ? new Date(parsedNewsData.timestamp).getTime()
        : null;
      const currentTime = new Date().getTime();
      const oneWeek = 7 * 24 * 60 * 60 * 1000; // One week in milliseconds

      // Check if one week has passed since the last update
      if (storedTime && currentTime - storedTime > oneWeek) {
        return false; // Data is expired
      }
    } catch (error) {
      console.error("Error parsing news data:", error);
      return false; // Invalid JSON data
    }

    return true; // Data is valid
  }, []);

  // Function to handle adding and removing games from the wishlist
  const handleWishlist = async (gameId) => {
    // Get the user id from the JWT token stored in local storage
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      if (wishlist.includes(gameId)) {
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
      } else {
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

  usePageTitle(`PlayKoDEX | ${gameData?.name || "Loading..."}`);

  const fetchNewsData = useCallback(() => {
    const cachedNewsData = localStorage.getItem("newsData-" + id);

    try {
      if (isNewsDataValid(cachedNewsData)) {
        const parsedNewsData = JSON.parse(cachedNewsData);
        setTopNews(parsedNewsData.articles);
      } else {
        const apiKey = process.env.REACT_APP_RAWG_API_KEY;
        const newscatcherApiKey = process.env.REACT_APP_NEWSCATCHER_API_KEY;
        const rawgUrl = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;
        let gameSlug = "";
        let game;

        axios
          .get(rawgUrl)
          .then((response) => {
            game = response.data;
            setGameData(game);
            gameSlug = game.slug;

            const newsUrl = `https://api.newscatcherapi.com/v2/search?q="${gameSlug}"&topic=gaming&sort_by=relevancy&lang=en`;
            const headers = { "x-api-key": newscatcherApiKey };

            return axios.get(newsUrl, { headers });
          })
          .then((response) => {
            const articles = response.data.articles;
            if (articles && articles.length > 0) {
              const slicedArticles = articles.slice(0, 15); // Limit to top 15 news articles
              setTopNews(slicedArticles);

              const newsData = {
                timestamp: new Date().toISOString(),
                articles: slicedArticles,
              };
              localStorage.setItem("newsData-" + id, JSON.stringify(newsData));

              // Store gameData in local storage as well
              localStorage.setItem("gameData-" + id, JSON.stringify(game));
            } else {
              setTopNews([]);
            }
          })
          .catch((error) => {
            console.error("Error fetching game details or top news:", error);
          });
      }
    } catch (error) {
      console.error("Error parsing news data:", error);
    }
  }, [id, isNewsDataValid]);

  const refreshNewsData = useCallback(() => {
    const today = new Date();
    const dayOfWeek = today.getUTCDay(); // 0 (Sunday) to 6 (Saturday)

    if (dayOfWeek === 1) {
      localStorage.removeItem("newsData"); // Remove the stored news data on Monday
    }
  }, []);

  useEffect(() => {
    const cachedGameData = localStorage.getItem("gameData-" + id);
    if (cachedGameData) {
      setGameData(JSON.parse(cachedGameData));
    }

    fetchNewsData();
    refreshNewsData();
  }, [id, fetchNewsData, refreshNewsData]);

  if (!gameData || !topNews) {
    return (
      <div className="classic flex items-center justify-center align-baseline absolute top-0 left-0 h-screen w-screen text-white text-5xl bg-transparent backdrop-blur-lg animate-pulse z-[9999] dark:text-gray-800">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto mt-5">
        <div className="flex flex-wrap">
          <div className="w-full md:w-8/12">
            <div className="card rounded-md bg-gray-800/60 dark:bg-slate-200/70 shadow-lg m-2">
              <img
                src={
                  gameData.background_image ||
                  `https://placehold.co/256/1F2937/FFFFFF?text=${encodeURIComponent(
                    gameData.name
                  )}&font=roboto`
                }
                className="card-img-top h-auto w-full md:h-auto object-cover rounded-t-md"
                alt="Game Background"
              />
              <div className="card-body p-5">
                <div className="flex justify-between items-center text-center align-middle">
                  <h3 className="card-title text-gray-200 dark:text-slate-800 text-2xl font-bold mb-4">
                    {gameData.name.split("").map((letter, index) => (
                      <span
                        key={index}
                        data-aos="fade-down"
                        data-aos-delay={(index + 1) * 100}
                      >
                        {letter}
                      </span>
                    ))}
                  </h3>
                  <div
                    className={`flex items-center align-middle justify-center w-8 h-8 rounded-full text-white font-bold text-sm cursor-pointer`}
                    onClick={() => handleWishlist(id)}
                    width="32"
                    height="32"
                  >
                    {wishlist.includes(id) ? (
                      <HeartFilled className="text-red-500" />
                    ) : (
                      <Heart />
                    )}
                  </div>
                </div>
                <p className="card-text text-lg text-gray-400 dark:text-slate-600 mb-4 text-justify">
                  {gameData.description_raw ? (
                    <TruncatedSummary
                      summary={gameData.description_raw}
                      maxLength={400}
                    />
                  ) : (
                    ""
                  )}
                </p>
                <h4 className="text-gray-300 dark:text-slate-800 text-lg mb-4">
                  <span className="font-bold text-xl">Platforms: </span>
                  {gameData.platforms
                    .map((platform) => platform.platform.name)
                    .join(", ")}
                </h4>
                <h4 className="text-gray-300 dark:text-slate-800 text-lg mb-4">
                  <span className="font-bold text-xl">Release Date: </span>
                  {gameData.released}
                </h4>
                <h4 className="text-gray-300 dark:text-slate-800 text-lg mb-4">
                  <span className="font-bold text-xl">Genres: </span>
                  {gameData.genres.map((genre) => genre.name).join(", ")}
                </h4>
                <h4 className="text-gray-300 dark:text-slate-800 text-lg mb-4">
                  <span className="font-bold text-xl">Publisher: </span>
                  {gameData.publishers
                    .map((publisher) => publisher.name)
                    .join(", ")}
                </h4>
                <h4 className="text-gray-300 dark:text-slate-800 text-lg mb-4">
                  <span className="font-bold text-xl">Developer: </span>
                  {gameData.developers
                    .map((developer) => developer.name)
                    .join(", ")}
                </h4>
              </div>
            </div>
          </div>
          <div className="w-full md:w-4/12">
            <div className="card rounded-lg bg-gray-800/60 dark:bg-slate-200/70 shadow-lg m-2">
              <div className="card-body">
                <h5 className="card-title text-gray-200 dark:text-slate-800 text-2xl font-bold p-5">
                  Game Tags
                </h5>
                <ul className="flex flex-row flex-wrap list-group delay-0 bg-gray-800/60 dark:bg-slate-200/70 p-5 rounded-md">
                  {gameData.tags.slice(0, numTagsToShow).map((tag, index) => {
                    const isExplicit = explicitContentFilters.tags.includes(
                      tag.name
                    );

                    return (
                      <li
                        key={tag.id}
                        className="list-group-item text-gray-300 mr-2 mb-4"
                        data-aos="fade-left"
                        data-aos-delay={(index + 1) * 50}
                      >
                        <p
                          className={`text-base bg-gray-600/60 px-5 py-2 rounded-full ${
                            isExplicit ? "text-red-500" : ""
                          }`}
                          title={tag.name}
                        >
                          {tag.name}
                        </p>
                      </li>
                    );
                  })}
                  <div className="flex justify-end">
                    {numTagsToShow < gameData.tags.length && (
                      <button
                        className="font-semibold text-gray-200 dark:text-slate-800 align-middle text-base"
                        onClick={handleShowMore}
                      >
                        ...Show More
                      </button>
                    )}
                  </div>
                </ul>
              </div>
            </div>
            <div className="card rounded-md bg-gray-800/60 dark:bg-slate-200/70 shadow-lg mt-4 mx-2">
              <div className="card-body">
                <h5 className="card-title text-gray-200 dark:text-slate-800 text-2xl font-bold p-5">
                  Game Links
                </h5>
                <div className="grid grid-cols-2 gap-4 bg-gray-800/60 dark:bg-slate-200/70 p-5 rounded-md">
                  <a
                    href={gameData.website}
                    target="_blank"
                    className="text-center text-base card-text bg-slate-500/70 text-gray-200 rounded-md font-bold p-2 hover:scale-[1.02] hover:bg-slate-700 hover:text-gray-100"
                    rel="noreferrer"
                    data-aos="fade-down"
                    data-aos-delay={100}
                  >
                    Official Website
                  </a>
                  <a
                    href={gameData.metacritic_url}
                    target="_blank"
                    className="text-center text-base card-text bg-emerald-600/70 text-gray-200 rounded-md font-bold p-2 hover:scale-[1.02] hover:bg-emerald-700 hover:text-gray-100"
                    rel="noreferrer"
                    data-aos="fade-down"
                    data-aos-delay={200}
                  >
                    Metacritic Website
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* COMMENT SECTION */}
      <section className="container mx-auto my-5 rounded-lg bg-slate-800/50 dark:bg-slate-200/70">
        <div className=" mx-auto max-w-screen-lg px-4 py-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-200 dark:text-slate-800 text-center">
            Discussion
          </h1>
          {/* Comment Form */}
          <GameComments gameId={id} />
        </div>

        {/* <!-- COMMENT --> */}
        {/* <div className="container mx-auto max-w-screen-lg">
          <h3 className="text-4xl font-bold mb-4 text-gray-200 text-center">
            Comments
          </h3> */}

        {/* COMMENT 1/////////////////////////////////////////////////////////////////////////////////////// */}
        {/* <div className="flex row">
            <div className="">
              <img
                className="mt-2 rounded-lg w-8 h-8 sm:w-16 sm:h-16"
                src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                alt=""
              />
            </div>
            <div className="flex-1 rounded-lg px-4 pb-2 sm:px-5 sm:pb-3 md:px-6 md:pb-4 lg:px-7 lg:pb-5 leading-relaxed">
              <strong className="text-base text-gray-200">Sarah</strong>{" "}
              <span className="text-xs text-gray-400">&nbsp;6hr ago</span>
              <p className="text-sm text-gray-200">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua.
              </p>
              <div className="mt-4 flex items-center">
                <div className=" text-xs uppercase tracking-wide text-gray-400 font-bold mr-5">
                  Like
                </div>
                <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">
                  Reply
                </div>
              </div>
            </div>
          </div> */}

        {/* COMMENT 2//////////////////////////////////////////////////////////////////////////////////// */}
        {/* <div className="flex">
            <div>
              <img
                className="mt-2 rounded-lg w-8 h-8 sm:w-16 sm:h-16"
                src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                alt=""
              />
            </div>
            <div className="flex-1 rounded-lg px-4 pb-2 sm:px-5 sm:pb-3 md:px-6 md:pb-4 lg:px-7 lg:pb-5 leading-relaxed">
              <strong className="text-base text-gray-200">Sarah</strong>{" "}
              <span className="text-xs text-gray-400">&nbsp;3hr ago</span>
              <p className="text-sm text-gray-200">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua.
              </p>
              <div className="mt-4 flex items-center">
                <div className=" text-xs uppercase tracking-wide text-gray-400 font-bold mr-5">
                  Like
                </div>
                <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">
                  Reply
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex">
                  <div className="mr-3">
                    <img
                      className="mt-2 rounded-lg w-8 h-8 sm:w-16 sm:h-16"
                      src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                      alt=""
                    />
                  </div>
                  <div className="text-base rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed text-gray-200">
                    <strong className="text-base">Sarah</strong>{" "}
                    <span className="text-xs text-gray-400">&nbsp;1hr ago</span>
                    <p className="text-xs sm:text-sm">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua.
                    </p>
                    <div className="mt-4 flex items-center">
                      <div className=" text-xs uppercase tracking-wide text-gray-400 font-bold mr-5">
                        Like
                      </div>
                      <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">
                        Reply
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-3">
                    <img
                      className="mt-2 rounded-lg w-8 h-8 sm:w-16 sm:h-16"
                      src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                      alt=""
                    />
                  </div>
                  <div className="flex-1 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed text-gray-200">
                    <strong className="text-base">Sarah</strong>{" "}
                    <span className="text-xs text-gray-400">
                      &nbsp;2mins ago
                    </span>
                    <p className="text-xs sm:text-sm">
                      Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                      sed diam nonumy eirmod tempor invidunt ut labore et dolore
                      magna aliquyam erat, sed diam voluptua.
                    </p>
                    <div className="mt-4 flex items-center">
                      <div className=" text-xs uppercase tracking-wide text-gray-400 font-bold mr-5">
                        Like
                      </div>
                      <div className="text-xs uppercase tracking-wide text-gray-400 font-bold">
                        Reply
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </section>
      {/* Top News */}
      <div className="flex justify-center top-news bg-slate-800/50 py-12 mt-8 mb-5 px-4 dark:bg-slate-200/70">
        <div id="TopNews" className="container">
          <div className="flex flex-col items-center text-gray-200 mb-8">
            <h2 className="text-4xl font-bold mb-2 dark:text-slate-800">
              Top News
            </h2>
            <h3 className="font-semibold text-2xl border-t-2 border-t-gray-500 px-20 dark:text-slate-800">
              {gameData.name}
            </h3>
          </div>

          {topNews.length > 0 ? (
            <Swiper
              ref={swiperElRef}
              modules={{ Scrollbar }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
              scrollbar={{ draggable: true }}
            >
              {topNews.map((news, index) => (
                <SwiperSlide key={news.title} className="pb-10">
                  <div
                    className="card rounded-lg bg-gray-800/60 shadow-lg shadow-black dark:bg-slate-200/70"
                    data-aos="fade-up"
                    data-aos-delay={(index + 1) * 100}
                  >
                    {news.media ? (
                      <div
                        id="imgcontainer"
                        className="relative h-64 max-w-auto overflow-hidden rounded-t-md "
                      >
                        <span className="absolute top-0 left-0 px-2 py-1 bg-amber-500/70 text-white font-semibold z-20">
                          {!news.author || news.author === "" ? (
                            <p>N/A</p>
                          ) : (
                            <p>{news.author}</p>
                          )}
                        </span>
                        <span className="absolute bottom-0 right-0 px-2 py-1 bg-blue-700/80 backdrop-blur-sm text-white font-semibold z-20 uppercase">
                          {!news.rights || news.rights === "" ? (
                            <p>N/A</p>
                          ) : (
                            <a
                              href={"https://" + news.clean_url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <p className=" hover:scale-105">{news.rights}</p>
                            </a>
                          )}
                        </span>
                        <a
                          href={news.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={news.media}
                            className="card-img-top h-full w-auto object-cover origin-center hover:scale-[1.05]"
                            alt="News Per Game"
                          />
                        </a>
                      </div>
                    ) : (
                      <div
                        id="imgcontainer"
                        className="flex align-middle relative h-64 max-w-auto overflow-hidden rounded-t-md "
                      >
                        <span className="absolute top-0 left-0 px-2 py-1 bg-amber-500/70 text-white font-semibold z-20">
                          {!news.author || news.author === "" ? (
                            <p>N/A</p>
                          ) : (
                            <p>{news.author}</p>
                          )}
                        </span>
                        <span className="absolute bottom-0 right-0 px-2 py-1 bg-blue-700/80 backdrop-blur-sm text-white font-semibold z-20 uppercase">
                          {!news.rights || news.rights === "" ? (
                            <p>N/A</p>
                          ) : (
                            <a
                              href={"https://" + news.clean_url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <p className=" hover:scale-105">{news.rights}</p>
                            </a>
                          )}
                        </span>
                        <a
                          href={news.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={
                              "https://placehold.co/512/020617/FFFFFF?text=" +
                              news.title +
                              "&font=roboto"
                            }
                            className="card-img-top h-auto w-full object-cover origin-center hover:scale-[1.05]"
                            alt="Game News"
                          />
                        </a>
                      </div>
                    )}
                    <div className="card-body p-5 mb-10">
                      <div
                        id="titlecontainer"
                        className="h-40 max-w-auto overflow-hidden"
                      >
                        <h5 className="card-title text-gray-200 dark:text-slate-800 text-2xl font-bold">
                          <a
                            href={news.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {news.title}
                          </a>
                        </h5>
                      </div>
                      <p className="card-text text-gray-400 dark:text-slate-600">
                        {news.summary ? (
                          <TruncatedSummary
                            summary={news.summary}
                            maxLength={100}
                          />
                        ) : (
                          ""
                        )}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-gray-200 text-center text-3xl pt-20 pb-20 bg-gray-800 6ounded-md">
              No News Available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
