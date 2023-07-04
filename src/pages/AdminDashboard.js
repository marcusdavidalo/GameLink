import React, { useState, useEffect } from "react";
import usePageTitle from "../hooks/useTitle";
import moment from "moment/moment";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("");
  const [users, setUsers] = useState([]);

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

  const getTimeCreated = () => {
    return moment().add(10, "days").calendar();
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
                  <tr>
                    <td className="border border-slate-800 dark:border-slate-200 p-2">
                      user avatar
                    </td>
                    <td className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                      user username
                    </td>
                    <td className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                      user email
                    </td>
                    <td className="border text-center font-bold border-slate-800 dark:border-slate-200 p-2">
                      user created at
                    </td>
                    <td>
                      <button className="bg-cyan-500/60 text-white font-bold py-4 px-4 rounded-md w-full">
                        Admin
                      </button>
                    </td>
                  </tr>
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
                        user avatar
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
                        <button className="bg-cyan-500/60 text-white font-bold py-4 px-4 rounded-md w-full">
                          Admin
                        </button>
                        <button className="bg-red-600 hover:bg-red-700/90 text-white font-bold py-4 px-4 rounded-md w-full">
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
