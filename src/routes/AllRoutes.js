import { Routes, Route, Navigate } from 'react-router-dom';
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
  Unauthorized,
  AdminPanel,
} from '../pages';

export const AllRoutes = () => {
  const isAdmin = false; // Set this value based on your logic

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/best-of-the-year" element={<BestOfYear />} />
        <Route path="/all-time-top" element={<AllTimeTop />} />
        <Route path="/new-releases" element={<NewReleases />} />
        <Route path="/game/:slug/:id" element={<GameDetails />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
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
