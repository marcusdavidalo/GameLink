import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import moment from "moment/moment";

function GameComments({ gameId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [numCommentsToShow, setNumCommentsToShow] = useState(5);

  const handleShowMore = () => {
    setNumCommentsToShow((prevNum) => prevNum + 5);
  };

  useEffect(() => {
    axios
      .get(
        `https://api-gamelinkdb.onrender.com/api/gamecomments?apiKey=${process.env.REACT_APP_GAMELINK_DB_KEY}`
      )
      .then(async (response) => {
        console.log("Fetched comments:", response.data);

        const gameComments = response.data.filter(
          (comment) => Number(gameId) === comment.gameId
        );

        // Fetch user information for each comment
        const users = {};
        for (const comment of gameComments) {
          if (!users[comment.userId]) {
            const userResponse = await axios.get(
              `https://api-gamelinkdb.onrender.com/api/users/${comment.userId}?apiKey=${process.env.REACT_APP_GAMELINK_DB_KEY}`
            );
            users[comment.userId] = userResponse.data;
          }
        }
        setUsers(users);

        setComments(gameComments);
        console.log(gameComments);
      })
      .catch((error) => {
        console.error("Error fetching game comments:", error);
      });
  }, [gameId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    // Get the JWT from localStorage
    const token = localStorage.getItem("token");
    let userId;
    if (token) {
      // Decode the JWT to get the userId value
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id;
    }

    // Create a FormData object to hold the form data
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("gameId", gameId);
    formData.append("content", content);

    // Send a POST request to the backend to create a new comment
    try {
      const response = await fetch(
        `https://api-gamelinkdb.onrender.com/api/gamecomments?apiKey=${process.env.REACT_APP_GAMELINK_DB_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      console.log("Comment created:", data);

      // Reset the form
      setContent("");

      // Update the comments state
      setComments((prevComments) => {
        console.log("Updating comments state:", [...prevComments, data]);

        return [...prevComments, data];
      });
    } catch (error) {
      console.error("Error creating comment:", error);
    }

    setIsLoading(false);
  };

  const getTimeAgo = (timestamp) => {
    return moment(timestamp).fromNow();
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="my-4">
          <div className="relative mb-4">
            <textarea
              id="content"
              className="border placeholder-slate-400 text-gray-200 bg-[rgba(156,163,175,0.5)] border-gray-500 rounded-md py-2 px-4 pr-10 block w-full focus:outline-none focus:ring-slate-400 focus:border-slate-400 dark:text-gray-800 dark:bg-[rgba(255,255,255,0.7)] sm:text-sm"
              value={content}
              rows={4}
              placeholder="Comment about this game..."
              onChange={(event) => setContent(event.target.value)}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-cyan-500 text-base text-white rounded-md hover:bg-blue-600 transition duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin w-5 h-5 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0012 20c4.411 0 8-3.589 8-8h-2c0 3.309-2.691 6-6 6s-6-2.691-6-6H6c0 3.309-2.691 6-6 6z"
                ></path>
              </svg>
            ) : (
              "Create Comment"
            )}
          </button>
        </form>
      </div>
      {/* //////////////COMMENT SECTION  */}
      <div className="container mx-auto max-w-screen-lg">
        <h3 className="text-4xl font-bold mb-4 text-gray-200 text-center">
          Comments
        </h3>
        <div className="text-gray-200">
          {comments.slice(0, numCommentsToShow).map((comment) => (
            <div
              className="text-base bg-gray-600/60 px-5 py-2 rounded-md my-2"
              key={comment._id}
            >
              <div className="flex row">
                <div className="">
                  <img
                    className="mt-2 rounded-lg w-8 h-8 sm:w-16 sm:h-16"
                    src={users[comment.userId].avatar}
                    alt={users[comment.userId].username}
                  />
                </div>
                <div className="flex-1 rounded-lg px-4 pb-2 sm:px-5 sm:pb-3 md:px-6 md:pb-4 lg:px-7 lg:pb-5 leading-relaxed">
                  <strong className="text-base text-gray-200">
                    {users[comment.userId].username}
                  </strong>{" "}
                  <span className="text-xs text-gray-400">
                    &nbsp;{getTimeAgo(comment.createdAt)}
                  </span>
                  <p className="text-lg text-gray-200">{comment.content}</p>
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
          ))}
        </div>

        <div className="flex justify-end">
          {numCommentsToShow < comments.length && (
            <button
              className="bg-slate-600/40 px-2 rounded-full"
              onClick={handleShowMore}
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default GameComments;
