import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ReactComponent as ThumbsUp } from "../assets/icons/thumbsup.svg";
import { ReactComponent as Views } from "../assets/icons/eye.svg";
import { ReactComponent as ThumbsUpFilled } from "../assets/icons//thumbsupfilled.svg";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const PostModal = ({
  post,
  handleLike,
  handleUnlike,
  handleDelete,
  loggedInUserId,
  isAdmin,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [isLikeDisabled, setIsLikeDisabled] = useState(false);
  const modalRef = useRef(null);

  const handleLikeClick = async (postId) => {
    setIsLikeDisabled(true);
    await handleLike(postId);
    setIsLikeDisabled(false);
  };

  const handleUnlikeClick = async (postId) => {
    setIsLikeDisabled(true);
    await handleUnlike(postId);
    setIsLikeDisabled(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isOpen) {
      window.addEventListener("click", handleClickOutside, { capture: true });
    }

    return () => {
      window.removeEventListener("click", handleClickOutside, {
        capture: true,
      });
    };
  }, [isOpen]);

  const handleView = async (postId) => {
    try {
      // Increment the views property of the post
      post.views += 1;

      // Make a request to update the post in the database
      await axios.put(
        `https://api-gamelinkdb.onrender.com/api/posts/${postId}?apiKey=${process.env.REACT_APP_GAMELINK_DB_KEY}`,
        {
          views: post.views,
        }
      );
    } catch (error) {
      console.error("Error updating post views:", error);
    }
  };

  const openModal = () => {
    setIsOpen(true);
    handleView(post._id);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (loggedInUserId && post && post.likes) {
      const hasUserLiked = post.likes.includes(loggedInUserId);
      setHasLiked(hasUserLiked);
    }
  }, [loggedInUserId, post]);

  return (
    <div className="rounded-md bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)]">
      <div onClick={openModal}>
        {/* Display post thumbnail here */}
        {post.photoUrl && (
          <img
            className="object-cover w-full h-40 rounded-t-md cursor-pointer"
            src={post.photoUrl}
            alt="Post"
          />
        )}
        {post.videoUrl && (
          <div className="relative w-full h-40 rounded-t-md overflow-hidden cursor-pointer">
            <video
              className="object-cover w-full h-full"
              src={post.videoUrl}
              alt="Post Thumbnail"
            />
          </div>
        )}

        {/* Display post information */}
        <div className="p-2">
          <div className="flex flex-col-reverse sm:flex-row justify-between">
            <p>{post.content}</p>
            <p className="text-gray-400">{formatDate(post.createdAt)}</p>
          </div>
          <div className="flex items-center mt-2">
            {/* Display likes and views */}
            <div className="flex items-center mr-3 text-gray-400">
              {hasLiked ? (
                <ThumbsUpFilled width="24" height="24" />
              ) : (
                <ThumbsUp width="24" height="24" />
              )}
              <p className="text-base px-1">
                {post.likes ? post.likes.length : 0}
              </p>
            </div>
            <div className="flex items-center mr-3 text-gray-400">
              <Views width="24" height="24" />
              <p className="text-base px-1">{post.views}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="fixed inset-0 bg-black/75"></div>
          <div
            ref={modalRef}
            className="h-2/3 w-1/2 flex bg-[rgba(31,41,55,0.5)] backdrop-blur-md dark:bg-[rgba(255,255,255,0.75)] rounded-lg p-4 z-10"
          >
            {/* Display post media and additional details */}
            <div className="flex h-full">
              {post.photoUrl && (
                <img
                  className="object-contain bg-black/60 w-1/2 h-full rounded-md"
                  src={post.photoUrl}
                  alt="Post"
                />
              )}
              {post.videoUrl && (
                <video
                  className="object-cover w-full h-auto rounded-md"
                  src={post.videoUrl}
                  alt="Post"
                  controls
                />
              )}
              <div className="ml-4 w-full">
                <div className="flex justify-between">
                  <p>{post.content}</p>
                  {(isAdmin || post.userId === loggedInUserId) && (
                    <button
                      className="p-2 m-2 rounded-full text-white bg-red-600 hover:bg-red-700/90"
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>

                {/* Display likes and views */}
                <div className="flex items-center mt-2">
                  <div className="flex items-center mr-3 text-gray-400">
                    {hasLiked ? (
                      <button
                        onClick={() => handleUnlikeClick(post._id)}
                        disabled={isLikeDisabled}
                      >
                        <ThumbsUpFilled width="32" height="32" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleLikeClick(post._id)}
                        disabled={isLikeDisabled}
                      >
                        <ThumbsUp width="32" height="32" />
                      </button>
                    )}
                    <p className="text-2xl px-1">
                      {post.likes ? post.likes.length : 0}
                    </p>
                  </div>
                  <div className="flex items-center mr-3 text-gray-400">
                    <Views width="32" height="32" />
                    <p className="text-2xl px-1">{post.views}</p>
                  </div>
                </div>

                {/* Display comments */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostModal;
