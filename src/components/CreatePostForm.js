import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';

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
        `http://localhost:5000/api/posts?apiKey=${apiKey}`,
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
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          id="content"
          className="border w-full text-gray-200 dark:text-gray-800 bg-gray-600 dark:bg-white border-gray-500 dark:border-gray-500 rounded-md py-2 px-4 focus:outline-none focus:ring-slate-400 focus:border-slate-400 sm:text-sm"
          value={content}
          placeholder="Whats new?"
          onChange={(event) => setContent(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="photo">Photo:</label>
        <input
          type="file"
          id="photo"
          accept="image/*"
          onChange={(event) => setPhoto(event.target.files[0])}
        />
      </div>
      <div>
        <label htmlFor="video">Video:</label>
        <input
          type="file"
          id="video"
          accept="video/*"
          onChange={(event) => setVideo(event.target.files[0])}
        />
      </div>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePostForm;
