import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { ReactComponent as ImageUp } from '../assets/icons/image.svg';
import { ReactComponent as VideoUp } from '../assets/icons/video.svg';

const CreatePostForm = () => {
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePhotoChange = (event) => {
    const selectedPhoto = event.target.files[0];
    setPhoto(selectedPhoto);
    setPhotoPreview(URL.createObjectURL(selectedPhoto));
  };

  const handleVideoChange = (event) => {
    const selectedVideo = event.target.files[0];
    setVideo(selectedVideo);
    setVideoPreview(URL.createObjectURL(selectedVideo));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    // Get the JWT from localStorage
    const token = localStorage.getItem('token');
    let userId;
    if (token) {
      // Decode the JWT to get the userId value
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id;
    }

    // Create a FormData object to hold the form data
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('content', content);
    if (photo) {
      formData.append('photo', photo);
    }
    if (video) {
      formData.append('video', video);
    }

    // Send a POST request to the backend to create a new post
    try {
      const apiKey = process.env.REACT_APP_GAMELINK_DB_KEY;
      const response = await fetch(
        `https://api-gamelinkdb.onrender.com/api/posts?apiKey=${apiKey}`,
        {
          method: 'POST',
          body: formData,
        }
      );
      const data = await response.json();
      console.log('Post created:', data);

      // Reset the form
      setContent('');
      setPhoto(null);
      setVideo(null);
      setPhotoPreview(null);
      setVideoPreview(null);
    } catch (error) {
      console.error('Error creating post:', error);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <div className="relative mb-4">
        <textarea
          id="content"
          className="border w-full placeholder-slate-400 text-gray-200 dark:text-gray-800 bg-gray-600 dark:bg-white border-gray-500 dark:border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-slate-400 focus:border-slate-400 sm:text-sm"
          value={content}
          rows={4}
          placeholder="What's new?"
          onChange={(event) => setContent(event.target.value)}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <label htmlFor="photo" className="mr-2">
            <input
              type="file"
              id="photo"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
            <ImageUp
              className="w-6 h-6 text-gray-200 dark:text-gray-700 cursor-pointer"
              title="Upload Image"
            />
          </label>
          {photoPreview && (
            <img
              src={photoPreview}
              alt="Preview"
              className="w-16 h-16 mr-2 rounded-md object-cover cursor-pointer"
              onClick={() => {
                setPhoto(null);
                setPhotoPreview(null);
              }}
            />
          )}
          <label htmlFor="video" className="mr-2">
            <input
              type="file"
              id="video"
              accept="video/*"
              className="hidden"
              onChange={handleVideoChange}
            />
            <VideoUp
              className="w-6 h-6 text-gray-200 dark:text-gray-700 cursor-pointer"
              title="Upload Video"
            />
          </label>
          {videoPreview && (
            <video
              src={videoPreview}
              alt="Video Preview"
              className="w-8 h-8 rounded-md object-cover cursor-pointer"
              onClick={() => {
                setVideo(null);
                setVideoPreview(null);
              }}
              controls
            />
          )}
        </div>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
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
          'Create Post'
        )}
      </button>
    </form>
  );
};

export default CreatePostForm;
