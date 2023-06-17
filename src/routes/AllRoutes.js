import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import {
  Home,
  About,
  Search,
  BestOfYear,
  AllTimeTop,
  NewReleases,
  GameDetails,
  NotFound,
  Login,
  Register,
  Profile,
  Settings,
  Unauthorized,
  AdminPanel,
  Help,
  Notifications,
  Messages,
} from '../pages';

export const AllRoutes = () => {
  // Add isAdmin state to check if the user is an admin
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Fetch the user's admin status here and update the isAdmin state accordingly
    // Example logic:
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

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/search/:search" element={<Search />} />
        <Route path="/best-of-the-year" element={<BestOfYear />} />
        <Route path="/all-time-top" element={<AllTimeTop />} />
        <Route path="/new-releases" element={<NewReleases />} />
        <Route path="/game/:slug/:id" element={<GameDetails />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        {isAdmin ? (
          <Route path="/admin" element={<AdminPanel />} />
        ) : (
          // Redirect to unauthorized page if the user is not an admin
          <Route
            path="/admin"
            element={<Navigate to="/unauthorized" replace />}
          />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
