import React from "react";
import axios from "axios";
import moment from "moment/moment";

const PostComments = ({
  comments,
  newCommentContent,
  setNewCommentContent,
  post,
  setComments,
  user,
}) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/api/postcomments?apiKey=${process.env.REACT_APP_GAMELINK_DB_KEY}`,
        {
          postId: post._id,
          content: newCommentContent,
        }
      );

      // Add the new comment to the list of comments
      setComments((prevComments) => [...prevComments, response.data]);

      // Clear the input field
      setNewCommentContent("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const getTimeAgo = (timestamp) => {
    return moment(timestamp).fromNow();
  };

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
      {comments.map((comment) => (
        <div
          key={comment._id}
          className="flex items-center mb-2 p-2 rounded-md dark:bg-gray-200 bg-gray-800"
        >
          <div className=" border-r border-slate-500/50 p-2">
            {user && user.avatar ? (
              <div className="w-10 h-10 rounded-full bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)] border-2 border-[rgba(255,255,255,0.75)] dark:border-[rgba(31,41,55,0.5)] cursor-pointer relative overflow-hidden">
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="object-cover w-full h-full transition-transform hover:scale-110"
                />
              </div>
            ) : (
              <div className="flex justify-center align-center  font-extrabold text-3xl text-slate-400/60 items-center align-middle w-10 h-10 rounded-full bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)] border-2 border-[rgba(255,255,255,0.75)] dark:border-[rgba(31,41,55,0.5)]">
                ?
              </div>
            )}
          </div>
          <div className="p-2">
            <p>{comment.content}</p>
            <p className="text-sm text-gray-500">
              {user.username} - {getTimeAgo(comment.createdAt)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostComments;
