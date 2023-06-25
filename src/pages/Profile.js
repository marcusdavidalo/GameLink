import React, { useState, useEffect } from 'react';
import CreatePostForm from '../components/CreatePostForm';
import { useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import PostModal from '../components/PostModal';
import usePageTitle from '../hooks/useTitle';

// eslint-disable-next-line no-unused-vars
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const apiKey = process.env.REACT_APP_GAMELINK_DB_KEY;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      const apiKey = process.env.REACT_APP_GAMELINK_DB_KEY;
      const url = `https://api-gamelinkdb.onrender.com/api/users/${userId}?apiKey=${apiKey}`;
      axios
        .get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          setIsAdmin(response.data.admin);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setIsAdmin(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setLoggedInUserId(decodedToken.id);
    }
  }, []);

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
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://api-gamelinkdb.onrender.com/api/posts?userId=${id}&apiKey=${apiKey}`
        );
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [id, apiKey]);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(
        `https://api-gamelinkdb.onrender.com/api/posts/${postId}?apiKey=${apiKey}`
      );
      // Update the posts state to remove the deleted post
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  usePageTitle(`PlayKoDEX | Profile`);

  return (
    <div className="flex justify-center overflow-hidden mb-10">
      <div className="container mt-10">
        <div className="border-box text-white dark:text-gray-800 overflow-hidden px-4">
          {user && (
            <div
              className={`flex ${
                isAdmin ? 'justify-between' : 'justify-center'
              } border-y-2 border-slate-500/40 rounded-md mx-20 py-10`}
            >
              {/* {isAdmin && (
                <>
                  <div className="rounded-lg p-3 my-2 w-[24rem] bg-slate-700/30">
                    <h3 className="font-semibold border-b-2 border-slate-400/50 text-3xl text-center text-green-500 py-2 mb-2 ">
                      Extra Information
                    </h3>
                    <pre>
                      <code>
                        <p>
                          <span className="text-blue-600 text-xl font-semibold">
                            Email:
                          </span>{' '}
                          {user.email}
                        </p>
                        <p>
                          <span className="text-red-600 text-xl font-semibold">
                            Admin:
                          </span>{' '}
                          {user.admin ? 'Yes' : 'No'}
                        </p>
                        <p>
                          <span className="text-yellow-500 text-xl font-semibold">
                            Birthdate:
                          </span>{' '}
                          {formatDate(user.birthdate)}
                        </p>
                        <p>
                          <span className="text-green-500 text-xl font-semibold">
                            Created At:
                          </span>{' '}
                          {formatDate(user.createdAt)}
                        </p>
                        <p>
                          <span className="text-purple-500 text-xl font-semibold">
                            Updated At:
                          </span>{' '}
                          {formatDate(user.updatedAt)}
                        </p>
                      </code>
                    </pre>
                  </div>
                </>
              )} */}
              <div className="flex flex-col ">
                <div className="flex flex-col align-middle items-center mb-4">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt="Avatar"
                      className="w-20 h-20 rounded-full"
                    />
                  ) : (
                    <div className="flex justify-center font-extrabold text-5xl text-slate-400/60 items-center align-middle w-20 h-20 rounded-full bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)] border-2 border-[rgba(255,255,255,0.75)] dark:border-[rgba(31,41,55,0.5)]">
                      ?
                    </div>
                  )}
                  <p className="text-2xl font-semibold mt-2">{user.username}</p>
                </div>
                <div className="flex font-bold justify-center">
                  <p className="flex flex-col items-center font-semibold text-2xl px-5">
                    <span className="font-bold text-3xl">{user.likes}</span>{' '}
                    Likes
                  </p>
                  <p className="flex flex-col items-center font-semibold text-2xl px-5">
                    <span className="font-bold text-3xl">{user.followers}</span>{' '}
                    Followers
                  </p>
                  <p className="flex flex-col items-center font-semibold text-2xl px-5">
                    <span className="font-bold text-3xl">{user.views}</span>{' '}
                    Views
                  </p>
                </div>
              </div>
              <div className="flex">
                {/* {isAdmin && (
                  <>
                    <div className="text-center rounded-lg p-3 my-2 w-[24rem] bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)]">
                      <h3 className="font-semibold border-b-2 border-slate-400/50 text-3xl text-red-600 py-2 mb-2">
                        Danger Zone
                      </h3>
                      <pre>
                        <code className="flex flex-col">
                          <button className="p-2 m-2 rounded-full text-white bg-red-600 hover:bg-red-700/90">
                            Delete Account
                          </button>
                          <button className="p-2 m-2 rounded-full text-white bg-red-600 hover:bg-red-700/90">
                            Suspend Account
                          </button>
                          <button className="p-2 m-2 rounded-full text-white bg-cyan-600 hover:bg-cyan-700/90">
                            Make User Admin
                          </button>
                        </code>
                      </pre>
                    </div>
                  </>
                )} */}
              </div>
            </div>
          )}
          {loggedInUserId === id && (
            <>
              <h3 className="text-2xl font-bold mt-8 mb-4">Create Post</h3>
              <CreatePostForm />
            </>
          )}
          <h3 className="text-2xl font-bold mt-8 mb-4">Latest Posts</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-wrap">
            {posts.map((post) => (
              <div
                className="w-full text-slate-200 dark:text-slate-800"
                key={post._id}
              >
                <PostModal
                  post={post}
                  handleDelete={handleDelete}
                  loggedInUserId={loggedInUserId}
                  isAdmin={isAdmin}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
