import React from "react";
const ProfileHeader = ({
  user,
  loggedInUserId,
  isFollowing,
  handleOpenAvatarModal,
  handleAddFollower,
  handleRemoveFollower,
  isAdmin,
  id,
  posts,
  isLoading,
}) => {
  return (
    <>
      <div
        className={`flex justify-center border-y-2 border-slate-500/40 rounded-md mx-20 py-10`}
      >
        <div className="flex flex-col justify-center items-center md:flex-row md:items-start">
          <div className="flex align-middle items-center mb-4">
            {user.avatar ? (
              <div
                className={`w-40 h-40 rounded-full bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)] border-2 border-[rgba(255,255,255,0.75)] dark:border-[rgba(31,41,55,0.5)] ${
                  loggedInUserId === id ? "cursor-pointer" : ""
                } relative overflow-hidden`}
                onClick={handleOpenAvatarModal}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin w-20 h-20 mx-auto"
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
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="object-cover w-full h-full transition-transform hover:scale-110"
                  />
                )}
              </div>
            ) : (
              <div
                className={`relative flex justify-center font-extrabold text-5xl text-slate-400/60 items-center align-middle w-40 h-40 rounded-full bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)] border-2 border-[rgba(255,255,255,0.75)] dark:border-[rgba(31,41,55,0.5)] ${
                  loggedInUserId === id ? "cursor-pointer" : ""
                }`}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin w-20 h-20 mx-auto"
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
                  <p>?</p>
                )}
                <span
                  className={`flex text-gray-800 justify-center z-50 text-3xl bg-gray-200/80 border absolute top-0 left-0 h-10 w-10 rounded-full font-black ${
                    loggedInUserId === id ? "cursor-pointer" : "hidden"
                  }`}
                  onClick={handleOpenAvatarModal}
                >
                  +
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex w-full justify-center items-center mx-5">
              <p className="text-3xl md:text-4xl font-bold mt-2">
                {user.username}
              </p>
              {loggedInUserId && loggedInUserId !== id && (
                <div className="text-2xl m-5 w-auto">
                  {isFollowing ? (
                    <button
                      className=" bg-red-500 hover:bg-red-500/80 rounded-md px-2 py-1"
                      onClick={() =>
                        handleRemoveFollower(user._id, loggedInUserId)
                      }
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className=" bg-cyan-500 hover:bg-cyan-500/80 rounded-md px-2 py-1"
                      onClick={() =>
                        handleAddFollower(user._id, loggedInUserId)
                      }
                    >
                      Follow
                    </button>
                  )}
                </div>
              )}
            </div>
            <div className="flex justify-center font-bold my-5">
              <p className="flex flex-col items-center font-semibold text-2xl px-5">
                <span className="font-bold text-3xl">
                  {user.followers.length}
                </span>{" "}
                Followers
              </p>
              <p className="flex flex-col items-center font-semibold text-2xl px-5">
                <span className="font-bold text-3xl">{posts.length}</span> Posts
              </p>
              <p className="flex flex-col items-center font-semibold text-2xl px-5">
                <span className="font-bold text-3xl">
                  {user.following.length}
                </span>{" "}
                Following
              </p>
            </div>
          </div>
        </div>
        <div className="flex"></div>
      </div>
    </>
  );
};

export default ProfileHeader;
