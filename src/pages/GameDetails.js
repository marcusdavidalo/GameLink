import React, { useRef, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function GameDetails() {
  const swiperElRef = useRef(null);

  useEffect(() => {
    if (swiperElRef.current) {
      const swiper = swiperElRef.current.swiper;
      swiper.init(); // Manually initialize Swiper
    }
  }, []);

  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');
  const [gameData, setGameData] = useState(null);
  const [topNews, setTopNews] = useState([]);

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
      console.error('Error parsing news data:', error);
      return false; // Invalid JSON data
    }

    return true; // Data is valid
  }, []);

  function TruncatedSummary({ summary, maxLength }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleExpand = () => {
      setIsExpanded(!isExpanded);
    };

    if (summary && summary.length > maxLength) {
      const truncatedSummary = isExpanded
        ? summary
        : summary.substring(0, maxLength - 3) + '...';

      return (
        <React.Fragment>
          {truncatedSummary}{' '}
          <button
            onClick={handleToggleExpand}
            className="font-semibold text-gray-200"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        </React.Fragment>
      );
    }
    return summary || '';
  }

  const fetchNewsData = useCallback(() => {
    const cachedNewsData = localStorage.getItem('newsData-' + id);

    try {
      if (isNewsDataValid(cachedNewsData)) {
        const parsedNewsData = JSON.parse(cachedNewsData);
        console.log('parsedNewsData:', parsedNewsData);
        setTopNews(parsedNewsData.articles);
      } else {
        const apiKey = process.env.REACT_APP_RAWG_API_KEY;
        const newscatcherApiKey = process.env.REACT_APP_NEWSCATCHER_API_KEY;
        const rawgUrl = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;
        let gameSlug = '';
        let game;

        axios
          .get(rawgUrl)
          .then((response) => {
            game = response.data;
            setGameData(game);
            gameSlug = game.slug;

            const newsUrl = `https://api.newscatcherapi.com/v2/search?q=${gameSlug}&topic=gaming&lang=en`;
            const headers = { 'x-api-key': newscatcherApiKey };

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
              localStorage.setItem('newsData-' + id, JSON.stringify(newsData));

              // Store gameData in local storage as well
              localStorage.setItem('gameData-' + id, JSON.stringify(game));
            } else {
              setTopNews([]);
            }
          })
          .catch((error) => {
            console.error('Error fetching game details or top news:', error);
          });
      }
    } catch (error) {
      console.error('Error parsing news data:', error);
    }
  }, [id, isNewsDataValid]);

  const refreshNewsData = useCallback(() => {
    const today = new Date();
    const dayOfWeek = today.getUTCDay(); // 0 (Sunday) to 6 (Saturday)

    if (dayOfWeek === 1) {
      // Monday (assuming Monday is the start of the week)
      localStorage.removeItem('newsData'); // Remove the stored news data on Monday
    }
  }, []);

  useEffect(() => {
    const cachedGameData = localStorage.getItem('gameData-' + id);
    if (cachedGameData) {
      setGameData(JSON.parse(cachedGameData));
    }

    fetchNewsData();
    refreshNewsData();
  }, [id, fetchNewsData, refreshNewsData]);

  console.log('topNews:', topNews);
  console.log('gameData:', gameData);

  if (!gameData || !topNews) {
    return (
      <div className="fixed h-screen w-screen bg-slate-800/70 backdrop-blur-sm">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto mt-5">
        <div className="flex flex-wrap">
          <div className="w-full md:w-8/12">
            <div className="card rounded-md bg-gray-800/50 shadow-lg m-5">
              <img
                src={gameData.background_image}
                className="card-img-top h-64 md:h-auto object-cover rounded-t-md"
                alt="Game Background"
              />
              <div className="card-body p-5">
                <h3 className="card-title text-gray-200 text-2xl font-bold mb-4">
                  {gameData.name}
                </h3>
                <p className="card-text text-lg text-gray-400 mb-4">
                  {gameData.description_raw}
                </p>
                <h4 className="text-gray-300 text-lg mb-4">
                  <span className="font-bold text-xl">Platforms:</span>{' '}
                  {gameData.platforms
                    .map((platform) => platform.platform.name)
                    .join(', ')}
                </h4>
                <h4 className="text-gray-300 text-lg mb-4">
                  <span className="font-bold text-xl">Release Date:</span>{' '}
                  {gameData.released}
                </h4>
                <h4 className="text-gray-300 text-lg mb-4">
                  <span className="font-bold text-xl">Genres:</span>{' '}
                  {gameData.genres.map((genre) => genre.name).join(', ')}
                </h4>
                <h4 className="text-gray-300 text-lg mb-4">
                  <span className="font-bold text-xl">Publisher:</span>{' '}
                  {gameData.publishers
                    .map((publisher) => publisher.name)
                    .join(', ')}
                </h4>
                <h4 className="text-gray-300 text-lg mb-4">
                  <span className="font-bold text-xl">Developer:</span>{' '}
                  {gameData.developers
                    .map((developer) => developer.name)
                    .join(', ')}
                </h4>
              </div>
            </div>
          </div>
          <div className="w-full md:w-4/12 mt-5">
            <div className="card rounded-lg bg-gray-800/50 shadow-lg mb-5">
              <div className="card-body">
                <h5 className="card-title text-gray-200 text-2xl font-bold p-5">
                  Game Tags
                </h5>
                <ul className="flex flex-row flex-wrap list-group bg-gray-800/50 p-5">
                  {gameData.tags.slice(0, 50).map((tag) => (
                    <li
                      key={tag.id}
                      className="list-group-item text-gray-300 mr-2 mb-4"
                    >
                      <p className="bg-gray-600/60 px-5 py-2 rounded-full">
                        {tag.name}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="card rounded-lg bg-gray-800/50 shadow-lg mt-4 md:mt-0">
              <div className="card-body p-5">
                <h5 className="card-title text-gray-200 text-2xl font-bold mb-4">
                  Game Links
                </h5>
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href={gameData.website}
                    className="text-center card-text bg-slate-500 text-gray-200 rounded-md font-bold p-2 hover:scale-[1.02] hover:bg-slate-700 hover:text-gray-100"
                  >
                    Official Website
                  </a>
                  <a
                    href={gameData.metacritic_url}
                    className="text-center card-text bg-emerald-600 text-gray-200 rounded-md font-bold p-2 hover:scale-[1.02] hover:bg-emerald-700 hover:text-gray-100"
                  >
                    Metacritic
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Top News */}
      <div className="flex justify-center top-news bg-[rgba(31,41,55,0.5)] py-12 mt-8 mb-5 px-4">
        <div id="TopNews" className="container">
          <h2 className="text-gray-200 text-4xl font-bold mb-8">Top News</h2>

          {topNews.length > 0 ? (
            <div className="swiper">
              <Swiper
                ref={swiperElRef}
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
                {topNews.map((news) => (
                  <SwiperSlide key={news.title} className="pb-10 ">
                    <div className="card rounded-lg bg-gray-800/50 shadow-lg shadow-black">
                      {news.media ? (
                        <a
                          href={news.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div
                            id="imgcontainer"
                            className="relative h-64 max-w-auto overflow-hidden rounded-t-md"
                          >
                            <span className="absolute top-0 left-0 px-2 py-1 bg-amber-500/70 text-white font-semibold z-20">
                              {!news.author || news.author === '' ? (
                                <p>No Author</p>
                              ) : (
                                <p>{news.author}</p>
                              )}
                            </span>
                            <span className="absolute bottom-0 right-0 px-2 py-1 bg-blue-700/80 backdrop-blur-sm text-white font-semibold z-20 uppercase">
                              {!news.author || news.author === '' ? (
                                <p></p>
                              ) : (
                                <a
                                  href={news.clean_url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <p className="hover:scale-105">
                                    {news.rights}
                                  </p>
                                </a>
                              )}
                            </span>
                            <img
                              src={news.media}
                              className="card-img-top h-full w-auto object-cover origin-center hover:scale-[1.05]"
                              alt="News Per Game"
                            />
                          </div>
                        </a>
                      ) : (
                        <div
                          className="h-64 bg-slate-400 flex items-center justify-center"
                          role="img"
                          aria-label="No Image"
                        >
                          No Image
                        </div>
                      )}
                      <div className="card-body p-5 mb-10">
                        <div
                          id="titlecontainer"
                          className="h-40 max-w-auto overflow-hidden"
                        >
                          <h5 className="card-title text-gray-200 text-2xl font-bold">
                            <a
                              href={news.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {news.title}
                            </a>
                          </h5>
                        </div>
                        <p className="card-text text-gray-400">
                          {news.summary ? (
                            <TruncatedSummary
                              summary={news.summary}
                              maxLength={100}
                            />
                          ) : (
                            ''
                          )}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="text-gray-200 text-center text-3xl pt-20 pb-20 bg-gray-800 rounded-md">
              No News Available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
