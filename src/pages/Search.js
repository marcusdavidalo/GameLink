import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Search = () => {
  const { searchTerm } = useParams();
  const apiKey = process.env.REACT_APP_RAWG_API_KEY;
  const [games, setGames] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedReleaseDate, setSelectedReleaseDate] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/platforms?key=${apiKey}`
        );
        const data = await response.json();
        setPlatforms(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlatforms();

    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/genres?key=${apiKey}`
        );
        const data = await response.json();
        setGenres(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGenres();

    const fetchTags = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/tags?key=${apiKey}`
        );
        const data = await response.json();
        setTags(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTags();
  }, [apiKey]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        let url = `https://api.rawg.io/api/games?key=${apiKey}&search=${searchTerm}`;
        if (selectedPlatform) {
          url += `&platforms=${selectedPlatform}`;
        }
        if (selectedGenre) {
          url += `&genres=${selectedGenre}`;
        }
        if (selectedReleaseDate) {
          url += `&dates=${selectedReleaseDate}-01-01,${selectedReleaseDate}-12-31`;
        }
        if (selectedTags.length > 0) {
          url += `&tags=${selectedTags.join(",")}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setGames(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGames();
  }, [
    apiKey,
    searchTerm,
    selectedPlatform,
    selectedGenre,
    selectedReleaseDate,
    selectedTags,
  ]);

  const handleTagToggle = (tagId) => {
    const isSelected = selectedTags.includes(tagId);
    if (isSelected) {
      setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== tagId));
    } else {
      setSelectedTags((prevTags) => [...prevTags, tagId]);
    }
  };

  return (
    <main className="text-white">
      <div className="container mx-auto px-4 mt-10">
        <h1 className="text-4xl font-bold pb-5 mb-5">
          Searched For: {searchTerm}
        </h1>
        {/* <div className="flex justify-between">
          <div className="flex flex-col mb-4">
            <label htmlFor="platform" className="mr-2">
              Platform:
            </label>
            <select
              id="platform"
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="" className="text-gray-800">
                All
              </option>
              {platforms.map((platform) => (
                <option
                  key={platform.id}
                  value={platform.id}
                  className="text-gray-800"
                >
                  {platform.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="genre" className="mr-2">
              Genre:
            </label>
            <select
              id="genre"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="" className="text-gray-800">
                All
              </option>
              {genres.map((genre) => (
                <option
                  key={genre.id}
                  value={genre.id}
                  className="text-gray-800"
                >
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="release-date" className="mr-2">
              Release Date:
            </label>
            <input
              type="number"
              id="release-date"
              value={selectedReleaseDate}
              onChange={(e) => setSelectedReleaseDate(e.target.value)}
              placeholder="YYYY"
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
        </div>
        <div className="flex items-center mb-4">
          <label htmlFor="tags" className="mr-2">
            Tags:
          </label>
          <div className="flex flex-wrap">
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleTagToggle(tag.id)}
                className={`border border-gray-300 rounded px-2 py-1 mr-2 mb-2 ${
                  selectedTags.includes(tag.id) ? "bg-blue-500 text-white" : ""
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => {}}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Filter
        </button> */}
        <ul className="mt-4 grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 px-4">
          {games.map((game) => (
            <div key={game.id}>
              {/* Best of the Year game cards here */}
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
                      game.isRatedR ? "blur-lg bg-blend-darken" : ""
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
                  className={`metacritic ${game.metacritic ? "" : "no-score"}`}
                >
                  {game.metacritic ? game.metacritic : "N"}
                </div>
                <div className="card card-games-body frosted-blur">
                  <a href={`./game/${game.slug}/${game.id}`}>
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
                  </a>
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
            </div>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Search;
