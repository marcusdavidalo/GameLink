import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Index from './pages/Index';
import About from './pages/About';
import Search from './pages/Search';
import GameDetails from './pages/GameDetails';
import BestOfYear from './pages/BestOfYear';
import AllTimeTop from './pages/AllTimeTop';
import NewReleases from './pages/NewReleases';
import NotFound from './pages/NotFound';
import AOS from 'aos';
import './App.css';
import 'aos/dist/aos.css';

function App() {
  AOS.init();

  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark');
    document.body.classList.toggle('bgimg');
    document.body.classList.toggle('bgimg-light');
  };

  return (
    <Router>
      <Navbar
        isDarkMode={isDarkMode}
        handleDarkModeToggle={handleDarkModeToggle}
      />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/best-of-the-year" element={<BestOfYear />} />
        <Route path="/all-time-top" element={<AllTimeTop />} />
        <Route path="/new-releases" element={<NewReleases />} />
        <Route path="/game" element={<GameDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer
        isDarkMode={isDarkMode}
        handleDarkModeToggle={handleDarkModeToggle}
      />
    </Router>
  );
}

export default App;
