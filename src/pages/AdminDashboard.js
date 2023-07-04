import React, { useState, useEffect } from "react";
import usePageTitle from "../hooks/useTitle";
import moment from "moment/moment";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("");
  const [users, setUsers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(
          `https://api-gamelinkdb.onrender.com/api/feedback?apiKey=${process.env.REACT_APP_GAMELINK_DB_KEY}`
        );
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFeedbacks();
  }, []);

  const deleteFeedback = async (feedbackId) => {
    try {
      const response = await fetch(
        `https://api-gamelinkdb.onrender.com/api/feedback/${feedbackId}?apiKey=${process.env.REACT_APP_GAMELINK_DB_KEY}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // remove feedback from feedbacks state
        setFeedbacks(
          feedbacks.filter((feedback) => feedback._id !== feedbackId)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://api-gamelinkdb.onrender.com/api/users?apiKey=${process.env.REACT_APP_GAMELINK_DB_KEY}`
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(Error);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `https://api-gamelinkdb.onrender.com/api/users/${userId}?apiKey=${process.env.REACT_APP_GAMELINK_DB_KEY}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // remove user from users state
        setUsers(users.filter((user) => user._id !== userId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getTimeCreated = (createdAt) => {
    return moment(createdAt).format("MMMM Do YYYY");
  };

  usePageTitle("PlayKoDEX | Admin Dashboard");

  return (
    <main>
      <div className="flex my-8">
        <div className="w-1/4 bg-gray-800 p-4">
          <h1 className="text-3xl font-bold mb-6 text-white">
            Admin Dashboard
          </h1>
          <ul className="space-y-2">
            <li
              className={`cursor-pointer ${
                activeTab === "adminUsers"
                  ? "text-blue-500 font-bold text-xl"
                  : "text-white font-bold text-xl"
              }`}
              onClick={() => setActiveTab("adminUsers")}
            >
              Admin Users
            </li>
            <li
              className={`cursor-pointer ${
                activeTab === "users"
                  ? "text-blue-500 font-bold text-xl"
                  : "text-white font-bold text-xl"
              }`}
              onClick={() => setActiveTab("users")}
            >
              Users
            </li>
            <li
              className={`cursor-pointer ${
                activeTab === "feedbacks"
                  ? "text-blue-500 font-bold text-xl"
                  : "text-white font-bold text-xl"
              }`}
              onClick={() => setActiveTab("feedbacks")}
            >
              Feedbacks
            </li>
          </ul>
        </div>
        <div className="w-3/4 bg-gray-900 p-4">
          {/* DISPLAY ADMIN USERS LIST//////////////////////// */}
          {activeTab === "adminUsers" && (
            <div>
              <h2 className="text-2xl font-bold mb-2 text-white">
                Admin Users List
              </h2>
              <table className="w-full rounded-md bg-slate-800/50 text-slate-200 dark:text-slate-800">
                <thead className="rounded-t-md">
                  <tr>
                    <th className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                      Avatar
                    </th>
                    <th className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                      Username
                    </th>
                    <th className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                      Email
                    </th>
                    <th className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter((user) => user.admin)
                    .map((user) => (
                      <tr key={user._id}>
                        <td className="border border-slate-800 dark:border-slate-200 p-2">
                          {user && user.avatar ? (
                            <div className="w-16 h-16 rounded-lg bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)] border-2 dark:border-[rgba(31,41,55,0.5)] cursor-pointer relative overflow-hidden">
                              <img
                                src={user.avatar}
                                alt="Avatar"
                                className="object-cover w-full h-full transition-transform hover:scale-110"
                              />
                            </div>
                          ) : (
                            <div className="flex justify-center align-center  font-extrabold text-3xl text-slate-400/60 items-center align-middle w-16 h-16 rounded-lg bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)] border-2 dark:border-[rgba(31,41,55,0.5)]">
                              ?
                            </div>
                          )}
                        </td>
                        <td className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                          {user.username}
                        </td>
                        <td className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                          {user.email}
                        </td>
                        <td className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                          {getTimeCreated(user.createdAt)}
                        </td>
                        <td>
                          {user.admin && (
                            <button className="bg-cyan-500/60 text-white font-bold py-4 px-4 rounded-md w-full disable">
                              Admin
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
          {/* DISPLAY USERS LIST//////////////////////// */}
          {activeTab === "users" && (
            <div>
              <h2 className="text-2xl font-bold mb-2 text-white">Users List</h2>
              <table className="w-full rounded-md bg-slate-800/50 text-slate-200 dark:text-slate-800">
                <thead className="rounded-t-md">
                  <tr>
                    <th className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                      Avatar
                    </th>
                    <th className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                      Username
                    </th>
                    <th className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                      Email
                    </th>
                    <th className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className="border border-slate-800 dark:border-slate-200 p-2">
                        {user && user.avatar ? (
                          <div className="w-16 h-16 rounded-lg bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)] border-2 dark:border-[rgba(31,41,55,0.5)] cursor-pointer relative overflow-hidden">
                            <img
                              src={user.avatar}
                              alt="Avatar"
                              className="object-cover w-full h-full transition-transform hover:scale-110"
                            />
                          </div>
                        ) : (
                          <div className="flex justify-center align-center  font-extrabold text-3xl text-slate-400/60 items-center align-middle w-16 h-16 rounded-lg bg-[rgba(31,41,55,0.5)] dark:bg-[rgba(255,255,255,0.75)] border-2 dark:border-[rgba(31,41,55,0.5)]">
                            ?
                          </div>
                        )}
                      </td>
                      <td className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                        {user.username}
                      </td>
                      <td className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                        {user.email}
                      </td>
                      <td className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                        {getTimeCreated(user.createdAt)}
                      </td>
                      <td>
                        {user.admin ? (
                          <button className="bg-cyan-500/60 text-white font-bold py-4 px-4 rounded-md w-full">
                            Admin
                          </button>
                        ) : (
                          <button
                            className="bg-red-600 hover:bg-red-700/90 text-white font-bold py-4 px-4 rounded-md w-full"
                            onClick={() => deleteUser(user._id)}
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* DISPLAY FEEDBACKS */}
          {activeTab === "feedbacks" && (
            <div>
              <h2 className="text-2xl font-bold mb-2 text-white">
                Feedbacks List
              </h2>
              <table className="w-full rounded-md bg-slate-800/50 text-slate-200 dark:text-slate-800">
                <thead className="rounded-t-md">
                  <tr>
                    <th className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                      User Name
                    </th>
                    <th className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                      Feedback
                    </th>
                    <th className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {feedbacks.map((feedback) => (
                    <tr key={feedback._id}>
                      <td className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                        {feedback.userId.username}
                      </td>
                      <td className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                        {feedback.content}
                      </td>
                      <td className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                        {getTimeCreated(feedback.createdAt)}
                      </td>
                      <td>
                        <button
                          className="bg-red-600 hover:bg-red-700/90 text-white font-bold py-4 px-4 rounded-md w-full"
                          onClick={() => deleteFeedback(feedback._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;
