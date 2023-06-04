import { Routes, Route } from 'react-router-dom';
import {
  Home,
  About,
  Search,
  BestOfYear,
  AllTimeTop,
  NewReleases,
  GameDetails,
  NotFound,
} from '../pages';

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/best-of-the-year" element={<BestOfYear />} />
        <Route path="/all-time-top" element={<AllTimeTop />} />
        <Route path="/new-releases" element={<NewReleases />} />
        <Route path="/game/:slug/:id" element={<GameDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
