import React, { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

function GameComments({ gameId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
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
      .then((response) => {
        console.log("Fetched comments:", response.data);

        const gameComments = response.data.filter(
          (comment) => Number(gameId) === comment.gameId
        );
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
      <div className="h-full absolute -z-[500]">
        <p className="object-fit text-6xl font-black -rotate-45 align-middle text-white/50">
          TEMPORARY
        </p>
      </div>
      <div className="text-gray-200">
        {comments.slice(0, numCommentsToShow).map((comment) => (
          <div
            className="text-base bg-gray-600/60 px-5 py-2 rounded-md my-2"
            key={comment._id}
          >
            <p>{comment.content}</p>
          </div>
        ))}
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
