import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

const Wishlist = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const apiKey = process.env.REACT_APP_GAMELINK_DB_KEY;
  const rawgApiKey = process.env.REACT_APP_RAWG_API_KEY;

  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        // Decode the JWT token stored in local storage to get the user ID
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in local storage");
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        // Fetch the user data from your API
        const userResponse = await fetch(
          `https://api-gamelinkdb.onrender.com/api/users/${userId}?apiKey=${apiKey}`
        );
        const userData = await userResponse.json();

        // Map over the wishlist array and fetch the game data for each game ID
        const gameDataPromises = userData.wishlist.map(async (gameId) => {
          const gameResponse = await fetch(
            `https://api.rawg.io/api/games/${gameId}?key=${rawgApiKey}`
          );
          const gameData = await gameResponse.json();
          return {
            image: gameData.background_image,
            gameName: gameData.name,
            releaseDate: gameData.released,
            lastUpdated: gameData.updated,
            id: gameData.id,
            slug: gameData.slug,
          };
        });

        // Wait for all the game data promises to resolve
        const gameData = await Promise.all(gameDataPromises);

        // Update the state with the fetched game data
        setWishlistData(gameData);
      } catch (error) {
        console.error("Error fetching wishlist data:", error);
      }
    };

    fetchWishlistData();
  }, [apiKey, rawgApiKey]);

  return (
    <div className="flex justify-center overflow-hidden mb-10">
      <div className="container mt-10">
        <div className="border-box text-white dark:text-gray-800 overflow-hidden">
          <h1 className="text-5xl border-b-2 border-slate-500/50 py-5 mx-10 sm:mx-[10rem] flex justify-center font-bold mt-8 mb-4">
            Wishlist
          </h1>
          <table className="w-full rounded-md bg-slate-800/50 text-slate-200 dark:text-slate-800">
            <thead className="rounded-t-md">
              <tr>
                <th className="border border-slate-800 dark:border-slate-200 p-2">
                  Image
                </th>
                <th className="border border-slate-800 dark:border-slate-200 p-2">
                  Game Name
                </th>
                <th className="border border-slate-800 dark:border-slate-200 p-2">
                  Release Date
                </th>
                <th className="border border-slate-800 dark:border-slate-200 p-2">
                  GameLink
                </th>
              </tr>
            </thead>
            <tbody>
              {wishlistData.map((item) => (
                <tr key={item.gameName}>
                  <td className="border border-slate-800 dark:border-slate-200 p-2">
                    <a href={`./game/${item.slug}/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.gameName}
                        className="w-full h-auto max-h-32 object-cover rounded-md"
                      />
                    </a>
                  </td>
                  <td className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                    {item.gameName}
                  </td>
                  <td className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                    {item.releaseDate}
                  </td>
                  <td className="border border-slate-800 dark:border-slate-200 p-2">
                    <div className="w-full flex justify-center">
                      <a href={`./game/${item.slug}/${item.id}`}>
                        <span className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 px-4 rounded-md w-full">
                          To Game
                        </span>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
