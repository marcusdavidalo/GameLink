import React, { useState, useEffect } from 'react';
import CreatePostForm from '../components/CreatePostForm';
import { useParams } from 'react-router-dom';
import { ReactComponent as ThumbsUp } from '../assets/icons/thumbsup.svg';

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const { id } = useParams();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      const apiKey = process.env.REACT_APP_GAMELINK_DB_KEY;
      try {
        const response = await fetch(
          `https://api-gamelinkdb.onrender.com/api/users/${id}?apiKey=${apiKey}`
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  useEffect(() => {
    // Replace this with your actual API call to fetch posts
    const fetchPosts = async () => {
      const apiKey = process.env.REACT_APP_GAMELINK_DB_KEY;
      try {
        const response = await fetch(
          `https://api-gamelinkdb.onrender.com/api/posts?apiKey=${apiKey}`
        );
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex justify-center overflow-hidden mb-10">
      <div className="container mt-10">
        <div className="flex flex-col border-box text-white dark:text-gray-800 col overflow-hidden px-4">
          {user && (
            <div className="border-y-2 border-slate-500/40 rounded-md mx-20 py-10">
              <div className="flex flex-col align-middle items-center mb-4">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full"
                  />
                ) : (
                  <div className="flex justify-center font-extrabold text-5xl text-slate-400/60 items-center align-middle w-20 h-20 rounded-full bg-slate-600/50 border-2">
                    ?
                  </div>
                )}
                <p className="text-2xl font-semibold mt-2">{user.username}</p>
              </div>
              <div className="flex font-bold justify-center">
                <p className="flex flex-col items-center font-semibold text-2xl px-5">
                  <span className="font-bold text-3xl">{user.likes}</span> Likes
                </p>
                <p className="flex flex-col items-center font-semibold text-2xl px-5">
                  <span className="font-bold text-3xl">{user.followers}</span>{' '}
                  Followers
                </p>
                <p className="flex flex-col items-center font-semibold text-2xl px-5">
                  <span className="font-bold text-3xl">{user.views}</span> Views
                </p>
              </div>
              {user.admin && (
                <>
                  <p>Email: {user.email}</p>
                  <p>Admin: {user.admin ? 'Yes' : 'No'}</p>
                  <p>Birthdate: {formatDate(user.birthdate)}</p>
                  <p>Created At: {formatDate(user.createdAt)}</p>
                  <p>Updated At: {formatDate(user.updatedAt)}</p>
                </>
              )}
            </div>
          )}
          <h3 className="text-2xl font-bold mt-8 mb-4">Create Post</h3>
          <CreatePostForm />
          <h3 className="text-2xl font-bold mt-8 mb-4">Latest Posts</h3>
          {posts.map((post) => (
            <div className="w-64" key={post._id}>
              <div className="flex align-middle relative h-64 w-64 max-w-auto overflow-hidden rounded-t-md">
                {post.photoUrl && (
                  <img
                    className="object-cover"
                    src={post.photoUrl}
                    alt="Post"
                  />
                )}
                {post.videoUrl && <video src={post.videoUrl} controls />}
              </div>
              <div className="p-2">
                <div className="flex justify-between">
                  <p>{post.content}</p>
                  <p>{formatDate(post.createdAt)}</p>
                </div>
                <div className="flex">
                  <div className="flex justify-center align-middle items-center mr-3 text-gray-400 dark:text-gray-800 hover:text-white dark:hover:text-gray-200 transition ">
                    <ThumbsUp />
                    <p className="text-xl">{post.likes}</p>
                  </div>
                  <p> {post.views}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
