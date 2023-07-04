import React, { useState, useEffect } from "react";
import CreatePostForm from "../components/profile/CreatePostForm";
import PostModal from "../components/profile/PostModal";
import AvatarModal from "../components/profile/AvatarModal";
import ProfileHeader from "../components/profile/ProfileHeader";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import usePageTitle from "../hooks/useTitle";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = process.env.REACT_APP_GAMELINK_DB_KEY;

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
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
    const token = localStorage.getItem("token");
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
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  // Handler for opening the avatar modal
  const handleOpenAvatarModal = () => {
    if (loggedInUserId === id) {
      setShowAvatarModal(true);
    }
  };

  // Handler for closing the avatar modal
  const handleCloseAvatarModal = () => {
    setShowAvatarModal(false);
  };

  // Handler for uploading the profile picture
  const handleUploadProfile = async (file) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await axios.put(
        `https://api-gamelinkdb.onrender.com/api/users/${id}/uploadAvatar?apiKey=${apiKey}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser(response.data);
    } catch (error) {
      console.error("Error uploading avatar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler for removing the profile picture
  const handleRemoveProfile = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        `https://api-gamelinkdb.onrender.com/api/users/${id}/removeAvatar?apiKey=${apiKey}`
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error removing avatar:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://api-gamelinkdb.onrender.com/api/posts?userId=${id}&apiKey=${apiKey}`
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
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
      console.error("Error adding follower:", error);
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
      console.error("Error removing follower:", error);
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
      console.error("Error deleting post:", error);
    }
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(
        `https://api-gamelinkdb.onrender.com/api/posts/like?apiKey=${apiKey}`,
        { postId, userId: loggedInUserId }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === postId) {
            const updatedPost = {
              ...post,
              likes: [...post.likes, loggedInUserId],
            };
            return updatedPost;
          }
          return post;
        })
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async (postId) => {
    try {
      await axios.post(
        `https://api-gamelinkdb.onrender.com/api/posts/unlike?apiKey=${apiKey}`,
        { postId, userId: loggedInUserId }
      );
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: post.likes.filter((id) => id !== loggedInUserId),
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleCreatePost = (post) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  };

  usePageTitle(`PlayKoDEX | Profile`);

  return (
    <div className="flex justify-center overflow-hidden mb-10">
      <div className="container mt-10">
        <div className="border-box text-white dark:text-gray-800 overflow-hidden">
          {user && (
            <ProfileHeader
              user={user}
              loggedInUserId={loggedInUserId}
              isFollowing={isFollowing}
              handleOpenAvatarModal={handleOpenAvatarModal}
              handleAddFollower={handleAddFollower}
              handleRemoveFollower={handleRemoveFollower}
              isAdmin={isAdmin}
              id={id}
              posts={posts}
              isLoading={isLoading}
            />
          )}
          {loggedInUserId === id && (
            <>
              <h3 className="text-2xl font-bold mt-8 mb-4">Create Post</h3>
              <CreatePostForm onCreate={handleCreatePost} />
            </>
          )}
          <h3 className="text-2xl font-bold mt-8 mb-4">Latest Posts</h3>
          {posts.length === 0 ? (
            <div className="w-full text-5xl flex justify-center text-slate-200 dark:text-slate-800">
              <span className="py-20 font-black bg-slate-800/50 w-full flex justify-center rounded-md">
                Nothing to see here...
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 flex-wrap">
              {posts
                .slice()
                .reverse()
                .map((post) => (
                  <div
                    className="w-auto h-64 text-slate-200 dark:text-slate-800"
                    key={post._id}
                  >
                    <PostModal
                      post={post}
                      handleDelete={handleDelete}
                      loggedInUserId={loggedInUserId}
                      isAdmin={isAdmin}
                      handleLike={handleLike}
                      handleUnlike={handleUnlike}
                      user={user}
                    />
                  </div>
                ))}
            </div>
          )}
          <div>
            {showAvatarModal && ( // Render the avatar modal if showAvatarModal is true
              <AvatarModal
                onClose={handleCloseAvatarModal}
                onUpload={handleUploadProfile}
                onRemove={handleRemoveProfile}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
