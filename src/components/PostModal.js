import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as ThumbsUp } from '../assets/icons/thumbsup.svg';
import { ReactComponent as Views } from '../assets/icons/eye.svg';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const PostModal = ({ post, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isOpen) {
      window.addEventListener('click', handleClickOutside, { capture: true });
    }

    return () => {
      window.removeEventListener('click', handleClickOutside, {
        capture: true,
      });
    };
  }, [isOpen]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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
          <div className="flex justify-between">
            <p>{post.content}</p>
            <p>{formatDate(post.createdAt)}</p>
          </div>
          <div className="flex items-center mt-2">
            {/* Display likes and views */}
            <div className="flex items-center mr-3 text-gray-400">
              <ThumbsUp />
              <p className="text-2xl px-1">{post.likes}</p>
            </div>
            <div className="flex items-center mr-3 text-gray-400">
              <Views />
              <p className="text-2xl px-1">{post.views}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-75"></div>
          <div
            ref={modalRef}
            className="bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)] rounded-lg p-4 z-10"
          >
            {/* Display post media and additional details */}
            <div className="flex">
              {post.photoUrl && (
                <img
                  className="object-cover w-1/2 h-auto rounded-md"
                  src={post.photoUrl}
                  alt="Post"
                />
              )}
              {post.videoUrl && (
                <div className="w-1/2 h-auto rounded-md overflow-hidden">
                  <video
                    className="object-cover w-full h-full"
                    src={post.videoUrl}
                    alt="Post"
                    controls
                  />
                </div>
              )}
              <div className="ml-4 w-full">
                <div className="flex justify-between">
                  <p>{post.content}</p>
                  <button
                    className="p-2 m-2 rounded-full text-white bg-red-600 hover:bg-red-700/90"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                  {/* Display comments */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostModal;
