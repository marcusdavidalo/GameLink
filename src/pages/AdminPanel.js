import React, { useState } from "react";
import usePageTitle from "../hooks/useTitle";

const AdminDashboard = () => {
  const [gameTitle, setGameTitle] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [gamesList, setGamesList] = useState([]);
  const [userAccounts, setUserAccounts] = useState([]);
  const [activeTab, setActiveTab] = useState("newGames");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPicture, setUserPicture] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [accountCreationDate, setAccountCreationDate] = useState("");
  const [userGame, setUserGame] = useState("");

  const handleGameSubmit = (e) => {
    e.preventDefault();
    const newGame = {
      id: Date.now(),
      title: gameTitle,
      description: gameDescription,
    };
    setGamesList([...gamesList, newGame]);
    setGameTitle("");
    setGameDescription("");
  };

  const handleAccountDelete = (accountId) => {
    const updatedAccounts = userAccounts.filter(
      (account) => account.id !== accountId
    );
    setUserAccounts(updatedAccounts);
  };

  const handleGameDelete = (gameId) => {
    const updatedGames = gamesList.filter((game) => game.id !== gameId);
    setGamesList(updatedGames);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: Date.now(),
      name: userName,
      email: userEmail,
      picture: userPicture,
      accountCreationDate: accountCreationDate,
      game: userGame,
    };
    setUserDetails(newUser);
    setUserName("");
    setUserEmail("");
    setUserPicture("");
    setAccountCreationDate("");
    setUserGame("");
  };

  usePageTitle("PlayKoDEX | Admin Dashboard");
  return (
    <main>
      <div className="flex my-8">
        <div className="w-1/4 bg-gray-800 p-4">
          <h1 className="text-3xl font-bold mb-6 text-white">
            Admin Dashboard
          </h1>
          <ul className="space-y-2">
            <li
              className={`cursor-pointer ${
                activeTab === "newUser"
                  ? "text-blue-500 font-bold"
                  : "text-white"
              }`}
              onClick={() => setActiveTab("newUser")}
            >
              New User
            </li>
            <li
              className={`cursor-pointer ${
                activeTab === "newGames"
                  ? "text-blue-500 font-bold"
                  : "text-white"
              }`}
              onClick={() => setActiveTab("newGames")}
            >
              New Games
            </li>
            <li
              className={`cursor-pointer ${
                activeTab === "recentGames"
                  ? "text-blue-500 font-bold"
                  : "text-white"
              }`}
              onClick={() => setActiveTab("recentGames")}
            >
              Recent Games
            </li>
          </ul>
          {activeTab === "newUser" && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-2 text-white">
                Add New User
              </h2>
              <form onSubmit={handleUserSubmit} className="space-y-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-gray-200 rounded px-4 py-2"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-gray-200 rounded px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="Picture URL"
                  value={userPicture}
                  onChange={(e) => setUserPicture(e.target.value)}
                  className="w-full bg-gray-200 rounded px-4 py-2"
                />
                <input
                  type="date"
                  value={accountCreationDate}
                  onChange={(e) => setAccountCreationDate(e.target.value)}
                  className="w-full bg-gray-200 rounded px-4 py-2"
                />
                <input
                  type="text"
                  placeholder="Game"
                  value={userGame}
                  onChange={(e) => setUserGame(e.target.value)}
                  className="w-full bg-gray-200 rounded px-4 py-2"
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add User
                </button>
              </form>
              {Object.keys(userDetails).length > 0 && (
                <div className="mt-6">
                  <h2 className="text-2xl font-bold mb-2 text-white">
                    User Details
                  </h2>
                  <div className="flex items-center">
                    <img
                      src={userDetails.picture}
                      alt={userDetails.name}
                      className="w-10 h-10 rounded-full mr-4"
                    />
                    <div>
                      <p className="text-white">{userDetails.name}</p>
                      <p className="text-gray-400">{userDetails.email}</p>
                      <p className="text-gray-400">
                        Account created on {userDetails.accountCreationDate}
                      </p>
                      <p className="text-gray-400">
                        Currently playing: {userDetails.game}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="w-3/4 bg-gray-900 p-4">
          {activeTab === "newGames" && (
            <div>
              <h2 className="text-2xl font-bold mb-2 text-white">Games List</h2>
              {gamesList.length === 0 ? (
                <p className="text-white">No games available.</p>
              ) : (
                <ul>
                  {gamesList.map((game) => (
                    <li
                      key={game.id}
                      className="border border-gray-300 rounded px-4 py-2 mb-2 flex justify-between items-center"
                    >
                      <div>
                        <strong className="font-bold text-white">
                          {game.title}
                        </strong>
                        : {game.description}
                      </div>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleGameDelete(game.id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
          {activeTab === "recentGames" && (
            <p className="text-white">Displaying recent games...</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
