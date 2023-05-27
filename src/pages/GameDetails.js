import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Swiper from 'swiper';
import 'swiper/css';
import './GameDetails.css';

function GameDetails() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  const slug = searchParams.get('slug');
  const [gameData, setGameData] = useState(null);
  const [topNews, setTopNews] = useState([]);

  useEffect(() => {
    const apiKey = '9d2a05428ec1467e83df95314e32b77b';
    const newsApiKey = 'a3fe93f026fa49858e43dff9fe1b2c6b';

    // Fetch game details
    axios
      .get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`)
      .then((response) => {
        const game = response.data;
        setGameData(game);
        console.log(game);
      })
      .catch((error) => {
        console.error('Error fetching game details:', error);
      });

    // Fetch top news using game slug
    if (gameData) {
      axios
        .get(`https://newsapi.org/v2/everything?q=${slug}&apiKey=${newsApiKey}`)
        .then((response) => {
          const articles = response.data.articles;
          setTopNews(articles);
        })
        .catch((error) => {
          console.error('Error fetching top news:', error);
        });
    }
  }, [id, slug, gameData]);

  useEffect(() => {
    // Initialize Swiper slider
    // eslint-disable-next-line no-unused-vars
    const swiper = new Swiper('.swiper', {
      slidesPerView: 4,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }, []);

  if (!gameData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container mx-auto mt-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-8/12">
            <div className="card rounded-none md:rounded-t-lg bg-gray-900 shadow-lg">
              <img
                src={gameData.background_image}
                className="card-img-top h-64 md:h-auto object-cover"
                alt="Game Background"
              />
              <div className="card-body">
                <h5 className="card-title text-white text-2xl font-bold mb-4">
                  {gameData.name}
                </h5>
                <p className="card-text text-gray-400">
                  {gameData.description_raw}
                </p>
                <h6 className="text-gray-300">
                  Platforms:{' '}
                  {gameData.platforms
                    .map((platform) => platform.platform.name)
                    .join(', ')}
                </h6>
                <h6 className="text-gray-300">
                  Release Date: {gameData.released}
                </h6>
                <h6 className="text-gray-300">
                  Genres:{' '}
                  {gameData.genres.map((genre) => genre.name).join(', ')}
                </h6>
                <h6 className="text-gray-300">
                  Publisher:{' '}
                  {gameData.publishers
                    .map((publisher) => publisher.name)
                    .join(', ')}
                </h6>
                <h6 className="text-gray-300">
                  Developer:{' '}
                  {gameData.developers
                    .map((developer) => developer.name)
                    .join(', ')}
                </h6>
              </div>
            </div>
          </div>
          <div className="w-full md:w-4/12">
            <div className="card rounded-lg bg-gray-900 shadow-lg mt-4 md:mt-0">
              <div className="card-body">
                <h5 className="card-title text-white text-2xl font-bold mb-4">
                  Game Info
                </h5>
                <p className="card-text text-gray-400">
                  {gameData.description_raw}
                </p>
              </div>
            </div>
            <div className="card rounded-lg bg-gray-900 shadow-lg mt-4">
              <div className="card-body">
                <h5 className="card-title text-white text-2xl font-bold mb-4">
                  Related Games
                </h5>
                <ul className="list-group">
                  {gameData.tags.slice(0, 5).map((tag) => (
                    <li
                      key={tag.id}
                      className="list-group-item bg-gray-800 text-gray-300"
                    >
                      {tag.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="top-news bg-gray-900 py-8 mt-8">
        <h2 className="text-white text-4xl font-bold mb-8">Top News</h2>
        <div className="swiper">
          <div className="swiper-wrapper">
            {topNews.map((news) => (
              <div key={news.title} className="swiper-slide">
                <div className="card rounded-lg bg-gray-900 shadow-lg">
                  <img
                    src={news.urlToImage}
                    className="card-img-top h-64 object-cover"
                    alt="News Per Game"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-white text-2xl font-bold mb-4">
                      {news.title}
                    </h5>
                    <p className="card-text text-gray-400">
                      {news.description}
                    </p>
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
  );
}

export default GameDetails;
