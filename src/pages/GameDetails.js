/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swiper from 'swiper';
import 'swiper/css';

function GameDetails() {
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get('id');
  const [gameData, setGameData] = useState(null);
  const [topNews, setTopNews] = useState([]);

  useEffect(() => {
    const apiKey = '9d2a05428ec1467e83df95314e32b77b';
    const newscatcherApiKey = '90hh5aaVdPRKInu0oXyJ1-y_Kn-8IhcTeBOBQQRw8aw';

    const rawgUrl = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;
    let gameSlug = '';

    console.log(rawgUrl);

    axios
      .get(rawgUrl)
      .then((response) => {
        const game = response.data;
        setGameData(game);
        gameSlug = game.slug;
      })
      .catch((error) => {
        console.error('Error fetching game details:', error);
      })
      .then(() => {
        const newsUrl = `https://api.newscatcherapi.com/v2/search?q=${gameSlug}&topic=gaming&lang=en`;
        const headers = { 'x-api-key': newscatcherApiKey };

        axios
          .get(newsUrl, { headers })
          .then((response) => {
            const articles = response.data.articles.slice(0, 15); // Limit to top 15 news articles
            setTopNews(articles);
            console.log(articles);

            // Initialize Swiper slider after top news data is fetched
            const swiper = new Swiper('.swiper', {
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
            });
          })
          .catch((error) => {
            console.error('Error fetching top news:', error);
          });
      });
  }, [id]);

  if (!gameData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container mx-auto mt-5">
        <div className="flex flex-wrap">
          <div className="w-full md:w-8/12">
            <div className="card rounded-none md:rounded-t-lg bg-gray-900 shadow-lg m-5">
              <img
                src={gameData.background_image}
                className="card-img-top h-64 md:h-auto object-cover"
                alt="Game Background"
              />
              <div className="card-body p-5">
                <h3 className="card-title text-white text-2xl font-bold mb-4">
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
            <div className="card rounded-lg bg-gray-900 shadow-lg mb-5">
              <div className="card-body">
                <h5 className="card-title text-white text-2xl font-bold mb-4 p-5">
                  Game Tags
                </h5>
                <ul className="list-group">
                  {gameData.tags.slice(0, 20).map((tag) => (
                    <li
                      key={tag.id}
                      className="list-group-item bg-gray-800 text-gray-300 px-5 py-1"
                    >
                      {tag.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="card rounded-lg bg-gray-900 shadow-lg mt-4 md:mt-0">
              <div className="card-body p-5">
                <h5 className="card-title text-white text-2xl font-bold mb-4">
                  Game Info
                </h5>
                <p className="card-text text-gray-400">
                  {gameData.description_raw}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Top News */}
      <div className="flex justify-center top-news bg-gray-900 py-8 mt-8">
        <div id="TopNews" className="container">
          <h2 className="text-white text-4xl font-bold mb-8">Top News</h2>

          <div className="swiper container">
            <div className="swiper-wrapper">
              {topNews.map((news) => (
                <div key={news.title} className="swiper-slide">
                  <div className="card rounded-lg bg-gray-900 shadow-lg">
                    <img
                      src={news.media}
                      className="card-img-top h-64 object-cover"
                      alt="News Per Game"
                    />
                    <div className="card-body p-5">
                      <h5 className="card-title text-white text-2xl font-bold mb-4">
                        {news.title}
                      </h5>
                      <p className="card-text text-gray-400">{news.summary}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="swiper-button-next"></div>
            <div className="swiper-button-prev"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
