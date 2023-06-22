import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { ReactComponent as ImageUp } from '../assets/icons/image.svg';
import { ReactComponent as VideoUp } from '../assets/icons/video.svg';

const CreatePostForm = () => {
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState(null);
  const [video, setVideo] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

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
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <div className="relative mb-4">
        <textarea
          id="content"
          className="border w-full text-gray-200 dark:text-gray-800 bg-gray-600 dark:bg-white border-gray-500 dark:border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-slate-400 focus:border-slate-400 sm:text-sm"
          value={content}
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
              onChange={(event) => setPhoto(event.target.files[0])}
            />
            <ImageUp
              className="w-6 h-6 text-gray-200 dark:text-gray-700 cursor-pointer"
              title="Upload Image"
            />
          </label>
          <label htmlFor="video" className="mr-2">
            <input
              type="file"
              id="video"
              accept="video/*"
              className="hidden"
              onChange={(event) => setVideo(event.target.files[0])}
            />
            <VideoUp
              className="w-6 h-6 text-gray-200 dark:text-gray-700 cursor-pointer"
              title="Upload Video"
            />
          </label>
        </div>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
      >
        Create Post
      </button>
    </form>
  );
};

export default CreatePostForm;
