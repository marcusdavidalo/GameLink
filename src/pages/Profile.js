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
  const [isFollowing, setIsFollowing] = useState(false);
  const apiKey = process.env.REACT_APP_GAMELINK_DB_KEY;

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;
        if (userId) {
          const apiKey = process.env.REACT_APP_GAMELINK_DB_KEY;
          const url = `https://api-gamelinkdb.onrender.com/api/users/${userId}?apiKey=${apiKey}`;
          axios
            .get(url, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
              setIsAdmin(response.data.admin);
              clearInterval(interval);
            })
            .catch((error) => {
              console.error(error);
            });   
        }
      } else {
        setIsAdmin(false);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setLoggedInUserId(decodedToken.id);
    }
  }, []);

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
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [id, apiKey]);

  const handleAddFollower = async (userId, followerId) => {
    try {
      await axios.post(
        `https://api-gamelinkdb.onrender.com/api/users/addFollower?apiKey=${apiKey}`,
        { userId, followerId }
      );
      setIsFollowing(true);
      setUser((prevUser) => ({
        ...prevUser,
        followers: [...prevUser.followers, followerId],
      }));
  
      await axios.post(
        `https://api-gamelinkdb.onrender.com/api/users/addFollowing?apiKey=${apiKey}`,
        { userId: followerId, followingId: userId }
      );
    } catch (error) {
      console.error('Error adding follower:', error);
    }
  };
  
  const handleRemoveFollower = async (userId, followerId) => {
    try {
      await axios.post(
        `https://api-gamelinkdb.onrender.com/api/users/removeFollower?apiKey=${apiKey}`,
        { userId, followerId }
      );
      setIsFollowing(false);
      setUser((prevUser) => ({
        ...prevUser,
        followers: prevUser.followers.filter((id) => id !== followerId),
      }));
  
      await axios.post(
        `https://api-gamelinkdb.onrender.com/api/users/removeFollowing?apiKey=${apiKey}`,
        { userId: followerId, followingId: userId }
      );
    } catch (error) {
      console.error('Error removing follower:', error);
    }
  };  

  useEffect(() => {
    if (loggedInUserId && user) {
      const isUserFollowing = user.followers.includes(loggedInUserId);
      setIsFollowing(isUserFollowing);
    }
  }, [loggedInUserId, user]);  

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
              <div className="flex ">
                <div className="flex flex-col align-middle items-center mb-4">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt="Avatar"
                      className="w-40 h-40 rounded-full"
                    />
                  ) : (
                    <div className="flex justify-center font-extrabold text-5xl text-slate-400/60 items-center align-middle w-40 h-40 rounded-full bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)] border-2 border-[rgba(255,255,255,0.75)] dark:border-[rgba(31,41,55,0.5)]">
                      ?
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className='flex items-center mx-5'>
                <p className="text-4xl font-semibold mt-2">{user.username}</p>
                {loggedInUserId && loggedInUserId !== id && (
                  <div className='text-2xl m-5 w-auto'>
                    {isFollowing ? (
                      <button className=' bg-red-500 hover:bg-red-500/80 rounded-md px-2 py-1' onClick={() => handleRemoveFollower(user._id, loggedInUserId)}>
                        Unfollow
                        </button>
                    ) : (
                      <button className=' bg-cyan-500 hover:bg-cyan-500/80 rounded-md px-2 py-1' onClick={() => handleAddFollower(user._id, loggedInUserId)}>
                        Follow
                        </button>
                    )}
                  </div>
                )}</div>
                  <div className="flex font-bold justify-center my-5">
                  <p className="flex flex-col items-center font-semibold text-2xl px-5">
                  <span className="font-bold text-3xl">{posts.length}</span> Posts
                    </p>
                    <p className="flex flex-col items-center font-semibold text-2xl px-5">
                      <span className="font-bold text-3xl">{user.followers.length}</span> Followers
                    </p>
                    <p className="flex flex-col items-center font-semibold text-2xl px-5">
                      <span className="font-bold text-3xl">{user.following.length}</span> Following
                    </p>
                  </div>
                </div>

              </div>
              <div className="flex">
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
