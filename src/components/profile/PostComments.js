import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment/moment";

const PostComments = ({
  comments,
  newCommentContent,
  setNewCommentContent,
  post,
  setComments,
  loggedInUserId,
  postId,
}) => {
  const [commentUsers, setCommentUsers] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `https://api-gamelinkdb.onrender.com/api/postcomments?apiKey=${process.env.REACT_APP_GAMELINK_DB_KEY}`,
        {
          postId: post._id,
          userId: loggedInUserId,
          content: newCommentContent,
        }
      );
      setComments((prevComments) => [...prevComments, response.data]);

      setNewCommentContent("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const getTimeAgo = (timestamp) => {
    return moment(timestamp).fromNow();
  };

  useEffect(() => {
    const fetchCommentUsers = async () => {
      // Create an array of promises to fetch the user data for each comment
      const promises = comments.map(async (comment) => {
        try {
          const response = await axios.get(
            `https://api-gamelinkdb.onrender.com/api/users/${comment.userId}?apiKey=${process.env.REACT_APP_GAMELINK_DB_KEY}`
          );
          console.log(comment.userId, response.data);
          return response.data;
        } catch (error) {
          // Handle the error here
          console.error("Error fetching user data:", error);
          return null;
        }
      });

      // Wait for all promises to resolve
      const users = await Promise.all(promises);

      // Create an object that maps userIds to user objects
      const usersById = users.reduce((acc, user) => {
        if (user) {
          acc[user._id] = user;
        }
        return acc;
      }, {});

      // Update the commentUsers state
      setCommentUsers(usersById);
    };
    fetchCommentUsers();
  }, [comments]);

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Comments</h2>
      <form onSubmit={handleSubmit} className="flex items-center mb-4">
        <input
          type="text"
          value={newCommentContent}
          onChange={(event) => setNewCommentContent(event.target.value)}
          placeholder="Write a comment..."
          className="flex-1 px-3 py-1 rounded-md w-full dark:bg-gray-200 bg-gray-800 ring-slate-500/70"
        />
        <button
          type="submit"
          className="ml-2 px-3 py-1 rounded-md bg-cyan-500 text-white hover:bg-cyan-700"
        >
          Submit
        </button>
      </form>
      {comments
        .filter((comment) => comment.postId === postId)
        .map((comment) => (
          <div
            key={comment._id}
            className="flex items-center mb-2 p-2 rounded-md dark:bg-gray-200 bg-gray-800"
          >
            <div className=" border-r border-slate-500/50 p-2">
              {commentUsers[comment.userId] ? (
                commentUsers[comment.userId].avatar ? (
                  <div className="w-10 h-10 rounded-full bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)] border-2 border-[rgba(255,255,255,0.75)] dark:border-[rgba(31,41,55,0.5)] cursor-pointer relative overflow-hidden">
                    <img
                      src={commentUsers[comment.userId].avatar}
                      alt="Avatar"
                      className="object-cover w-full h-full transition-transform hover:scale-110"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center align-center  font-extrabold text-3xl text-slate-400/60 items-center align-middle w-10 h-10 rounded-full bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)] border-2 border-[rgba(255,255,255,0.75)] dark:border-[rgba(31,41,55,0.5)]">
                    ?
                  </div>
                )
              ) : (
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
              )}
            </div>
            <div className="p-2">
              <p>{comment.content}</p>
              {commentUsers[comment.userId] ? (
                <p className="text-sm text-gray-500">
                  {commentUsers[comment.userId].username} -{" "}
                  {getTimeAgo(comment.createdAt)}
                </p>
              ) : (
                <p className="text-sm text-gray-500 animate-pulse">
                  Loading...
                </p>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};
export default PostComments;
